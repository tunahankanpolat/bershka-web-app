import React, { useEffect, useState } from "react";
import OrderInfo from "../../layouts/Orders/OrderInfo";
import BillingInfo from "../../layouts/Orders/BillingInfo";
import { useStateContext } from "../../layouts/Context/StateContext";
import CustomerService from "../../services/CustomerService";
import "./OrderPage.scss";
import { Link, useParams ,useNavigate } from "react-router-dom";
import OrderService from "../../services/OrderService";
import { ToastContainer, toast } from "react-toastify";

export default function OrderPage() {
  let customerService = new CustomerService();
  const [onFirst, setOnFirst] = useState(true)
  const [customer, setcustomer] = useState({})
  const[shippingAddress,setShippingAddress] = useState(null)
  const [campaignCode, setCampaignCode] = useState(null)
  const[billingAddress,setBillingAddress] = useState(null)

  const {
    totalPrice,
    totalQuantities,
    setShowCart,
    userId,
    setTotalQuantities,
    cartItems,
    setCartItems,
    settotalPrice,setShowNavbar,setshowContentSlider
  } = useStateContext();

  useEffect(() => {
    customerService
      .getBasket(userId)
      .then((result) => setCartItems(result.data.data));
    console.log(cartItems);
    setTotalQuantities(cartItems.length);
    customerService
    .getCustomerById(userId)
    .then((result) => setcustomer(result.data.data));
  }, [userId]);

  function setBgColorTrans(params) {
    document.getElementById("navbar").style.backgroundColor = "transparent";
  }

   async function handleSubmit () {
    const order = {
        userId: userId,
        shippingAddress: shippingAddress,
        billingAddress: billingAddress,
        campaignCode: campaignCode,
    }
    let orderService = new OrderService();
    orderService
      .giveOrder(order)
      .then((result) =>{ notification(result.data.message);});
      await delay(2000);
      navigate("/");
      setShowNavbar(true);setshowContentSlider(true);setBgColorTrans();
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

  function notification(message) {
    toast(`${message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const navigate = useNavigate();
  return (
    <div id="orderPage">
      <nav>
       {!onFirst ? ( <div className="turnBack">
        <button className="btn" onClick={()=>setOnFirst(true)}  >
        <i class="fa-solid fa-arrow-left-long"></i>Adres Değiştir
        </button>
        </div>):( <div className="turnBack text-white">
          <i class="fa-solid fa-arrow-left-long"></i>Adres Değiştir
        </div>)}
        <Link to="/" className="link" onClick={()=>{setShowNavbar(true);setshowContentSlider(true);setBgColorTrans()}}>
        <div className="logo" >Bershka</div>
        </Link>
        <div className="infoNumber">00800 448828852</div>
      </nav>
      <div className="body">
        <div className="left-side">
            {onFirst ? (
                          <OrderInfo customer={customer} setShippingAddress={setShippingAddress} shippingAddress={shippingAddress} />

            ) : (
                <BillingInfo customer={customer} setCustomer={setcustomer} setBillingAddress={setBillingAddress} billingAddress={billingAddress} />
            )}
        </div>
        <div className="right-side">
          <div className="order-title"><b>Özete Bak</b></div>
          <div className="order-summary">
            {cartItems.length >= 1 &&
              cartItems.map((item, index) => (
                <div className="product" key={item.id}>
                  <div className="product-left">
                    <img src={item.product.images[0].url} width={200} alt="" />
                  </div>
                  <div className="product-right">
                    <div className="product-desc">
                      <b>{item.product.name}</b>
                    </div>

                    <div className="sub-info">
                    <div className="amount">{item.amount}x</div>
                      <div className="size">{item.size.name}</div>
                      <div className="product-price">
                        <b>{item.amount * item.product.price} TL</b>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="campaign-code">
          <i class="fa-solid fa-chevron-right"></i>
            <input value={campaignCode} onChange={e => {setCampaignCode(e.target.value)} } type="text" placeholder="Kampanya Kodu" />
            <abbr title="İndirim otomatik olarak yapılacaktır. Güncel tutarı sipariş sonrası 'siparişlerim' kısmıdan görüntüleyebilirsiniz.">
            <i class="fa-solid fa-circle-info"></i>

            </abbr>

          </div>
          <div className="order-prices">
            <div className="basket-total">
                <p>Ara Toplam</p>
                <div>{totalPrice} TL</div>
            </div>
            <div className="ship-price">
            <p>Gönderi Masrafları</p>
                <div>14,95 TL</div>
            </div>
            <div className="order-total">
                <div className="up">
                    <p><b>TOPLAM</b></p>
                    <div><b>{totalPrice + 14.95} TL</b></div>
                </div>
                <div className="down">* KDV dahil</div>
            </div>
          </div>
          { onFirst ? (
            shippingAddress !== null ? (
                <button  type="submit" onClick={()=> setOnFirst(false)}>DEVAM ET</button>
            ):(
                <button  type="submit">ADRES SEÇİNİZ</button>
            )
          ):(
            <button type="submit" onClick={()=>{handleSubmit();}}>SİPARİŞ VER</button>
          )

          }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
