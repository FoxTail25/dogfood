import { useState, useEffect } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import Spinner from '../Spinner/Spinner'
import './style.css';
import SeachInfo from '../SeachInfo';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';


function App() {
  const [cards, setCards] = useState([]);//
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null)
  const debounceSearchQuery = useDebounce(searchQuery, 500)
  const [isLoading, setIsLoading] = useState(true);

  const handleRequest = () => {
    setIsLoading(true)
    api.search(debounceSearchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
      .finally(()=> {setIsLoading(false)});
  }

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productData, userData]) => {
        setCurrentUser(userData)
        setCards(productData.products)
      })
      .catch(err => console.log(err))
      .finally(setIsLoading(false))
  }, [])



  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleRequest()
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
  }
  function handleProductLike(product) {
    const liked = isLiked(product.likes, currentUser._id)
    api.changeLikeProd(product._id, liked)
      .then((newCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === newCard._id ? newCard : cardState
        })

        setCards(newProducts)
      })

  }

  return (
    <>
      <Header>
        <>
          <Logo className='logo logo_place_header' href='/' />
      
          <Search 
          onSubmit={handleFormSubmit} 
          onInput={handleInputChange} 
          />
        </>
      </Header>
      <main className='content container'>
        <SeachInfo searchText={searchQuery} searchCount={cards.length} />
        <div className='content__cards'>
          {isLoading
            ? <Spinner />
            : <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser} />
          }
        </div>
      </main>
      <Footer />
    </>
  )
}
export default App;
