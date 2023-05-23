<script lang="ts">
    import * as CONSTANTS from "../util/constants"

    let slide_flag : boolean = false
    let slide_animation : string = ""
    export let avatar_selected : CONSTANTS.Avatar = CONSTANTS.Avatar.UNSELECTED
    const selectAvatar : Function = async (avatar : CONSTANTS.Avatar) => {
        avatar_selected = avatar
    }

    const slideAnimate : Function = async () => {
        let response = await CONSTANTS.slide(CONSTANTS.SlideDirection.DOWN,slide_flag,slide_animation);
        slide_flag = response.slide_flag
        slide_animation  = response.slide_animation
    }

    export let candidate_name : string = ""
</script>
<div class="d-flex flex-column justify-content-center align-items-center w-100 h-100 avatarBox {slide_flag?`${slide_animation}`:``}">
    <h5>Select an avatar for yourself.</h5>
    <div class="d-flex justify-content-center align-items-center w-100 mt-4" style="gap:7rem;">
        <div class="avatar avatar_male {avatar_selected == CONSTANTS.Avatar.MALE ? `selected`:``}" on:click={()=>{selectAvatar(CONSTANTS.Avatar.MALE)}}><img src="/interviewee_male.svg" alt="Interviewee Male"></div>
        <div class="avatar avatar_female {avatar_selected == CONSTANTS.Avatar.FEMALE ? `selected`:``}" on:click={()=>{selectAvatar(CONSTANTS.Avatar.FEMALE)}}><img src="/interviewee_female.svg" alt="Interviewee Female"></div>
    </div>
    <div class="nameInput d-flex justify-content-between gap-2 mt-4 {avatar_selected != CONSTANTS.Avatar.UNSELECTED?``:`opacity-0`}">
        <input type="text" placeholder="What shall we address you as?" bind:value={candidate_name} on:keyup={(event)=>{if(event.key=="Enter" && avatar_selected != CONSTANTS.Avatar.UNSELECTED && candidate_name.trim() != "")slideAnimate()}}>
        <span class="fa-solid fa-circle-right" on:click|preventDefault={()=>{if(avatar_selected != CONSTANTS.Avatar.UNSELECTED && candidate_name.trim() != "")slideAnimate()}}></span>
    </div>
</div>
<style>
.avatarBox{
    background: var(--color4);
    color:var(--color1);
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
    border: 0.5rem solid var(--color6);
    position: relative;
    cursor: pointer;
    transition: 0.2s;
}
.avatar:hover{
    /* border:0.5rem solid var(--color3); */
    transform: scale(1.1);
}
.avatar.selected{
    border:0.5rem solid var(--color3);
    background: var(--color6);
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
.nameInput{
    border:0.3rem solid var(--color3);
    background: var(--color1);
    padding:0.3rem 0.8rem;
    width:40%;
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
    color:var(--color3);
    cursor: pointer;
}
</style>