import Card from '../Card/card';
import './index.css';



const CardList = ({goods, onProductLike, currentUser}) => {
	return (
	
		<div className='cards'>
			{
				goods.map((item, index) => <Card key={item._id} {...item} onProductLike={onProductLike} currentUser={currentUser}/> ) // деструктурируем и в карточку поступают нижеперечисленные данные
			}
		</div>
	);
};

export default CardList;

// name={item.name}
// price={item.price}
// discount={item.discount}
// wight={item.wight}
// description={item.description}
// picture={item.picture} />