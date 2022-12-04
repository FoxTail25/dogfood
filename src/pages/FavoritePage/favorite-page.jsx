import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner/Spinner"



export const CatalogPage = ({isLoading, favoriteCard, hang}) => {

  return (
    <>
      <Sort />
      <div className='content__cards'>
        {isLoading
          ? <Spinner />
          : <CardList />
        }
      </div>
    </>
  )
}