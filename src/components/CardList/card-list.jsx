import { useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import Card from '../Card/card';
import { NotFound } from '../NotFound/NotFound';
import './index.css';



const CardList = ({cards}) => {

	const navigate = useNavigate();
	const {isLoading} = useContext(UserContext)
	return (
		<>
		{!cards.length && !isLoading && <NotFound buttonText='назад' title="Простите по вашему запросу ничего не найдено" buttonAction={() => navigate(-1)}/>}

		<div className='cards'>
			{

				cards.map((item, index) => <Card key={item._id} {...item} /> ) // деструктурируем и в карточку поступают нижеперечисленные данные
			}
		</div>
		</>
	);
};

export default CardList;
