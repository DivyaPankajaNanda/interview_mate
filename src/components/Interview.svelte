<script lang="ts">
	import { afterUpdate } from "svelte";
    import * as CONSTANTS from "../util/constants"
    
    let slide_flag : boolean = false
    let slide_animation : string = ""
    const slideAnimate : Function = async () => {
        let response = await CONSTANTS.slide(CONSTANTS.SlideDirection.LEFT,slide_flag,slide_animation);
        slide_flag = response.slide_flag
        slide_animation  = response.slide_animation
    }

    export let api_key : string 
    export let fetchOpenAIResponse : Function
    export let question_array : string[]
    export let skill_array : string[]
    export let avatar_selected : CONSTANTS.Avatar
    export let candidate_name : string

    $: chat_array = [] as any[]
    $: if(!interview_started){
        chat_array = []
    }
    const addChat =async (user : CONSTANTS.User, chat : string, type : CONSTANTS.Chat) => {
        let chat_object : any = {}
        chat_object.user = user
        chat_object.chat = chat
        chat_object.type = type

        chat_array.push(chat_object)
        chat_array = chat_array

        await scrollChatContainer()
    }    

    let spinner : boolean = false
    let answer : string = ""
    const submitAnswer = async () => {
        if(!spinner && answer.trim() != "" && !interview_ended){
            spinner = true
            await addChat(CONSTANTS.User.INTERVIEWEE, answer, CONSTANTS.Chat.ANSWER)
            
            let explanation_flag : boolean = false
            let return_message : string = ``
            let request_count : number = 0
            while(!explanation_flag){
                try{
                    request_count++
                    return_message = await fetchOpenAIResponse(api_key,`For question - "${question_array[current_question_index]}" is answer - "${answer}" correct ,explain and give the correct response.`)
                    explanation_flag = true
                }catch(e){
                    console.log(e)
                    if(request_count == 3){
                        request_count = 0
                        await CONSTANTS.sleep(30000)
                    }else
                    await CONSTANTS.sleep(5000*request_count)
                }
            }
            
            if(return_message.length > 0){
                answer = ``
                spinner = false
                await addChat(CONSTANTS.User.INTERVIEWER, return_message, CONSTANTS.Chat.EXPLANATION)
                await CONSTANTS.sleep(500)
                if(current_question_index + 1 < question_array.length){
                    current_question_index++
                    await populateQuestion()
                }else{
                    interview_ended = true
                }
            }
        } 
    }

    export let interview_started : boolean 
    export let interview_ended : boolean 
    let current_question_index : number = 0
    const startInterview : Function =async () => {
        interview_started = true
        await CONSTANTS.sleep(500)
        await populateQuestion()
    }

    const populateQuestion : Function =async () => {
        await addChat(CONSTANTS.User.INTERVIEWER, question_array[current_question_index], CONSTANTS.Chat.QUESTION)
    }

    let chat_container_element : Element
    const scrollChatContainer : Function = async () => {
        chat_container_element.scrollTo({ top: chat_container_element.scrollHeight-chat_container_element.clientHeight, behavior: 'smooth' })
    }

    afterUpdate(() => {
        scrollChatContainer()
    })

    $: intro_message = `<p>Hi ${candidate_name}, my name is Divya, and I will be your virtual AI interviewer today.</p>
                        <p>This interview will consist of ${question_array.length} questions based on the following skills:</p>
                        <ul>${skill_array.map((skill)=>{return `<li>${skill}</li>`}).join("")}</ul>
                        <p>Since this is a practice interview round, I will provide the correct answers after each question for your reference.</p>
                        <p>To make it easier for you to differentiate between the interview content and explanations, we will use a background color <span class="fa-solid fa-circle" style="color:var(--color5)"></span> bfor the explanation chats.</p>
                        <p>In case you want to modify the job description,skill set or the no. of questions per interview round, you can do so by going back to the previous step using the button on left side of the screen.</p>
                        <p>Shall we begin?</p>`

