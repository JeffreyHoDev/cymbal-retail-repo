import './header.styles.css';

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
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;