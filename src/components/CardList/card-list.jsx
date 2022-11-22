import Card from '../Card/card';
import './index.css';



const CardList = ({goods}) => {
	return (
	
		<div className='cards'>
			{
				goods.map((item, index) => <Card key={`${item.price}_${index}`} {...item} />) // деструктурируем и в карточку поступают нижеперечисленные данные
			}
		</div>
	);
};

export default CardList;
