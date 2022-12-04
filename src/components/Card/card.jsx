import cn from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { calcDiscountPrice, isLiked } from '../../utils/product';
import ContentLoader from "react-content-loader";

import "./index.css";
import { ReactComponent as Save } from "./save.svg";


const Card = ({ name, price, discount, wight, description, pictures, tags, _id, likes }) => {
	const discount_price = calcDiscountPrice(price, discount);

	const { user: currentUser } = useContext(UserContext);
	const { handleLike: onProductLike } = useContext(CardContext);

	// console.log('currentUser CONTEXT', currentUser)


	const liked = isLiked(likes, currentUser?._id)


	function handleLike() {
		onProductLike({ _id, likes })
	}


	return (
		<>
  <ContentLoader 
    speed={2}
    width={186}
    height={385}
    viewBox="0 0 186 385"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    
  >
    <rect x="3" y="13" rx="0" ry="0" width="267" height="273" /> 
    <rect x="12" y="305" rx="0" ry="0" width="130" height="18" /> 
    <rect x="14" y="327" rx="0" ry="0" width="106" height="18" /> 
    <rect x="15" y="354" rx="0" ry="0" width="81" height="16" />
  </ContentLoader>
			<div className="card">
				<div className="card__sticky card__sticky_type_top-left">
					{discount !== 0 && <span className="card__discount">{`-${discount}%`}</span>}
					{tags && tags.map(tag => <span key={tag} className={cn('tag', { [`tag_type_${tag}`]: true },)}>{tag}</span>)}
				</div>
				<div className="card__sticky card__sticky_type_top-right">
					<button className={cn("card__favorite", { "card__favorite_is-active": liked })} onClick={handleLike}>

						<Save className='card__favorite-icon' />

					</button>
				</div>

				<Link to={`/product/${_id}`} className="card__link">
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
				</Link>
				<a href="#" className="card__cart btn btn_type_primary">
					В корзину
				</a>
			</div>
		</>
	);
};

export default Card;
