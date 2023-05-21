
export enum Avatar{
    UNSELECTED,
    MALE,
    FEMALE,
}

export const sleep : Function = (time_in_ms : number) => {
    return new Promise(resolve => setTimeout(resolve, time_in_ms))
}