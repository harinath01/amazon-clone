import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "./Header.css";
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider'
import { auth } from "./firebase";


function Header() {
  const [{ basket,user }, dispatch] = useStateValue();
    const handleAuthenticaton = () => {
      if (user) {
        auth.signOut();
      }
    };
  return (
    <div className='header'>
      <Link to='/'>
        <img
          className='header__logo'
          src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
          alt='amazon_logo'
        />
      </Link>
      <div className='header__search'>
        <input type='text' className='header__searchInput' />
        <SearchIcon className='header__searchIcon' />
      </div>
      <div className='header__navbar'>
        <Link to={!user &&'/Login'} ><div className='header__option' onClick={handleAuthenticaton}>
          <span className='optionLineOne'>Hello {!user?'Guest':user.email.split('@')[0]}</span>
          <span className='optionLineTwo'>{user?'Sign out':'Sign in'}</span>
        </div></Link>
        <Link to='/orders'><div className='header__option'>
          <span className='optionLineOne'>returns</span>
          <span className='optionLineTwo'>& orders</span>
        </div></Link>
        <div className='header__option'>
          <span className='optionLineOne'>Your</span>
          <span className='optionLineTwo'>prime</span>
        </div>
      </div>
      <Link to='/checkout'>
        <div className='header__optionBasket'>
          <ShoppingBasketIcon />
          <span className='optionLineTwo header__basketCount'>{basket.length}</span>
        </div>
      </Link>
    </div>
  );
}

export default Header;
