import { useForm } from "react-hook-form"
// import {  useNavigate } from "react-router-dom"
import { VALIDATE_CONFIG } from "../../utils/constants"
import Form from "../Form/form"
import { FormButton } from "../FormButton/form-button"
import { FormInput } from "../FormInput/form-input"
import s from '../Form/index.module.css'
// import cn from 'classnames'
import { useState } from "react"
import { Rating } from "../Rating/rating"
import api from "../../utils/api"


export const FormReview = ({title = "Отзыв о товаре", productId, setProduct}) => {

 
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' })
    // const navigate = useNavigate()
    const [rating, setRating] = useState(1)

    const sendReviewProduct = (data) => {
        console.log({...data, rating});
        api.createReviewProduct(productId, {...data, rating})
            .then(newProduct => {
                setProduct && setProduct(newProduct)
            })

        // setProduct()
    }


    const textReview = register('text', {
        required: {
            value: true,
            message: VALIDATE_CONFIG.requiredMessage
        }

    })


    return (

        <Form
            title={title} handleFormSubmit={handleSubmit(sendReviewProduct)} >
           
           <Rating rating={rating} isEditable setRating={setRating}/>
           
            <FormInput
                {...textReview}
                id='text'
                typeinput="textarea"
                placeholder="Ваш отзыв"

            />

            {errors?.email && <p className={s.errorMessage}>{errors?.email?.message}</p>}


            {/* <p className={cn(s.infoText)} onClick={handleClickResetButton}>Восстановить пароль</p> */}
            <FormButton type='submit' color='yellow'>Отправить отзыв</FormButton>
            {/* <FormButton type='button' color='white' onClick={handleClickRegisterButton}>Зарегистрироваться</FormButton> */}

        </Form>
    )
}