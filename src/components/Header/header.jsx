
import s from './index.module.css';
import cn from 'classnames'
import { ReactComponent as FavoreteIcon } from './img/favorite.svg'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';


function Header({ children }) {

  const { favorites } = useContext(CardContext);
  // console.log(favorites)

  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        <div className={s.header__wrapper}>
          {/* <div className="header__wrapper"> */}
          {children}
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to='/favorites'>
              <FavoreteIcon />
              {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
            </Link>
           
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
