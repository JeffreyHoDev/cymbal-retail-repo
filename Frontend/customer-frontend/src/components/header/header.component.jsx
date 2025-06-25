import './header.styles.css';
import Cart from '../../images/shopping-cart.png';
import SearchBar from '../searchbar/searchbar.component';
import { NavLink } from 'react-router';

const Header = () => {
  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <div className="header__logo">
          <img src="./logo.png" alt="Logo" />
        </div>
      </NavLink>
      <SearchBar />
      <nav className="header__nav">
        <ul>
          <li><a >About</a></li>
          <li><a >Contact</a></li>
          <li><img src={Cart} alt="Cart" width="25px" /></li>
          <li><a >Welcome, Christina!</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;