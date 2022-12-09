import { forwardRef } from 'react'
import { Router } from 'react-router-dom'
import s from './index.module.css'



export const FormInput = forwardRef((props, ref) => {
    // console.log(props)
    return (
        <input ref={ref} className={s.input} {...props}/>
        // null
    )
})