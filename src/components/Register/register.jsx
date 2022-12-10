import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { EMAIL_REGEXP, PASSWORD_REGEXP, VALIDATE_CONFIG } from "../../utils/constants"
import Form from "../Form/form"
import { FormButton } from "../FormButton/form-button"
import { FormInput } from "../FormInput/form-input"
// import s from './index.module.css'


export const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' })

    const navigate = useNavigate()

    const handleClickLoginButton = (e) => {
        e.preventDefault();
        navigate('/login');
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
            title="Регистрация" handleFormSubmit={handleSubmit(sendRegisterApi)} >
            <FormInput
                {...emailRegister}
                id='email'
                type="text"
                placeholder="email"

            />
            <div>
                {errors?.email && <p className='errorMessage'>{errors?.email?.message}</p>}
            </div>

            <FormInput
                {...passwordRegister}
                id='password'
                type="password"
                placeholder="password"

            />
            <div>
                {errors?.password && <p className='errorMessage'>{errors?.password?.message}</p>}
            </div>

            <p className='infoText'>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</p>

            <FormButton type='submit' color='yellow'>Зарегистрироваться</FormButton>

            <FormButton type='button' color='white' onClick={handleClickLoginButton}>Войти</FormButton>

        </Form>
    )
}