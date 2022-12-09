import './index.css';
import {ReactComponent as SearchIcon} from './ic-search.svg';
import {ReactComponent as CloseIcon} from './ic-close-input.svg';
import { useRef, useState } from 'react';


function Search({onSubmit: propsOnSubmit, onInput}) {
  const [inputText, setInputText] = useState('')
  const inputRef = useRef(null)

  // console.log(inputRef)

  const handleInput = () => {
    setInputText(inputRef.current.value)

    onInput && onInput(inputRef.current.value)
  }

const handleFormSubmit = (e) => {
  e.preventDefault()
  propsOnSubmit(inputText)
  // setInputText('')
}

const handleClearInput =(e) => {
  e.stopPropagination()
  setInputText('')
  onInput && onInput('')
}


  return (
   <form className="search" onSubmit={handleFormSubmit}>
        <input type="text" className='search__input' ref={inputRef} placeholder='Поиск' onInput={handleInput}/>
        <button className='search__btn'>
            {/* <SearchIcon/> */}
            {inputText && <SearchIcon/>}
            {!inputText && <CloseIcon/>}
        </button>
   </form>
  )
}

export default Search;
