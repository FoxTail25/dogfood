
import './style.css';


function Header({children, user, onUpdateUser}) {

  return (
    <header className='header'>
      <div className="container">
        <div className="header__wrapper">
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header;
