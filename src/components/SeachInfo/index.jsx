import { useSelector } from "react-redux";
import "./index.css";

const SeachInfo = ({searchText}) => {

	const cards = useSelector(state => state.products.data)

	return (
		searchText && <section className="search-title">
			По запросу <span>{searchText}</span> найдено {cards.length} товаров
		</section>

	);
};

export default SeachInfo;
 