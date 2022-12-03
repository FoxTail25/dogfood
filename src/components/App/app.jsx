import { useState, useEffect, useCallback } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import Sort from '../Sort/sort';
import './style.css';
import SeachInfo from '../SeachInfo';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';
import { CatalogPage } from '../../pages/CatalogPage/catalog-page';
import { ProductPage } from '../../pages/ProductPage/product-page';
import { NotFoundPage } from '../../pages/NotFoundPage/not-found-page';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';


function App() {

  const [cards, setCards] = useState([]);//
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null)
  const debounceSearchQuery = useDebounce(searchQuery, 500)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  const handleRequest = useCallback(() => {
    setIsLoading(true)
    api.search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) });
  }, [searchQuery])

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

  const handleFormSubmit = (inputText) => {
    navigate('/');
    setSearchQuery(inputText)
    handleRequest();
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
  const handleProductLike = useCallback((product) => {
    const liked = isLiked(product.likes, currentUser._id)
    return api.changeLikeProd(product._id, liked)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        })
        setCards(newProducts);
        return updateCard;
      })

  }, [currentUser])
  // console.log(UserContext)
  return (
    <UserContext.Provider value={{
      user: currentUser
    }}>
      <CardContext.Provider value={{cards,
      handleLike: handleProductLike}}>
        <Header>
          <Logo className='logo logo_place_header' href='/' />
          <Routes>
            <Route path='/' element={
              <Search
                onSubmit={handleFormSubmit}
                onInput={handleInputChange}
              />
            } />
          </Routes>
          
        </Header>
        <main className='content container'>
          <SeachInfo searchText={searchQuery}  />
          <Routes>
            <Route index element={
              <CatalogPage
                isLoading={isLoading}
              />
            } />

            <Route path='/product/:productId' element={
              <ProductPage
                isLoading={isLoading}
              />
            } />

            <Route path='*' element={
              <NotFoundPage />
            } />

          </Routes>
        </main>
        <Footer />
      </CardContext.Provider>
    </UserContext.Provider>
  )
}
export default App;
