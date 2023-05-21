<script lang="ts">
import AvatarSelection from "../components/AvatarSelection.svelte"
import Introduction from "../components/Introduction.svelte"
import KeyInput from "../components/KeyInput.svelte"
import * as CONSTANTS from "../util/constants"




let avatar_selected : CONSTANTS.Avatar = CONSTANTS.Avatar.UNSELECTED

</script>
<KeyInput/>
<AvatarSelection {avatar_selected}/>
<Introduction/>