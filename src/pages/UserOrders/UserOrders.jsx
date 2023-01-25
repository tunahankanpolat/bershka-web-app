import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../../layouts/Context/StateContext";
import CustomerService from "../../services/CustomerService";
import ProductService from "../../services/ProductService";
import RefundService from "../../services/RefundService";

import UserInfo from "../UserInfo/UserInfo";
import UserRefunds from "../UserRefunds/UserRefunds";
import "./UserOrders.scss";
import Package from "../../images/package.png";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
export default function UserOrders() {
  let { id } = useParams();
  const { cartItems } = useStateContext();
  const [info, setInfo] = useState(false);
  const [refund, setRefund] = useState(false);
  const [order, setOrder] = useState(true);
  const [customer, setCustomer] = useState({});
  let customerService = new CustomerService();

  const {
    setShowUser,
    setisLogin,
    setLogedUser,
    setUserId,
    setshowContentSlider,
  } = useStateContext();
  useEffect(() => {
    customerService
      .getCustomerById(id)
      .then((result) => setCustomer(result.data.data));
    console.log(customer);
  }, []);

  function setBgColorTrans(params) {
    document.getElementById("navbar").style.backgroundColor = "transparent";
  }

  function setActive(linkId) {
    document.getElementById(linkId).classList.add("active");
    linkList.forEach((link) => {
      if (link != linkId) {
        document.getElementById(link).classList.remove("active");
      }
    });
  }
  const linkList = ["link1", "link2", "link3"];
  const delay = ms => new Promise(res => setTimeout(res, ms));

  async function handleSubmit(orderDetail) {
    let refundService = new RefundService();

    const cause = "müşteri talebi";

    refundService
      .addRefund(cause, orderDetail.id)
      .then((result) => notification(result.data.message));
      await delay(2000);

    customerService
      .getCustomerById(id)
      .then((result) => setCustomer(result.data.data));
      console.log("customer",customer);
  }

  function notification(message) {
    toast(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <div id="userOrders">
      <div className="wrapper">
        <div className="left-side">
          <div className="user-info">
            <div className="h4">
              Merhaba <span>{customer.firstName}</span>
            </div>
            <p>{customer.email}</p>
          </div>
          <div className="menu-list">
            <ul className="list">
              <li className="list-item">
                <Link
                  className="link active"
                  id="link1"
                  onClick={() => {
                    setOrder(true);
                    setInfo(false);
                    setRefund(false);
                    setActive("link1");
                  }}
                >
                  Siparişlerim
                </Link>
              </li>
              <li className="list-item">
                <Link
                  className="link"
                  id="link2"
                  onClick={() => {
                    setOrder(false);
                    setInfo(false);
                    setRefund(true);
                    setActive("link2");
                  }}
                >
                  İadelerim
                </Link>
              </li>
              <li className="list-item">
                <Link
                  className="link"
                  id="link3"
                  onClick={() => {
                    setOrder(false);
                    setInfo(true);
                    setRefund(false);
                    setActive("link3");
                  }}
                >
                  Kişisel bilgiler ve adresler
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer">
            <Link
              to={"/"}
              className="link"
              onClick={() => {
                // window.localStorage.setItem("isLogIn", false);
                // window.localStorage.setItem("userId", "null");
                // window.localStorage.setItem("showUser", true);
                // window.localStorage.setItem("logedUser", false);
                setShowUser(false);
                setisLogin(false);
                setLogedUser(false);
                setUserId("");
                setshowContentSlider(true);
                setBgColorTrans();
              }}
            >
              Oturumu Kapat
            </Link>
          </div>
        </div>
        <div className="right-side">
          {order &&
            customer.orders?.map((orderItem) => (
              <div className="order-card" key={orderItem.id}>
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <div className="up">
                          <div className="up-left">
                            <img src={Package} alt="" width={30} />
                            <div className="time">
                              {orderItem.creationDate} 'li siparişiniz
                            </div>
                          </div>
                          <div className="up-right">
                            <b>{orderItem.totalPrice} TL</b>
                          </div>
                        </div>
                        <div className="bottom">
                          <b>Adres:</b>
                          {orderItem.location.city} {orderItem.location.address}
                        </div>
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        {orderItem.orderDetails.map((orderDetail) => (
                          <div className="sub-wrap" key={orderDetail.id}>
                            <div className="left">
                              <img
                                src={orderDetail.product.images[0].url}
                                width={75}
                                alt=""
                              />
                            </div>
                            <div className="right">
                              <div className="right-up">
                                <b>{orderDetail.product.name}</b>
                                {!orderDetail.refunded && (
                                  <button
                                    onClick={() => handleSubmit(orderDetail)}
                                  >
                                    İade Et
                                  </button>
                                )}
                              </div>
                              <div className="right-bottom">
                                <div className="category">
                                  <b> Kategori :</b>{" "}
                                  {orderDetail.product.category.name}
                                </div>
                                <div className="size">
                                  <b>Beden : </b>
                                  {orderDetail.size.name}
                                </div>
                                <div className="amount">
                                  <b> Adet : </b>
                                  {orderDetail.amount}
                                </div>

                                <div className="price">
                                  <b>Fiyat : </b> {orderDetail.product.price}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {refund && <UserRefunds customer={customer} />}
          {info && <UserInfo customer={customer} />}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
