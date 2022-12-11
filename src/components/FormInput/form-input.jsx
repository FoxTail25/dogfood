import cn from 'classnames'
import { forwardRef } from 'react'
import s from './index.module.css'



export const FormInput = forwardRef((props, ref) => {
    // console.log(props)
    return (
        props.typeinput === 'textarea' 
        ? <textarea ref={ref} className={cn(s.textarea, s.input)} {...props}/>

        : <input ref={ref} className={s.input} {...props}/>
        // null
    )
})