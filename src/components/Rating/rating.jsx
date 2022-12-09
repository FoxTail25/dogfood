import cn from "classnames";
import { useEffect } from "react";
import { useState } from "react"
import { ReactComponent as StarIcon} from './star.svg';
import s from './index.module.css'
import { isEditable } from "@testing-library/user-event/dist/utils";



export const Rating = ({editable = false, rating, setRating, ...prors}) => {
    const [ratingArray, setRatingArray] = useState(new Array(5).fill(<></>));

useEffect(()=>{
    constructRating(rating)
},[rating])

    const constructRating = (currentRating) => {
        const updateArray = ratingArray.map((ratingElement, index) => {
            return (
                <StarIcon
                className={cn(s.star, {
                    [s.filled]: index < currentRating,
                    [s.editable]: isEditable
                })}   
                onMouseEnter={()=> changeDisplay(index + 1)}             
                onMouseLeave={()=> changeDisplay(rating)}             
                onClick={()=> changeRating(index + 1)}             
                />
            )
        })
        setRatingArray(updateArray)
    }

    const changeDisplay =(rating) => {
        if(!isEditable) return
        constructRating(rating)
    }

    const changeRating = (rating) => {
        if(!isEditable|| !setRating) return
        setRating(rating)
    }

    return (
        <div>
            {ratingArray.map((r,i)=> <span key={i}>{r}</span>)}
        </div>
    )
}