import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { EMAIL_REGEXP, PASSWORD_REGEXP, VALIDATE_CONFIG } from "../../utils/constants"
import Form from "../Form/form"
import { FormButton } from "../FormButton/form-button"
import { FormInput } from "../FormInput/form-input"
import s from '../Form/index.module.css'
import cn from 'classnames'


export const Login = () => {

    const location = useLocation()
    const initialPath = location.state?.initialPath

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' })
    const navigate = useNavigate()

    const handleClickResetButton = (e) => {
        e.preventDefault();
        navigate('/reset-password', { replace: true, state: {backgroundLocation: location, initialPath}});
    }
    const handleClickRegisterButton = (e) => {
        e.preventDefault();
        navigate('/register', { replace: true, state: {backgroundLocation: location, initialPath}});
    }
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
    const passwordRegister = register('password', {
        required: {
            value: true,
            message: VALIDATE_CONFIG.requiredMessage
        },
        pattern: {
            value: PASSWORD_REGEXP,
            message: VALIDATE_CONFIG.passwordMessage
        }
    })

    return (

        <Form
            title="Вход" handleFormSubmit={handleSubmit(sendRegisterApi)} >
            <FormInput
                {...emailRegister}
                id='email'
                type="text"
                placeholder="email"

            />

            {errors?.email && <p className={s.errorMessage}>{errors?.email?.message}</p>}


            <FormInput
                {...passwordRegister}
                id='password'
                type="password"
                placeholder="password"

            />
            {errors?.password && <p className={s.errorMessage}>{errors?.password?.message}</p>}

            <p className={cn(s.infoText)} onClick={handleClickResetButton}>Восстановить пароль</p>
           

            <FormButton type='submit' color='yellow'>Войти</FormButton>
            <FormButton type='button' color='white' onClick={handleClickRegisterButton}>Зарегистрироваться</FormButton>

        </Form>
    )
}