import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import "./index.css";

const SeachInfo = ({searchText}) => {

	const {cards} = useContext(CardContext)

	return (
		searchText && <section className="search-title">
			По запросу <span>{searchText}</span> найдено {cards.length} товаров
		</section>

	);
};

export default SeachInfo;
 