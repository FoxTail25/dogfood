export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


export const VALIDATE_CONFIG = {

    requiredMessage: 'Обязательное поле',
    emailMessage: 'Указанный Email не соответствует формату электронной почты',
    passwordMessage: 'Пароль должен быть не менее 8 символов, среди них должна быть минимум 1 цифра и 1 буква латинского алфавита'
}


// export const emailRegister = register('email', {
//     required: {
//         value: true,
//         message: "Обязательное поле"
//     },
//     pattern: {
//         value: emailRegexp,
//         message: 'Указанный Email не соответствует формату электронной почты'
//     }
// })
// export const passwordRegister = register('password', {
//     required: {
//         value: true,
//         message: "Обязательное поле"
//     },
//     pattern: {
//         value: passwordRegexp,
//         message: 'Пароль должен быть не менее 8 символов, среди них должна быть минимум 1 цифра и 1 буква латинского алфавита'
//     }
// })