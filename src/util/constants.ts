
export enum Avatar{
    UNSELECTED,
    MALE,
    FEMALE,
}

export enum SlideDirection{
    LEFT,
    RIGHT,
    UP,
    DOWN,
}

export const sleep : Function = (time_in_ms : number) => {
    return new Promise(resolve => setTimeout(resolve, time_in_ms))
}

export const slide : Function = async (slide_direction : SlideDirection,slide_flag : boolean, slide_animation : string) => {
    
    slide_flag = true
    if(slide_direction == SlideDirection.LEFT)
    slide_animation = "SlideLeft"
    else if(slide_direction == SlideDirection.RIGHT)
    slide_animation = "SlideRight"
    else if(slide_direction == SlideDirection.UP)
    slide_animation = "SlideUp"
    else if(slide_direction == SlideDirection.DOWN)
    slide_animation = "SlideDown"

    return {
        "slide_flag" : slide_flag,
        "slide_animation" : slide_animation
    }
}