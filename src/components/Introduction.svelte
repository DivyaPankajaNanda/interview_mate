<script lang="ts">
    import * as CONSTANTS from "../util/constants"

    let slide_flag : boolean = false
    let slide_animation : string = ""

    const slideAnimate : Function = async () => {
        let response = await CONSTANTS.slide(CONSTANTS.SlideDirection.UP,slide_flag,slide_animation);
        slide_flag = response.slide_flag
        slide_animation  = response.slide_animation
    }
</script>
<div class="d-flex flex-column justify-content-center align-items-center w-100 h-100 introBox {slide_flag?`${slide_animation}`:``}">
    <h1>InterviewMate</h1>
    <p>Do you want to practice before your upcoming interview?</p>
    <p>If so, what are you waiting for?</p>
    <button class="btn-primary mt-4" on:click={()=>{slideAnimate()}}>Let's Begin &nbsp;&nbsp;<span class="fa-solid fa-play"></span></button>
</div>
<style>
.introBox{
    background: var(--color3);
    color:var(--color1);
    position: fixed;
    top:0vh;
    left:0vw;
}
</style>