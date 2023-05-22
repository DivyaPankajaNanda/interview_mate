<script lang="ts">
    import * as CONSTANTS from "../util/constants"

    let slide_flag : boolean = false
    let slide_animation : string = ""

    export let api_key : string = ""
    export let fetchOpenAIResponse : Function

    let spinner : boolean = false
    let error : boolean = false
    let error_message : string = "Error message"
    const openaiSetup : Function = async () => {
        if(api_key.trim() != ""){
            spinner = true
            let return_message = await fetchOpenAIResponse(api_key,"You are an sde interviewer.")
            if(return_message.length > 0){
                spinner = false
                slideAnimate()
            }else{
                error = true
                error_message = "Invalid API key, please try with another key."
                await CONSTANTS.sleep(1000)
                error = false
            }
        }else{
            error = true
            error_message = "Please enter a non empty API key."
            await CONSTANTS.sleep(1000)
            error = false
        }
    }

    const slideAnimate : Function = async () => {
        let response = await CONSTANTS.slide(CONSTANTS.SlideDirection.RIGHT,slide_flag,slide_animation);
        slide_flag = response.slide_flag
        slide_animation  = response.slide_animation
    }
</script>
<div class="d-flex flex-column justify-content-center align-items-center w-100 h-100 keyInputBox {slide_flag?`${slide_animation}`:``}">
    <div class="text-danger {error?`opacity-1`:`opacity-0`}">{error_message}</div>
    <div class="keyInput d-flex justify-content-between gap-2 mt-4">
        <input type="text" placeholder="Enter your OpenAI api key" bind:value={api_key}>
        <span class="fa-solid fa-circle-right {spinner?`fa-spin`:``}" on:click|preventDefault={()=>{openaiSetup()}}></span>
    </div>
    <div class="mt-3 text-center">*Don't worry we don't save your api key.<br>All input data is usable until browser tab is closed or refreshed.<br>In case you are still worried, you can always revoke this key later. </div>
</div>
<style>
.keyInputBox{
    background: var(--color5);
    color:var(--color3);
    position: fixed;
    top:0vh;
    left:0vw;
}
.keyInput{
    border:0.3rem solid var(--color4);
    background: var(--color1);
    padding:0.3rem 0.8rem;
    width:50%;
    border-radius: 1rem;
}
input{
    border:none;
    outline:none;
    width:90%;
}
input:focus{
    border:none;
    outline:none;
}
.fa-circle-right{
    font-size: 1.8rem;
    color:var(--color4);
}
</style>