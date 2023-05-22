<script lang="ts">
    import * as CONSTANTS from "../util/constants"

    let slide_flag : boolean = false
    let slide_animation : string = ""
    export let avatar_selected : CONSTANTS.Avatar = CONSTANTS.Avatar.UNSELECTED
    const selectAvatar : Function = async (avatar : CONSTANTS.Avatar) => {
        avatar_selected = avatar
    }

    const slideAnimate : Function = async () => {
        let response = await CONSTANTS.slide(CONSTANTS.SlideDirection.UP,slide_flag,slide_animation);
        slide_flag = response.slide_flag
        slide_animation  = response.slide_animation
    }
</script>
<div class="d-flex flex-column justify-content-center align-items-center w-100 h-100 avatarBox {slide_flag?`${slide_animation}`:``}">
    <h3>Select your avatar.</h3>
    <div class="d-flex justify-content-center align-items-center w-100 mt-4" style="gap:7rem;">
        <div class="avatar avatar_male {avatar_selected == CONSTANTS.Avatar.MALE ? `selected`:``}" on:click={()=>{selectAvatar(CONSTANTS.Avatar.MALE)}}><img src="/interviewe_male.svg" alt="Interviewe Male"></div>
        <div class="avatar avatar_female {avatar_selected == CONSTANTS.Avatar.FEMALE ? `selected`:``}" on:click={()=>{selectAvatar(CONSTANTS.Avatar.FEMALE)}}><img src="/interviewe_female.svg" alt="Interviewe Female"></div>
    </div>
    <button class="btn-primary mt-4 {avatar_selected != CONSTANTS.Avatar.UNSELECTED?``:`opacity-0`}" on:click={()=>{slideAnimate()}}>Select</button>
</div>
<style>
.avatarBox{
    background: var(--color5);
    color:var(--color3);
    position: fixed;
    top:0vh;
    left:0vw;
}
.avatar{
    width:10rem;
    height:10rem;
    border-radius:50%;
    overflow: hidden;
    background: var(--color1);
    border: 0.5rem solid transparent;
    position: relative;
    cursor: pointer;
    transition: 0.5s;
}
.avatar:hover{
    border:0.5rem solid var(--color3);
}
.avatar.selected{
    border:0.5rem solid var(--color4);
}
.avatar img{
    position: absolute;
    width:18rem;
}
.avatar_male img{
    transform: scale(1.3);
    left: -51%;
    top: -3%;
}
.avatar_female img{
    left: -38%;
    top: -25%;
}
</style>