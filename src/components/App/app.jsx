import { useState, useEffect} from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import Sort from '../Sort/sort';
import './style.css';
import data from '../../assets/data.json'
import SeachInfo from '../SeachInfo';


function App() {
  const [cards, setCards] = useState(data);//
  const [searchQuery, setSearchQuery] = useState('');
  const handleRequest = () => {
    const filterCards = data.filter( item => item.name.toUpperCase().includes(searchQuery.toUpperCase()));

    setCards(filterCards);
  }

  useEffect(()=> {
    handleRequest()
  },[searchQuery])
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
        <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
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