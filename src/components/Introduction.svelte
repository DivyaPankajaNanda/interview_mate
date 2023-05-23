<script lang="ts">
	import { onMount } from "svelte";
    import * as CONSTANTS from "../util/constants"

    let slide_flag : boolean = false
    let slide_animation : string = ""

    const slideAnimate : Function = async () => {
        let response = await CONSTANTS.slide(CONSTANTS.SlideDirection.UP,slide_flag,slide_animation);
        slide_flag = response.slide_flag
        slide_animation  = response.slide_animation
    }

    let introduction_ready : boolean = false
    onMount(()=>{
        introduction_ready = true
    })
</script>
<div class="d-flex flex-column justify-content-center align-items-center w-100 h-100 introBox {slide_flag?`${slide_animation}`:``}">
    <div class="fa-solid fa-laptop-code logoIcon"></div>
    <div class="projectName"><span>Interview</span><span style="color:var(--color4);">Mate</span></div>
    <p class="text-center bold devContact" style="color:var(--color6);">(  Developer : Divya Pankaja Nanda  <a target="_blank" href="www.linkedin.com/in/divya-pankaja-nanda" class="fa-brands fa-linkedin"></a> <a target="_blank" href="https://twitter.com/DivyaPankaja" class="fa-brands fa-twitter"></a> <a target="_blank" href="https://github.com/DivyaPankajaNanda" class="fa-brands fa-github"></a>  )</p>
    <p class="text-center mt-4">Do you want to practice before your upcoming interview?<br>If so, what are you waiting for?</p>
    <button class="btn-primary mt-2 {introduction_ready?`opacity-1`:`opacity-0`}" on:click={()=>{slideAnimate()}}>Let's Begin &nbsp;&nbsp;<span class="fa-solid fa-play"></span></button>
    <span class="w-100 text-center bold" style="position:fixed;bottom:3rem;">*If you find this product useful, give it's <a href="https://github.com/DivyaPankajaNanda/interview_mate" target="_blank" style="padding-bottom:0.rem;border-bottom:0.2rem solid var(--color1);"> Github repository</a> a <span class="fa-solid fa-star" style="color:var(--color6);font-ize:1rem;"></span></span>
    <span class="w-100 text-center" style="position:fixed;bottom:1rem;">*Images from <a href="https://storyset.com/pana" target="_blank">StorySet</a></span>
</div>
<style>
.introBox{
    background: var(--color3);
    color:var(--color1);
    position: fixed;
    top:0vh;
    left:0vw;
}
.projectName{
    font-size:2rem;
    font-weight: bold;
}
.logoIcon{
    font-size: 4rem;
}
.devContact a{
    margin-left:0.3rem;
    color:var(--color6);
}
</style>