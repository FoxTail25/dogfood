import { useForm } from "react-hook-form"
import { INITIAL_VALUE_RATING, VALIDATE_CONFIG } from "../../utils/constants"
import Form from "../Form/form"
import { FormButton } from "../FormButton/form-button"
import { FormInput } from "../FormInput/form-input"
import s from '../Form/index.module.css'
import { useState } from "react"
import { Rating } from "../Rating/rating"
import { useDispatch } from "react-redux"
import { fetchCreateReview } from "../../storage/singleProduct/singleProdSlice"


export const FormReview = ({title = "Отзыв о товаре", productId, setProduct}) => {

 
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onBlur' })
    const [rating, setRating] = useState(INITIAL_VALUE_RATING)
    const dispatch = useDispatch();
    
    const sendReviewProduct = (data) => {
        dispatch(fetchCreateReview({productId, data}))
        .then(() => {
            reset();
            setRating(INITIAL_VALUE_RATING)
        })
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


            <FormButton type='submit' color='yellow'>Отправить отзыв</FormButton>

        </Form>
    )
}