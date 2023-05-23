<script lang="ts">
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

    let job_description : string 

    let input_spinner : boolean = false
    let error : boolean = false
    let error_message : string = "Error message"
    let question_count : number = 5
    
    export let skill_array : string[] = [] 
    const jobSkillGenerator : Function = async () => {
        if(input_spinner){
            error = true
            error_message = "Work in progress, please wait a moment."
            await CONSTANTS.sleep(1000)
            error = false
        }else if(job_description == undefined || job_description.trim().length == 0){
            error = true
            error_message = "Please enter a non empty job description."
            await CONSTANTS.sleep(1000)
            error = false            
        }else{
            input_spinner = true
            let property_name = `skill_name`
            let skill_json_array = JSON.parse(await fetchOpenAIResponse(api_key,`Given below job description give me a single array containing json objects with property ${property_name} containing all technical skills. Job description : ${job_description}`))
            skill_array = skill_json_array.map((skill : any)=>skill[property_name])
            input_spinner = false
        }
    }

    const removeSkill : Function =async (skill_index : number) => {
        skill_array.splice(skill_index,1)
        skill_array = [...skill_array]
    }

    let new_skill : string = ""
    const addSkill : Function =async () => {
        if(new_skill.trim().length > 0){
            skill_array = [...skill_array,new_skill]
            new_skill = ""
        }
    }

    export let interview_ended : boolean
    export let interview_started : boolean
    export let question_array : string[] = []
    let skill_spinner : boolean = false
    const questionGenerator : Function = async () => {
        if(skill_spinner){
            error = true
            error_message = "Work in progress, please wait a moment."
            await CONSTANTS.sleep(1000)
            error = false
        }else if((job_description == undefined || job_description.trim().length == 0) && skill_array.length == 0){
            error = true
            error_message = "Please enter a non empty job description."
            await CONSTANTS.sleep(1000)
            error = false
        }else if(skill_array.length == 0){
            error = true
            error_message = "Atleast one skill is required."
            await CONSTANTS.sleep(1000)
            error = false
        }else{
            skill_spinner = true
            let property_name : string = `question_text`
            let skill_text : string = skill_array.join(",")
            let question_flag : boolean = false
            let question_json_array : string[] = []
            let request_count :number = 0
            while(!question_flag){
                try{
                    request_count++
                    question_json_array = JSON.parse((await fetchOpenAIResponse(api_key,`For given skills ${skill_text} give me an array containing exactly ${question_count} json objects with format {"${property_name}":"conceptual question text"} containing new possible technical conceptual interview questions. Do not exceed the ${question_count} limit for json objects inside athe array and follow response format example strictly : [{"${property_name}":"question text"},{"${property_name}":"some other question text"}]`)))
                    question_flag = true;
                }catch(e){
                    console.log(e)
                    if(request_count == 3){
                        request_count = 0
                        await CONSTANTS.sleep(30000)
                    }else
                    await CONSTANTS.sleep(5000*request_count)
                }
            }
            
            question_array = question_json_array.map((question : any)=>question[property_name])
            question_array = question_array
            skill_array = skill_array
            interview_started = false
            interview_ended = false
            skill_spinner = false
            slideAnimate()
        }
    }

    const slideBack =async () => {
        slide_animation = ``
        slide_flag = false
        question_array = []
    }

