import { useState, useEffect } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
// import Sort from '../Sort/sort';
import './style.css';
// import data from '../../assets/data.json'
import SeachInfo from '../SeachInfo';
import api from '../../utils/api';


function App() {
  const [cards, setCards] = useState([]);//
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null)

  const handleRequest = () => {
    const filterCards = cards.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()));

    setCards(filterCards);
  }

  useEffect(() => {
    api.getProductList()
      .then((cardsData) => {
        setCards(cardsData.products) // Устанавливаем состояние карточек
      })
    
    api.getUserInfo()
    .then((userData)=>{
      setCurrentUser(userData) // устанавливаем состояние пользователя
    })
  },[])



  useEffect(() => {
    handleRequest()
  }, [searchQuery])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleRequest()
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  return (
    <>
      <Header>
        <>
          <Logo className='logo logo_place_header' href='/' />
          {/* <Search/> */}
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <main className='content container'>
        <SeachInfo searchText={searchQuery} searchCount={cards.length} />
        {/* <Sort /> */}
        <div className='content__cards'>
          <CardList goods={cards} />
        </div>
      </main>
      <Footer />
    </>
  )
}
export default App;


    //   useEffect(()=> {
    //   setSearchQuery('жел');
    // handleRequest()
    // },[searchQuery])