// tem x no final pq vai usar html, tudo que vai usar html dentro tem que ser tsx

import { ButtonHTMLAttributes } from "react"
import styles from './Button.module.css'
import { ButtonVariant } from "./Button.constants"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {variant?: ButtonVariant}

export function Button({variant, children, ...rest }: IButton){
let buttonClass = styles.buttonBase
    switch (variant) {
        case ButtonVariant.Default: 
            buttonClass += ` ${styles.buttonDefault}`
            break
        case ButtonVariant.Disable: 
            buttonClass += ` ${styles.buttonDisable}`
            break
        case ButtonVariant.Outline: 
            buttonClass += ` ${styles.buttonOutlined}`
            break
        case ButtonVariant.Text: 
            buttonClass += ` ${styles.buttonText}`
            break
    }
    return <button className={buttonClass}{...rest}>{children}</button>
    
}