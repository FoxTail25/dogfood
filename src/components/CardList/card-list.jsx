import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import Card from '../Card/card';
import './index.css';



const CardList = () => {

	const {cards:goods} = useContext(CardContext)
	return (
	
		<div className='cards'>
			{
				goods.map((item, index) => <Card key={item._id} {...item} /> ) // деструктурируем и в карточку поступают нижеперечисленные данные
			}
		</div>
	);
};

export default CardList;
