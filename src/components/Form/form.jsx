// import cn from 'classnames';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FormButton } from '../FormButton/form-button';
// import  {FormInput}  from '../FormInput/form-input';
import s from './index.module.css';


function Form({ title, handleFormSubmit, children }) {

 
    return (
        <form onSubmit={handleFormSubmit}>
            <h1 className={s.title}>{title}</h1>

            {children}

            {/* <FormInput
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
            } */}

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