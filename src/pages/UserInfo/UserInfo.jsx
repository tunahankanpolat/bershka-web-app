import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../../layouts/Context/StateContext";
import CustomerService from "../../services/CustomerService";
import { ToastContainer, toast } from "react-toastify";

import "./UserInfo.scss";
export default function UserInfo(props) {
  const [customer, setCustomer] = useState({});
  const [updatePassword, setUpdatePassword] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [addLocation, setAddLocation] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [address, setAddress] = useState("");
  const [addressTitle, setAddressTitle] = useState("");
  const [country, setCountry] = useState("");
  const [village, setVillage] = useState("");
  const [villageCode, setVillageCode] = useState("");

  useEffect(() => {
    setCustomer(props.customer);
    console.log(props.customer.locations);
  }, []);

  const handleUpdatePass = () => {
    if (document.getElementById("passwordBtn").classList.contains("active")) {
      document.getElementById("passwordBtn").classList.toggle("active");
      setUpdatePassword(false);
    } else {
      document.getElementById("passwordBtn").classList.toggle("active");
      setUpdatePassword(true);
    }
  };
  const handleUpdateEmail = () => {
    if (document.getElementById("emailBtn").classList.contains("active")) {
      document.getElementById("emailBtn").classList.toggle("active");
      setUpdateEmail(false);
    } else {
      document.getElementById("emailBtn").classList.toggle("active");
      setUpdateEmail(true);
    }
  };

  const addNewLocation = () => {
    if (
      document.getElementById("addNewLocation").classList.contains("active")
    ) {
      document.getElementById("addNewLocation").classList.toggle("active");
      setAddLocation(false);
    } else {
      document.getElementById("addNewLocation").classList.toggle("active");
      setAddLocation(true);
    }
  };


  async function handleSubmit() {
    const Location = {
      address: address,
      title: addressTitle,
      city: country,
      town: village,
      postalCode: villageCode,
    };

    // setAddress("");
    // setAddressTitle("");
    // setCountry("");
    // setVillage("");
    // setVillageCode("");
    console.log(Location, customer.id);
    let customerService = new CustomerService();
    customerService
      .addLocation(Location, customer.id)
      .then((result) => notification(result.data.message));
    await delay(1000);
    customerService
      .getCustomerById(customer.id)
      .then((result) => setCustomer(result.data.data));
  }
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  function handleUpdate() {
    let customerService = new CustomerService();
    customerService
      .updatePassword(props.customer.id, email, password)
      .then((result) => notification(result.data.message));
    setEmail("");
    setPassword("");
  }

  function setBgColorTrans(params) {
    document.getElementById("navbar").style.backgroundColor = "transparent";
  }
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
  return (
    <div id="userInfo">
      <div className="first-section">
        <div className="h5">HESABINIZA GIRIŞ YAPIN</div>
        <div className="first-mid">
          <div className="password">ŞİFRE__________</div>
          <button className="btn" id="passwordBtn" onClick={handleUpdatePass}>
            Şifreyi Değiştir<i class="fa-solid fa-pencil"></i>{" "}
          </button>
        </div>
        {updatePassword && (
          <div className="update-password">
            <label htmlFor="">
              <input
                type="email"
                id="email"
                placeholder="Mevcut Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                id="newPassword"
                placeholder="Yeni Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button onClick={() => handleUpdate()}>Güncelle</button>
          </div>
        )}
        <p>
          Şifrenizi değiştirmek isterseniz «Şifre değiştir» kısmına tıklayıp,
          istenilen bilgiyi giriniz.
        </p>
      </div>
      <div className="second-section">
        <div className="h5">EMAİL</div>
        <div className="second-mid">
          <div className="email">{customer.email}</div>
          <div className="button">
            <button className="btn" id="emailBtn" onClick={handleUpdateEmail}>
              Email Değiştir<i class="fa-solid fa-pencil"></i>{" "}
            </button>
          </div>
        </div>
        {updateEmail && (
          <div className="update-email">
            <label htmlFor="">
              <input
                type="email"
                id="email"
                placeholder="Yeni Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                id="newPassword"
                placeholder="Mevcut Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button onClick={() => handleUpdate()}>Güncelle</button>
          </div>
        )}
        <p>
          Emailinizi değiştirmek isterseniz «Email değiştir» kısmına tıklayıp,
          istenilen bilgiyi giriniz.
        </p>
      </div>
      <div className="third-section">
        <div className="h4">KİŞİSEL BİLGİLER</div>
        <p>
          Fatura Adresi Sipariş Ekranında Sizler Tarafından Seçilir ve En Son Hangi Adresi kullandıysanız , Bu Ekranda O Görülür.
        </p>
        <div className="subHead">
          Kişisel bilgilerinizi kontrol etme
        </div>

        <div className="third-mid">
          <div className="info">
            <div className="info-header">FATURA BİLGİLERİ</div>
               <div className="info-group">
              <div>Ad : {customer.firstName}</div>
              <div>Soyad : {customer.lastName}</div>
              <div>Email : {customer.email}</div>
              <div>Başlık : {customer.lastLocation?.title}</div>
              <div>Adres : {customer.lastLocation?.address}</div>
              <div>İl : {customer.lastLocation?.city}</div>
              <div>İlçe : {customer.lastLocation?.town}</div>
              <div>Posta Kodu : {customer.lastLocation?.postCode}</div>
              <div>Cep Telefonu : {customer.phoneNumber}</div>
            </div>

          </div>

        </div>
      </div>
      <div className="fourth-section">
        <div className="h4">ADRESLERİM</div>
        <div className="fourth-mid"></div>
        <div className="footer">
          {customer.locations?.map((location) => (
            <div className="address" key={location.id}>
              <div className="address-header">
                <b>{location.title}</b>
              </div>
              <div className="address-group">
                <div>Adres : {location.address}</div>
                <div>İl : {location.city}</div>
                <div>İlçe : {location.town}</div>
                <div>Posta Kodu : {location.postCode}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fifth-section">
        <div className="header">
          <p>
            <b>Yeni Adres Ekle</b>
          </p>
          <button className="btn " id="addNewLocation" onClick={addNewLocation}>
            <i class="fa-solid fa-plus fa-1x"></i>{" "}
          </button>
        </div>
        {addLocation && (
          <div className="inputsCommunication">
            <input
              value={addressTitle}
              onChange={(e) => setAddressTitle(e.target.value)}
              type="text"
              name="address-title"
              id="address-title"
              placeholder="Adres Başlığı"
              autoComplete="off"
            />
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              name="address"
              id="address"
              placeholder="Adres"
              autoComplete="off"
            />
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              name="country"
              id="country"
              placeholder="İl"
              autoComplete="off"
            />
            <input
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              type="text"
              name="village"
              id="village"
              placeholder="İlçe"
              autoComplete="off"
            />
            <input
              value={villageCode}
              onChange={(e) => setVillageCode(e.target.value)}
              type="text"
              name="village-code"
              id="village-code"
              placeholder="Posta Kodu"
              autoComplete="off"
            />

            <button
              className=""
              onClick={() => {
                handleSubmit();
                setAddLocation(false);
              }}
            >
              Ekle
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
