import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import { useStateContext } from "../Context/StateContext";
import "./Cart.scss";
import Empty from "../../images/empty-cart.png";
export default function Cart() {
  const cartRef = useRef();
  // const { totalPrice, totalQuantities, cartItems, setShowCart } =
  //   useStateContext();
  let totaLOfCart;
  const {
    totalPrice,
    totalQuantities,
    setShowCart,
    userId,
    setTotalQuantities,
    cartItems,
    setCartItems,
    settotalPrice,showNavbar, setShowNavbar,
  } = useStateContext();
  let customerService = new CustomerService();

  useEffect(() => {
    customerService
      .getBasket(userId)
      .then((result) => setCartItems(result.data.data));
    console.log(cartItems);
    setTotalQuantities(cartItems.length);
  }, [userId]);

  function handleRemove(userId, productId, sizeId) {
    console.log(userId, productId, sizeId);
    customerService.removeBasket(userId, productId, sizeId).then((result) => {
      customerService.getBasket(userId).then((result) => {
        setCartItems(result.data.data);
      });
      console.log(cartItems);
      setTotalQuantities(cartItems.length);
    });
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return (
    <div id="cart" ref={cartRef}>
      <div className="wrapper shadow">
        <div className="cart-upper">
          <div className="button">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowCart(false)}
            ></button>
          </div>
        </div>
        {cartItems.length < 1 && <div className="empty-cart">
          
          <div className="empty-cart-text">
            <img src={Empty} alt="" width={300}/>
            <div><b>Sepet Boş</b></div>
            <div>
            Sepetinde henüz ürün yok. Sana uygun olanların tümünü keşfet
            </div>
          </div>
          </div>}

          {cartItems.length >= 1 &&
        <div className="cart-lower">
          <div className="header">Sepetim {cartItems.length}</div>
          <div className="content">
            {cartItems.length >= 1 &&
              cartItems.map((item, index) => (
                <div className="product" key={item.id}>
                  <div className="product-left">
                    <img src={item.product.images[0].url} alt="" />
                  </div>
                  <div className="product-right">
                    <div className="right-up">
                      <div className="product-price">
                        {item.amount * item.product.price} TL
                      </div>
                      <button
                        onClick={() =>
                          handleRemove(userId, item.product.id, item.size.id)
                        }
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                    <div className="product-desc">{item.product.name}</div>
                    <div className="right-down">
                      <div className="size">{item.size.name}</div>
                      <div className="amount">{item.amount}x</div>
                      <div className="total-price">{item.product.price} TL</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="footer">
            <div className="total">
              <div className="total-left">
                <b>Toplam</b> <span> (KDV dahil)</span>
              </div>

              <div className="total-right">
                <b>{totalPrice} TL</b>
              </div>
            </div>
            <Link to="/order" className="link" onClick={()=>{setShowNavbar(false);setShowCart(false)}}>
              <div className="button">SİPARİŞİ İŞLEME AL</div>
            </Link>
          </div>
        </div> }
      </div>
    </div>
  );
}