</script>
<div class="d-flex flex-column justify-content-center align-items-center w-100 h-100 p-3 InterviewBox {slide_flag?`${slide_animation}`:``}">
    <div class="chatContainer w-100" bind:this={chat_container_element}>
        <div class="chat mb-2 chatInterviewer">
            <div class="avatar avatar_interviewer"><img src="/interviewer.svg" alt="Interviewer"></div>
            <div class="chatContent">{@html intro_message}</div>
        </div>
        {#if interview_started}
        <div class="chat mb-2 chatInterviewee">
            {#if avatar_selected == CONSTANTS.Avatar.MALE}
                <div class="avatar avatar_interviewee avatar_male"><img src="/interviewee_male.svg" alt="Interviewee"></div>
            {:else}
                <div class="avatar avatar_interviewee avatar_female"><img src="/interviewee_female.svg" alt="Interviewee"></div>
            {/if}
            <div class="chatContent">Let's begin!</div>
        </div>
        {/if}
        {#each chat_array as chat}
            <div class="chat mb-2 {chat.user == CONSTANTS.User.INTERVIEWEE?`chatInterviewee`:`chatInterviewer`} {chat.type == CONSTANTS.Chat.EXPLANATION?`explanationChat`:``}">
                {#if chat.user == CONSTANTS.User.INTERVIEWEE}
                    {#if avatar_selected == CONSTANTS.Avatar.MALE}
                        <div class="avatar avatar_interviewee avatar_male"><img src="/interviewee_male.svg" alt="Interviewee"></div>
                    {:else}
                        <div class="avatar avatar_interviewee avatar_female"><img src="/interviewee_female.svg" alt="Interviewee"></div>
                    {/if}
                {:else if chat.user == CONSTANTS.User.INTERVIEWER}
                    <div class="avatar avatar_interviewer"><img src="/interviewer.svg" alt="Interviewer"></div>
                {/if}                
                <div class="chatContent">{ @html chat.chat}</div>
            </div>
        {/each}
        {#if interview_ended}
            <div class="chat mb-2 chatInterviewer">
                <div class="avatar avatar_interviewer"><img src="/interviewer.svg" alt="Interviewer"></div>
                <div class="chatContent">Well this concludes our practice interview.<br>Wish you all the best for the real one.</div>
            </div>
        {/if}
    </div>
    {#if interview_started}
        <div class="userInput d-flex justify-content-between gap-2 mt-4">
            <textarea bind:value={answer} placeholder="Write your answer and submit it by clicking on the send button on the right side."></textarea>
            <span class="fa-solid {spinner?`fa-spinner fa-spin`:`fa-circle-right`}" on:click|preventDefault={()=>{submitAnswer()}}></span>
        </div>
    {:else}
        <div class="d-flex align-items-center justify-content-center" style="height:14vh;">
            <button class="btn-primary mt-4" on:click|preventDefault={()=>{startInterview()}}>Let's Begin</button>
        </div>
    {/if}
</div>
<style>
.InterviewBox{
    background: var(--color1);
    color:var(--color3);
    position: fixed;
    top:0vh;
    left:0vw;
}
.avatar{
    width:5rem;
    height:5rem;
    border-radius:50%;
    overflow: hidden;
    background: var(--color1);
    border: 0.5rem solid var(--color6);
    position: absolute;
    top:calc(50% - 2.5rem);
}
.avatar_interviewer{
    left:-2.5rem;
}
.avatar_interviewee{
    right:-2.5rem;
}
.avatar img{
    position: absolute;
    width:14rem;
}
.avatar_interviewer img{
    left: -180%;
    top: -45%;
}
.avatar_male img{
    left: -134%;
    top: -54%;
    transform: scale(0.95);
}
.avatar_female img{
    left: -120%;
    top: -96%;
    transform: scale(0.63);
}
.chatContainer{
    height:75vh;
    padding:3rem 4rem;
    overflow: auto;
    border-radius: 1rem;
    border:0.3rem solid var(--color4);
}
.chat{
    padding:1rem 3rem;
    border-radius: 1rem;
    color:var(--color1);
    position: relative;
    min-height:3rem;
    width:75%;
}
.chatInterviewee{
    background: var(--color4);
    margin-left:25%;
}
.chatInterviewer{
    background: var(--color3);
}
.explanationChat{
    background: var(--color5);
    color:var(--color3);
}
.userInput{
    border:0.3rem solid var(--color4);
    background: var(--color1);
    padding:0.3rem 0.8rem;
    width:90%;
    border-radius: 1rem;
    position: relative;
}
.userInput textarea{
    border:none;
    outline:none;
    width:100%;
    height:14vh;
    overflow-y: auto;
    resize:none;
}
.userInput textarea:focus{
    border:none;
    outline:none;
}
.fa-circle-right,.fa-spinner{
    font-size: 1.8rem;
    color:var(--color4);
    cursor: pointer;
    position: absolute;
    bottom: calc(50% - 0.9rem);
    right: -2.5rem;
}
</style>