export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


export const VALIDATE_CONFIG = {

    requiredMessage: 'Обязательное поле',
    emailMessage: 'Указанный Email не соответствует формату электронной почты',
    passwordMessage: 'Пароль должен быть не менее 8 символов, среди них должна быть минимум 1 цифра и 1 буква латинского алфавита'
}

export const INITIAL_VALUE_RATING = 1

export const SORTED = {
    LOW: 'low',
    CHEAP: 'cheap',
    SALE: 'sale'
}