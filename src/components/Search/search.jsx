import './index.css';
import {ReactComponent as SearchIcon} from './ic-search.svg';
import {ReactComponent as CloseIcon} from './ic-close-input.svg';
import { useState } from 'react';


function Search({onSubmit: propsOnSubmit, onInput}) {
  const [inputText, setInputText] = useState('')

  const handleInput = (e) => {
    setInputText(e.target.value)
    onInput && onInput(e.target.value)
  }

const handleFormSubmit = (e) => {
  e.preventDefault()
  propsOnSubmit(inputText)
}


  return (
   <form className="search" onSubmit={handleFormSubmit}>
        <input type="text" className='search__input' placeholder='Поиск' onInput={handleInput}/>
        <button className='search__btn'>
            {/* <SearchIcon/> */}
            {inputText && <SearchIcon/>}
            {!inputText && <CloseIcon/>}
        </button>
   </form>
  )
}

export default Search;
