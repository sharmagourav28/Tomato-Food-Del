import "./Navbar.css";
import logo from "../../assets/logo.png";
import searchicon from "../../assets/search_icon.png";
import basketicon from "../../assets/basket_icon.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Navbar = ({ setshowLogin }) => {
  const [menu, setmenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const Navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    Navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/">
          <li
            onClick={() => setmenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </li>
        </Link>
        <li
          onClick={() => setmenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </li>
        <li
          onClick={() => setmenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </li>
        <li
          onClick={() => setmenu("contact us")}
          className={menu === "contact us" ? "active" : ""}
        >
          Contact Us
        </li>
      </ul>
      <div className="navbar-right">
        <img src={searchicon} alt="search_icon" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={basketicon} alt="basket_icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setshowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-drop-down">
              <li onClick={() => Navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
