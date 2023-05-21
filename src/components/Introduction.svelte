<script lang="ts">
    let slide_flag : boolean = false
    const slidePageUp : Function = async () => {
        slide_flag = true
    }
</script>
<div class="d-flex flex-column justify-content-center align-items-center w-100 h-100 introBox {slide_flag?`slidePageUp`:``}">
    <h1>InterviewMate</h1>
    <p>Do you want to practice before your upcoming interview?</p>
    <p>If so, what are you waiting for?</p>
    <button class="btn-primary mt-4" on:click={()=>{slidePageUp()}}>Let's Begin &nbsp;&nbsp;<span class="fa-solid fa-play"></span></button>
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