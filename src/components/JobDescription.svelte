<script lang="ts">
    import * as CONSTANTS from "../util/constants"
    
    let slide_flag : boolean = false
    let slide_animation : string = ""
    const slideAnimate : Function = async () => {
        let response = await CONSTANTS.slide(CONSTANTS.SlideDirection.RIGHT,slide_flag,slide_animation);
        slide_flag = response.slide_flag
        slide_animation  = response.slide_animation
    }

    export let api_key : string = ""
    export let fetchOpenAIResponse : Function

    let job_description : string = ""

    let spinner : boolean = false
    let error : boolean = false
    let error_message : string = "Error message"
    
    const jobSkillGenerator : Function = async () => {
        let return_message = JSON.parse(await fetchOpenAIResponse(api_key,`Given below job description give me a json array with property skill_name containing all technical skills. Job description : ${job_description}`))
        console.log(return_message)
    }

</script>
<div class="d-flex flex-column justify-content-center align-items-center w-100 h-100 JobDescriptionBox {slide_flag?`${slide_animation}`:``}">
    <div class="mb-4 text-danger {error?`opacity-1`:`opacity-0`}">{error_message}</div>
    <h3>Job Description </h3>
    <div class="keyInput d-flex justify-content-between gap-2 mt-1">
        <textarea placeholder="Enter job description" bind:value={job_description}></textarea>
        <span class="fa-solid fa-circle-right {spinner?`fa-spin`:``}" on:click|preventDefault={()=>{jobSkillGenerator()}}></span>
    </div>
</div>
<style>
.JobDescriptionBox{
    background: var(--color5);
    color:var(--color3);
    position: fixed;
    top:0vh;
    left:0vw;
}
.JobInput{
    border:0.3rem solid var(--color4);
    background: var(--color1);
    padding:0.3rem 0.8rem;
    width:50%;
    border-radius: 1rem;
}
textarea{
    border:none;
    outline:none;
    width:90%;
}
textarea:focus{
    border:none;
    outline:none;
}
.fa-circle-right{
    font-size: 1.8rem;
    color:var(--color4);
}
</style>