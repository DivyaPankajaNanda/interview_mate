<script lang="ts">
import AvatarSelection from "../components/AvatarSelection.svelte"
import Introduction from "../components/Introduction.svelte"
import ApiKeyInput from "../components/ApiKeyInput.svelte"
import JobDescription from "../components/JobDescription.svelte"
import Interview from "../components/Interview.svelte"
import Header from "../components/Header.svelte"
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
            temperature : 0.5,
            messages : [{
                role : "user",
                content : promt,
            }]
        }),
    })
    const data = await response.json()
    return data.choices[0].message.content
}


let question_array : any[] = []
let skill_array : string[] = []
let candidate_name : string = ""
let interview_started : boolean = false
let interview_ended : boolean = false

</script>
<Interview bind:api_key={api_key} bind:question_array={question_array} bind:skill_array={skill_array} bind:avatar_selected={avatar_selected} bind:candidate_name={candidate_name} bind:interview_ended={interview_ended} bind:interview_started={interview_started} {fetchOpenAIResponse}/>
<JobDescription bind:api_key={api_key} bind:question_array={question_array} bind:skill_array={skill_array} bind:interview_ended={interview_ended} bind:interview_started={interview_started} {fetchOpenAIResponse}/>
<ApiKeyInput bind:api_key={api_key} {fetchOpenAIResponse}/>
<AvatarSelection bind:avatar_selected={avatar_selected} bind:candidate_name={candidate_name}/>
<Introduction/>
<Header/>