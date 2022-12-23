import { useSelector } from "react-redux"
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"



export const CatalogPage = () => {


  const cards = useSelector(state => state.products.data) // достаём карточки товара из стора
  
  return (
    <div className="container container_inner">
      <Sort/>
      <div className='content__cards'>

        <CardList cards={cards} />

      </div>
    </div>
  )
}