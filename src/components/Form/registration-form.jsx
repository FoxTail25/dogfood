

// import './index.css';

import { useForm } from 'react-hook-form'
import { FormInput } from '../FormInpun/form-input';


function RegistrationForm() {

    const { register, handleSubmit, formState} = useForm({mode: 'onBlur'});

    const cbSubmit = (data) => {
        console.log(data);

    }

    // console.log(formState);


    return (
        <form onSubmit={handleSubmit(cbSubmit)}>
            <h3>Регистрация</h3>
            <FormInput
                {...register('name', {
                    required: {
                        value: true,
                        message: 'Поле Имя должно быть заполненно'
                    },
                    minLength: {
                        value: 2,
                        message: 'Имя должно быть не менее 2 символов'
                    }
                })}
                type="text"
                placeholder="Имя"

            />
             <div>
                {formState.errors?.name && <p className='errorMessage'>{formState.errors?.name?.message}</p>}
            </div>

            <input
                {...register('email', {
                    required: {
                        value: true,
                        message: 'Поле Email должно быть заполненно'
                    }
                })}
                type="text"
                placeholder="Email"
                />
                <div>
                   {formState.errors?.email && <p className='errorMessage'>{formState.errors?.email?.message}</p>}
               </div>

            <input
                {...register('password', {
                    required: {
                        value: true,
                        message: 'Поле пароля необходимо заполнить'
                    },
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: "Пароль должен содержать не менее 8 символов, минимум 1 букву и 1 цифру"
                    }

                })}
                type="password"
                placeholder="Password"
            />
            <div>
                {formState.errors?.password && <p className='errorMessage'>{formState.errors?.password?.message}</p>}
            </div>

            <button>Зарегистрироваться</button>
        </form>
    );
};

export default RegistrationForm;