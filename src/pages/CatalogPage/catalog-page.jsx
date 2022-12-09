import { useContext } from "react"
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
// import Spinner from "../../components/Spinner/Spinner"
import { CardContext } from "../../context/cardContext"

const tabs = [
  {
    id: 'cheap',
    title: 'Сначала дешевые',
  },
  {
    id: 'hight',
    title: 'Сначала дорогие',
  },
  {
    id: 'low',
    title: 'По скидке',
  },
];

export const CatalogPage = () => {

  const { cards } = useContext(CardContext);

  return (
    <>
      <Sort tabs={tabs}/>
      <div className='content__cards'>

        <CardList cards={cards} />

      </div>
    </>
  )
}