import cn from 'classnames';
import { calcDiscountPrice, isLiked } from '../../utils/product';

import "./index.css";
import {ReactComponent as Save} from "./save.svg";


const Card = ({ name, price, discount, wight, description, pictures, tags, onProductLike, _id, likes, currentUser}) => {
	const discount_price = calcDiscountPrice(price, discount);

	

// console.log(currentUser._id, _id)

const liked = isLiked(likes, currentUser?._id)

	// const isLiked = likes.some(id => id === currentUser._id);


	function handleLike() {
		onProductLike({_id, likes})
	}


	return (
		<div className="card">
			<div className="card__sticky card__sticky_type_top-left">
				{discount !== 0 && <span className="card__discount">{`-${discount}%`}</span>}
				{tags && tags.map(tag => <span key={tag} className={cn('tag', {[`tag_type_${tag}`]: true}, )}>{tag}</span>)}
			</div>
			<div className="card__sticky card__sticky_type_top-right">
				<button  className={cn("card__favorite",{"card__favorite_is-active": liked})} onClick={handleLike}>

					<Save className='card__favorite-icon'/>
			
				</button>
			</div>

			<a href="/product" className="card__link">
				<img src={pictures} alt={description} className="card__image" />
				<div className="card__desc">
					<span className={discount !== 0 ? "card__old-price" : "card__price"}>
						{price}&nbsp;₽
					</span>
					{discount !== 0 && <span className="card__price card__price_type_discount">
						{discount_price}&nbsp;₽
					</span>}
					<span className="card__wight">{wight}</span>
					<p className="card__name">{name}</p>
				</div>
			</a>
			<a href="#" className="card__cart btn btn_type_primary">
				В корзину
			</a>
		</div>
	);
};

export default Card;
