<script lang="ts">
    import * as CONSTANTS from "../util/constants"

    let slide_flag : boolean = false
    const slidePageRight : Function = async () => {
        slide_flag = true
    }

</script>
<div class="d-flex flex-column justify-content-center align-items-center w-100 h-100 keyInputBox {slide_flag?`slidePageRight`:``}">
    <div class="keyInput d-flex justify-content-between gap-2">
        <input type="text" placeholder="Enter your OpenAI api key">
        <span class="fa-solid fa-circle-right" on:click={()=>{slidePageRight()}}></span>
    </div>
    <div class="mt-3 text-center">*Don't worry we don't save your api key.<br>All input data is usable until browser tab is closed or refreshed.</div>
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