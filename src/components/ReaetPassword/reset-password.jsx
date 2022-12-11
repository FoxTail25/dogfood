import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { EMAIL_REGEXP, VALIDATE_CONFIG } from "../../utils/constants"
import Form from "../Form/form"
import { FormButton } from "../FormButton/form-button"
import { FormInput } from "../FormInput/form-input"
import s from '../Form/index.module.css'
import cn from 'classnames'

export const ResetPassword = () =>{

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' })

    const sendRegisterApi = (data) => {
        console.log(data)
    }


    const emailRegister = register('email', {
        required: {
            value: true,
            message: VALIDATE_CONFIG.requiredMessage
        },
        pattern: {
            value: EMAIL_REGEXP,
            message: VALIDATE_CONFIG.emailMessage
        }
    })
    
    
    return (
        
        <Form
        title="Восстановление пароля" handleFormSubmit={handleSubmit(sendRegisterApi)} >
        <p className={cn(s.infoText)} >Для получения временного пароля необходимо ввести email, указанный при регистрации</p>
            <FormInput
                {...emailRegister}
                id='email'
                type="text"
                placeholder="email"

            />

            {errors?.email && <p className={s.errorMessage}>{errors?.email?.message}</p>}



        <p className={cn(s.infoText)} >Временный пароль действителен 24ч.</p>

            <FormButton type='submit' color='yellow'>Отправить</FormButton>

        </Form>
    )
}