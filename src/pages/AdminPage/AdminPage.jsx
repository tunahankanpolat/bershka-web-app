import React, { useState } from "react";
import { useEffect } from "react";
import "./AdminPage.scss";
import AdminService from "../../services/AdminService";
import Log from "./Log";
import CustomerSign from "./CustomerSign";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";
import { ToastContainer, toast } from "react-toastify";
import { useStateContext } from "../../layouts/Context/StateContext";
import { useNavigate } from "react-router-dom";
import AllProducts from "./AllProducts";

export default function AdminPage() {
  const [isLog, setisLog] = useState(false);
  const [customerSign, setCustomerSign] = useState(false);
  const [productManage, setProductManage] = useState(false);
  const [orderManage, setOrderManage] = useState(false);
  const [allProduct, setAllProduct] = useState(false);

  const { setShowUser, setShowNavbar } = useStateContext();
  let navigate = useNavigate();

  function handleLogOut() {
    setShowNavbar(true)
    setShowUser(false)
    navigate("/")
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
    <div id="adminPage">
      <nav>
        <ul>
          <li>
            <button className="btn"><b>Bershka</b></button>
          </li>
          <li>
            <button
              className="btn"
              onClick={() => {
                setisLog(false);
                setCustomerSign(false);
                setProductManage(false);
                setOrderManage(false);
                setAllProduct(true);
              }}
            >
              Tüm Ürünler
            </button>
          </li>
          <li>
            <button
              className="btn"
              onClick={() => {
                setisLog(true);
                setCustomerSign(false);
                setProductManage(false);
                setOrderManage(false);
                setAllProduct(false);

              }}
            >
              Loglar
            </button>
          </li>
          <li>
            <button
              className="btn"
              onClick={() => {
                setisLog(false);
                setCustomerSign(true);
                setProductManage(false);
                setOrderManage(false);                setAllProduct(false);

              }}
            >
              Müşteri Kayıtları
            </button>
          </li>
          <li>
            <button
              className="btn"
              onClick={() => {
                setisLog(false);
                setCustomerSign(false);
                setProductManage(true);
                setOrderManage(false);                setAllProduct(false);

              }}
            >
              Ürün Ekleme
            </button>
          </li>
          <li>
            <button
              className="btn"
              onClick={() => {
                setisLog(false);
                setCustomerSign(false);
                setProductManage(false);
                setOrderManage(true);                setAllProduct(false);

              }}
            >
              Sipariş Yönetimi
            </button>
          </li>
          <li>
            {" "}
            <button className="btn" onClick={() => handleLogOut()}>
              Çıkış
            </button>
          </li>
        </ul>
      </nav>
      <div className="page-content">
        {isLog && <Log />}
        {customerSign && <CustomerSign not={notification} />}
        {productManage && <ProductManagement not={notification} />}
        {orderManage && <OrderManagement not={notification} />}
        {allProduct && <AllProducts not={notification} />}

      </div>
      <ToastContainer />
    </div>
  );
}