</script>
<div class="d-flex flex-column justify-content-center align-items-center w-100 h-100 p-3 JobDescriptionBox {slide_flag?`${slide_animation}`:``}">
    <div class="backBtn d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-center align-items-center"></div>
        <div class="d-flex justify-content-center align-items-center" on:click|preventDefault={()=>{slideBack()}}><span class="fa-solid fa-angle-left"></span></div>
    </div>
    <div class="mb-2 bold {error?`opacity-1`:`opacity-0`}">{error_message}</div>
    <div class="d-flex gap-4 w-100">
        <div class="d-flex flex-column align-items-center justify-content-center w-50">
            <h5 class="boxHeader">Job Description </h5>
            <div class="JobInput d-flex justify-content-between gap-2">
                <textarea placeholder="Enter job description" bind:value={job_description}></textarea>
            </div>
            <button class="btn-secondary mt-2" on:click|preventDefault={()=>{jobSkillGenerator()}}> { @html (input_spinner?`&nbsp;&nbsp;&nbsp;<span class="fa-solid fa-spinner fa-spin"></span>&nbsp;&nbsp;&nbsp;`:`<span>Extract Skills</span>`)}</button>
        </div>
        <div class="d-flex flex-column align-items-center justify-content-center w-50">
            <h5 class="boxHeader">Skills</h5>
            <div class="d-flex questionCountInputContainer w-100 justify-content-between align-items-center bold"><span class="d-flex align-items-center">No. of questions per round : </span><input type="number" class="questionCountInput" bind:value={question_count}></div>
            <div class="skillsContainer">
                <div class="skills">
                    <div class="d-flex flex-wrap gap-2">
                        {#each skill_array as skill,index}
                            <div class="skill">
                                <div>{skill}</div>
                                <div class="fa-solid fa-circle-minus" on:click|preventDefault={()=>{removeSkill(index)}}></div>
                            </div>
                        {/each}
                        <div class="addSkillContainer skill">
                            <input type="text" placeholder="Add a new skill" bind:value={new_skill} on:keyup|preventDefault={(event)=>{if(event.key == "Enter")addSkill()}}>
                            <span class="fa-solid fa-circle-plus" on:click|preventDefault={()=>{addSkill()}}></span>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn-secondary mt-2" on:click|preventDefault={()=>{questionGenerator()}}> { @html (skill_spinner?`&nbsp;&nbsp;&nbsp;<span class="fa-solid fa-spinner fa-spin"></span>&nbsp;&nbsp;&nbsp;`:`<span>Interview Setup</span>`)}</button>
        </div>
    </div>
</div>
<style>
.JobDescriptionBox{
    background: var(--color4);
    color:var(--color1);
    position: fixed;
    top:0vh;
    left:0vw;
}
.JobInput{
    border:0.3rem solid var(--color3);
    background: var(--color1);
    padding:0.3rem 0.8rem;
    width: 100%;
    border-radius: 0rem 0rem 1rem 1rem;
    position: relative;
}
.JobInput textarea{
    border:none;
    outline:none;
    width:100%;
    resize:none;
    height:60vh;
    overflow-y: auto;
}
.JobInput textarea:focus{
    border:none;
    outline:none;
}
.fa-solid{
    cursor:pointer;
}
.fa-circle-right,.fa-spinner{
    font-size: 1.8rem;
    color:var(--color3);
    position: absolute;
    right:0.4rem;
    bottom:0.4rem;
}
.skillsContainer{
    width: 100%;
    background: var(--color1);
    border-radius: 0rem 0rem 1rem 1rem;
    border:0.3rem solid var(--color3);
    padding:0.3rem 0.8rem;
}
.skills{
    padding:0.5rem;
    height:53vh;
    overflow-y: auto;
    gap:0.3rem;
}
.skill{
    padding:0rem 0.8rem;
    border-radius: 0.8rem;
    min-height:2rem;
    max-height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap:0.5rem;
    border:0.15rem solid var(--color3);
}
.addSkillContainer{
    color:var(--color3);
}
.skill:not(.addSkillContainer){
    background: var(--color3);
    color: var(--color1);
}
input,input:focus{
    outline: none;
    border:none;
    width:8rem;
}
.backBtn{
    width:4rem;
    height:4rem;
    border-radius: 50%;
    position: absolute;
    top:calc(50vh - 2rem);
    right:-2rem;
    color:var(--color1);
    z-index: -1;
    font-size:1rem;
    overflow: hidden;
}
.backBtn div:nth-child(1){
    background: transparent;
    height:inherit;
    width:2rem;
}
.backBtn div:nth-child(2){
    background: var(--color4);
    height:inherit;
    width:2rem;
    cursor: pointer;
}
.boxHeader{
    margin:0rem;
    padding:0.6rem;
    border-radius: 0.6rem 0.6rem 0rem 0rem;
    background: var(--color3);
    color:var(--color1);
    width:100%;
    text-align: center;
}
.questionCountInputContainer span{
    border-left:0.3rem solid var(--color3);
    flex:1;
    height:100%;
    padding-left: 0.3rem;
}
.questionCountInput,.questionCountInput:focus{
    height:7vh;
    width:8vh;
    outline:none;
    border-left:0.3rem solid var(--color3);
    border-right:0.3rem solid var(--color3);
    text-align: center;
}
</style>