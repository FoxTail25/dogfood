import { useState, useEffect, useCallback } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { isLiked } from '../../utils/product';
import { CatalogPage } from '../../pages/CatalogPage/catalog-page';
import { ProductPage } from '../../pages/ProductPage/product-page';
import { NotFoundPage } from '../../pages/NotFoundPage/not-found-page';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { FaqPage } from '../../pages/FAQPage/faq-page';
import { FavoritePage } from '../../pages/FavoritePage/favorite-page';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import SeachInfo from '../SeachInfo';
import Search from '../Search/search';
import Footer from '../Footer/footer';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import './style.css';
// import Form from '../Form/form';
// import RegistrationForm from '../Form/registration-form';
import Modal from '../Modal/modal';
import FormModal from '../FormModal/form-modal';

// function ContactList({ contacts }) {

//   console.log(contacts);

//   return (
//     <div>
//       {contacts.map((contact) => (
//         <div key={contact.phoneNumber}>
//           <p>{contact.name}</p>
//           <p>{contact.lastName}</p>
//           <p>{contact.phoneNumber}</p>
//         </div>
//       ))}
//     </div>
//     null
//   );
// };

function App() {

  const [cards, setCards] = useState([]);//
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null)
  const debounceSearchQuery = useDebounce(searchQuery, 500)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])
  // const [isOpenModalForm, setIsOpenModalForm] = useState(false)

  const location = useLocation()

  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath
  // console.log('Это initialPath!!', initialPath)

  // const [contacts, setContacts] = useState([])

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
        setCurrentUser(userData);
        setCards(productData.products);
        const favoriteProducts = productData.products.filter(item => isLiked(item.likes, userData._id));
        // console.log(favoriteProducts);
        setFavorites(prevState => favoriteProducts)
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

        if (!liked) {
          setFavorites(prevState => [...prevState, updateCard])
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }
        setCards(newProducts);
        return updateCard;
      })
  }, [currentUser, cards])


  // console.log(UserContext)

  // const addContakt = useCallback((fd) => {
  //   console.log(fd);
  // }, [])



  return (
    <UserContext.Provider value={{ user: currentUser, isLoading }}>
      <CardContext.Provider value={{
        cards, favorites,
        handleLike: handleProductLike
      }}>
        <FormModal/>
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
          <SeachInfo searchText={searchQuery} />
          <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>

            <Route index element={<CatalogPage />} />

            <Route path='/product/:productId' element={<ProductPage />} />

            <Route path='/favorites' element={<FavoritePage />} />

            <Route path='/faq' element={<FaqPage />} />

            <Route path='/login' element={
              <>
                Авторизация
                <Link to='/register' >Зарегистрироваться</Link>
              </>

            } />

            <Route path='/register' element={
              <>
                Регистрация
                <Link to='/login' >Войти</Link>
              </>

            } />


            <Route path='*' element={<NotFoundPage />} />

          </Routes>

          {backgroundLocation && (

            <Routes>

              <Route path='/login' element={
                <Modal>
                  Авторизация
                  <Link to='/register' replace={true} state={{ backgroundLocation: location, initialPath }}>Зарегистрироваться</Link>
                </Modal>
              } />

              <Route path='/register' element={
                <Modal>
                  Регистрация
                  <Link to='/login' replace={true} state={{ backgroundLocation: location, initialPath }}>Войти</Link>
                </Modal>
              } />


            </Routes>
          )}
        </main>
        <Footer />
      </CardContext.Provider>
    </UserContext.Provider>
  )
}
export default App;
