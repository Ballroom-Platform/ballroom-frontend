import { MouseEventHandler } from "react"
import { defaultTheme } from "../Themes/default";


interface IProp {
    onClick : MouseEventHandler;
    color : string
}

export const Button : React.FC<IProp> = ({onClick, color}) => {
    return(<button onClick={onClick} style={{background : defaultTheme.color[color]}}></button>)
}