import { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CatalogPage } from '../../pages/CatalogPage/catalog-page';
import { ProductPage } from '../../pages/ProductPage/product-page';
import { NotFoundPage } from '../../pages/NotFoundPage/not-found-page';
import { FaqPage } from '../../pages/FAQPage/faq-page';
import { FavoritePage } from '../../pages/FavoritePage/favorite-page';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import SeachInfo from '../SeachInfo';
import Search from '../Search/search';
import Footer from '../Footer/footer';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import './index.css';
import Modal from '../Modal/modal';
import { Register } from '../Register/register';
import { Login } from '../Login/login';
import { ResetPassword } from '../ReaetPassword/reset-password';
import { HomePage } from '../../pages/HomePage/home-page';
import { useDispatch } from 'react-redux';
import {  fetchProducts } from '../../storage/products/productSlice';
import { fetchUser } from '../../storage/user/userSlice';



function App() {

  const [cards, setCards] = useState([]);//
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null)
  const debounceSearchQuery = useDebounce(searchQuery, 500)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath
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
    const userData = dispatch(fetchUser());
    userData.then(() => {
      dispatch(fetchProducts());
    })

  }, [dispatch])


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


  return (
  
      <>
        <Header>
          <>
            <Logo className='logo logo_place_header' href='/' />
            <Routes>
              <Route path='/catalog' element={
                <Search
                  onSubmit={handleFormSubmit}
                  onInput={handleInputChange}
                />
              } />
              <Route path='*' element={<></>}
              />

            </Routes>
          </>
        </Header>
        <main className='content'>
          <SeachInfo searchText={searchQuery} />
          <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>

            <Route index element={<HomePage />} />


            <Route path='/catalog' element={<CatalogPage />} />


            <Route path='/product/:productId' element={<ProductPage />} />

            <Route path='/favorites' element={<FavoritePage />} />

            <Route path='/faq' element={<FaqPage />} />

            <Route path='/login' element={
              <>
                <Login />
                {/* Авторизация
                <Link to='/register' >Зарегистрироваться</Link> */}
              </>

            } />

            <Route path='/register' element={
              <>
                <Register />
              </>

            } />

            <Route path='/reset-password' element={
              <>
                <ResetPassword />
              </>

            } />


            <Route path='*' element={<NotFoundPage />} />

          </Routes>

          {backgroundLocation && (

            <Routes>

              <Route path='/login' element={
                <Modal>
                  <Login />
                </Modal>
              } />

              <Route path='/register' element={
                <Modal>
                  <Register />
                </Modal>
              } />

              <Route path='/reset-password' element={
                <Modal>
                  <ResetPassword />
                </Modal>
              } />


            </Routes>
          )}
        </main>
        <Footer />
      </>
  
  )
}
export default App;
