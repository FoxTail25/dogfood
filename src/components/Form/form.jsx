import cn from 'classnames';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormButton } from '../FormButton/form-button';
import  {FormInput}  from '../FormInput/form-input';
import s from './index.module.css';


function Form({ title, formType, button, input, infoText, infoTextHeader, changeType, redirect }) {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' })


    const cbSubmit = (data) => {
        console.log(data);
    }

    const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const emailRegister = register('email', {
        required: {
            value: true,
            message: "Обязательное поле"
        },
        pattern: {
            value: emailRegexp,
            message: 'Указанный Email не соответствует формату электронной почты'
        }
    })
    const passwordRegister = register('password', {
        required: {
            value: true,
            message: "Обязательное поле"
        },
        pattern: {
            value: passwordRegexp,
            message: 'Пароль должен быть не менее 8 символов, среди них должна быть минимум 1 цифра и 1 буква латинского алфавита'
        }
    })

    return (
        <form onSubmit={handleSubmit(cbSubmit)}>
            <h1 className={s.title}>{title}</h1>
            <FormInput
                {...emailRegister}
                id='email'
                type="text"
                placeholder={input.email}

            />
            <div>
                {errors?.email && <p className='errorMessage'>{errors?.email?.message}</p>}
            </div>
            {['logon', 'registration'].includes(formType) &&
                <>
                    <FormInput
                        {...passwordRegister}
                        id='password'
                        type="password"
                        placeholder={input.password}

                    />
                    <div>
                        {errors?.password && <p className='errorMessage'>{errors?.password?.message}</p>}
                    </div>
                </>

            }
            {formType === 'login' &&
                <p className={cn(s.infoText, s.link)} onClick={() => changeType('reset')}>{infoText}</p>
            }

            {['reset', 'registration'].includes(formType) &&
                <p className={s.infoText} >{infoText}</p>
            }

            <FormButton type='submit' color='yellow'>{button.submit}</FormButton>

            {['login', 'registration'].includes(formType) &&
                 <FormButton type='button' color='white' onClick={() => changeType(redirect)}>{button.redirect}</FormButton>
            }

        </form>
        // null
    );
};

export default Form;


// const [formData, setFormData] = useState({
//     name:'',
//     lastName:'',
//     phoneNumber:''
// })

// const handleChange = (event) => {
//     setFormData({...formData, [event.target.name]: event.target.value})
// }

// const handleSubmit = (event) => {
//     event.preventDefault();
//     // console.log(formData);
//     serializeCb(formData)
//     setFormData(
//     {
//         name:'',
//         lastName:'',
//         phoneNumber:''
//     }
//     )
// }