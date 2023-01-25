import React from "react";
import search from "../../images/search.png";
import user from "../../images/user.png";
import liked from "../../images/liked.png";
import cart from "../../images/cart.png";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useState } from "react";
import { useEffect } from "react";
import Cart from "../Cart/Cart";
import Search from "../SearchPage/Search";
import LogIn from "../LogIn/LogIn";
import { useStateContext } from "../Context/StateContext";
import SignUp from "../SignUp/SignUp";
import ContentDefault from "../ContentDefault/ContentDefault";
import CategoryService from "../../services/CategoryService";
import ContentSubPage from "../ContentDefault/ContentSubPage";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import CustomerService from "../../services/CustomerService";
import { ToastContainer, toast } from "react-toastify";

export default function Navbar() {
  const [sticky, setSticky] = useState(false);
  const {
    showSearch,
    setShowSearch,
    showUser,
    setShowUser,
    showCart,
    setShowCart,
    totalQuantities,
    showSignUp,
    showContentSlider,
    setshowContentSlider,
    showUpdate,
    logedUser,
    setLogedUser,
    userId,
    cartItems,
    setCartItems,
    settotalPrice,
    setTotalQuantities,
    showNavbar,
    totalPrice,
  } = useStateContext();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function setBgColor(params) {
    document.getElementById("navbar").style.backgroundColor = "black";
  }
  function setBgColorTrans(params) {
    document.getElementById("navbar").style.backgroundColor = "transparent";
  }
  function setActive(params) {
    document.getElementById("male-btn").classList.toggle("active");
    document.getElementById("female-btn").classList.toggle("active");
  }

  const [subPage, setSubPage] = useState([]);
  const [contentSubPage, setContentSubPage] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [gender, setGender] = useState();

  useEffect(() => {
    let categoryService = new CategoryService();
    categoryService.getAll().then((result) => setSubPage(result.data.data));
  }, []);

  function openContentSubPage() {
    setContentSubPage(false);

    setInterval(() => {
      setContentSubPage(true);
    }, 100);
  }
  function findGender() {
    let el = document.getElementsByClassName("active")[0].innerHTML;
    setGender(el);
  }

  useEffect(() => {
    let customerService = new CustomerService();
    if (userId !== "") {
      customerService
        .getBasket(userId)
        .then((result) => setCartItems(result.data.data));
      async function waiter() {
        await delay(100);
      }
      setTotalQuantities(cartItems.length);
    } else {
      setTotalQuantities(0);
    }
  }, [userId]);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  function notification(message) {
    toast(`${message}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  // useEffect(()=>{
  //   if(!showUser){
  //     localStorage.setItem("userId",null);
  //     localStorage.setItem("logedUser",false);
  //    localStorage.setItem("isLogIn",false);
  //     localStorage.setItem("showUser",false);

  //     setLogedUser(localStorage.getItem("logedUser"));
  //     setShowUser(localStorage.getItem("showUser"));

  //   }
  // })

  function calculatePrice() {
    let totalPrice1 = 0;
    cartItems.map((item) => (totalPrice1 += item.product.price * item.amount));
    settotalPrice(totalPrice1);
    setTotalQuantities(cartItems.length);
  }

  return (
    <div id="navbar" className={`${sticky ? "sticky" : ""}`}>
      {showNavbar && (
        <div className="nav bg-transparent">
          <div className="wrapper">
            <div className="left">
              <div className="header">
                <div className="logo">
                  <Link
                    to="/"
                    className="link "
                    id="lg-brand"
                    onClick={() => {
                      setBgColorTrans();
                      setshowContentSlider(true);
                    }}
                  >
                    Bershka
                  </Link>
                </div>
                <div className="gender-group">
                  <Link
                    className="link"
                    to="/woman"
                    onClick={() => {
                      setBgColorTrans();
                      setshowContentSlider(true);
                    }}
                  >
                    <div
                      className="female"
                      id="female-btn"
                      onClick={() => setActive()}
                    >
                      KADIN
                    </div>
                  </Link>

                  <Link
                    className="link"
                    to="/man"
                    onClick={() => {
                      setBgColorTrans();
                      setshowContentSlider(true);
                    }}
                  >
                    <div
                      className="male active"
                      id="male-btn"
                      onClick={() => setActive()}
                    >
                      ERKEK
                    </div>
                  </Link>
                </div>
              </div>
              <div className="content" id="ct-finder">
                {showContentSlider && <ContentDefault />}

                <div className="content-slider">
                  <div className="content-left">
                    <ul className="content-ul">
                      <li className="content-list-item invalid">
                        <Link to="/" className="list-link">
                          YENİ
                        </Link>
                      </li>
                      <li className="content-list-item">
                        <Link
                          to={"İndirimli Ürünler/campaign-products"}
                          className="list-link"
                          onClick={() => {
                            setshowContentSlider(false);
                            setBgColor();
                          }}
                        >
                          %30'A VARAN İNDİRİM <span>NEW</span>
                        </Link>
                      </li>
                      <br />
                      {subPage.map((item) => (
                        <li className="content-list-item" key={item.id}>
                          <Link
                            to="/"
                            className="list-link"
                            onClick={() => {
                              openContentSubPage();
                              setCategoryId(item.id);
                              findGender();
                            }}
                          >
                            {item.name.toUpperCase()}
                          </Link>
                        </li>
                      ))}
                      <li className="content-list-item invalid">
                        COLLABORATIONS
                      </li>
                      <br />
                      <li className="content-list-item invalid">BASIC</li>
                      <br />
                      <li className="content-list-item invalid">
                        #bershkastyle Gallery
                      </li>
                      <li className="content-list-item invalid">
                        Bershka Creators
                      </li>
                    </ul>
                  </div>
                  <div className="content-right">
                    <ul className="content-ul">
                      <br />
                      {!contentSubPage && (
                        <li>
                          <li className="content-list-item">Çok Satanlar</li>
                          <li className="content-list-item">Basic</li>{" "}
                          <li className="content-list-item">
                            Party <span>NEW</span>
                          </li>
                          <li className="content-list-item">
                            Özel Fiyatlar <span>NEW</span>
                          </li>
                        </li>
                      )}
                      {contentSubPage && (
                        <ContentSubPage id={categoryId} gender={gender} />
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="search-icon" onClick={() => setShowSearch(true)}>
                <img src={search} alt="search-logo" />
                <div className="input-link">
                  <span>ARA</span>
                </div>
              </div>
              <div className="menu-items">

                {logedUser ? (
                  <Link
                    to={`user-panel/${userId}`}
                    className="user-icon"
                    onClick={() => {
                      setshowContentSlider(false);
                      setBgColor();
                    }}
                  >
                    <img src={user} style={{ width: "1rem" }} alt="user-logo" />
                  </Link>
                ) : (
                  <div className="user-icon" onClick={() => setShowUser(true)}>
                    <img src={user} style={{ width: "1rem" }} alt="user-logo" />
                  </div>
                )}
                {logedUser ? (
                  <Link
                    to={`wish-list`}
                    className="link"
                    onClick={() => {
                      setshowContentSlider(false);
                      setBgColor();
                    }}
                  >
                    <div className="liked-icon">
                      <img
                        src={liked}
                        style={{ width: "1rem" }}
                        alt="liked-icon"
                      />
                    </div>
                  </Link>
                ) : (
                  <div
                    className="liked-icon"
                    onClick={() => notification("Lütfen giriş yapınız")}
                  >
                    <img
                      src={liked}
                      style={{ width: "1rem" }}
                      alt="liked-icon"
                    />
                  </div>
                )}

                {logedUser ? (
                  <div
                    className="cart-icon"
                    onClick={() => {
                      setShowCart(true);
                      calculatePrice();
                    }}
                  >
                    <img src={cart} style={{ width: "1rem" }} alt="cart-logo" />
                    <span>{totalQuantities}</span>
                  </div>
                ) : (
                  <div
                    className="cart-icon"
                    onClick={() => {
                      notification("Lütfen giriş yapınız");
                    }}
                  >
                    <img src={cart} style={{ width: "1rem" }} alt="cart-logo" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showCart && <Cart />}
      {showSearch && <Search />}
      {showUser && <LogIn />}
      {showSignUp && <SignUp />}
      {showUpdate && <ForgotPassword />}
      <ToastContainer />
    </div>
  );
}
