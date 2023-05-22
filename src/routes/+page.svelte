<script lang="ts">
import AvatarSelection from "../components/AvatarSelection.svelte"
import Introduction from "../components/Introduction.svelte"
import ApiKeyInput from "../components/ApiKeyInput.svelte"
import JobDescription from "../components/JobDescription.svelte"
import * as CONSTANTS from "../util/constants"




let avatar_selected : CONSTANTS.Avatar = CONSTANTS.Avatar.UNSELECTED
let api_key : string = ""

async function fetchOpenAIResponse(api_key : string,promt : string) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${api_key}`,
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages : [{
                role : "user",
                content : promt,
            }]
        }),
    })
    const data = await response.json()
    return data.choices[0].message.content
}

</script>
<JobDescription {api_key} {fetchOpenAIResponse}/>
<ApiKeyInput {api_key} {fetchOpenAIResponse}/>
<AvatarSelection {avatar_selected}/>
<Introduction/>