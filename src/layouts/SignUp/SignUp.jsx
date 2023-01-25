import React, { useState } from "react";
import { useStateContext } from "../Context/StateContext";
import "./SignUp.scss";
import Left from "../../images/left.png";
import CustomerService from "../../services/CustomerService";
import { ToastContainer, toast } from "react-toastify";

export default function SignUp() {
  const { setShowSignUp, setShowUser,signUp,setSignUp,notSignUp,setNotSignUp } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [address, setAddress] = useState("");
  const [addressTitle, setAddressTitle] = useState("");
  const [country, setCountry] = useState("");
  const [village, setVillage] = useState("");
  const [villageCode, setVillageCode] = useState("");
  const [phone, setPhone] = useState("");
  const [rule1, setRule1] = useState(false);
  const [rule2, setRule2] = useState(false);
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

  const handleSubmit = () => {
    const Customer = {
      email: email,
      password: password,
      firstName: name,
      lastName: surname,
      identityNumber: identityNumber,
      address: address,
      addressTitle: addressTitle,
      city: country,
      town: village,
      postalCode: villageCode,
      phoneNumber: phone,
      rule1: rule1,
      rule2: rule2,
    };

    let validate = validationSchema(Customer);
    if (validate) {
      // clear inputs
      setEmail("");
      setPassword("");
      setName("");
      setSurname("");
      setIdentityNumber("");
      setAddress("");
      setAddressTitle("");
      setCountry("");
      setVillage("");
      setVillageCode("");
      setPhone("");
      setRule1(false);
      setRule2(false);
      let customerService = new CustomerService();
      customerService
        .signUp(Customer)
        .then((result) =>
          notification(result.data.message)
         
        );

      // alert("Kayıt Başarılı");
      // console.log(Customer);
    }
  };

  const validationSchema = (Customer) => {
    if (
      Customer.email === "" ||
      !String(Customer.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      alert("hatalı email");
      return false;
    } else if (
      Customer.password === "" ||
      Customer.password.length < 5 ||
      Customer.password.length > 15
    ) {
      alert("hatalı şifre minimum 5 karakter maksimum 15 karakter olmalıdır");
      return false;
    } else if (
      Customer.identityNumber === "" ||
      Customer.identityNumber.length !== 11 ||
      !String(Customer.identityNumber).match(/^[0-9]+$/)
    ) {
      alert("hatalı kimlik numarası");
      return false;
    } else if (
      Customer.name === "" ||
      Customer.surname === "" ||
      Customer.address === "" ||
      Customer.country === "" ||
      Customer.village === "" ||
      Customer.villageCode === "" ||
      Customer.phone === "" ||
      Customer.rule1 === false
    ) {
      alert("Boş alan bırakmayınız");
      return false;
    } else {
      return true;
    }
  };

  return (
    <div id="signUp">
      {/* {signUp && <Alert message="Kayıt Başarılı" color="steelblue"  />}
      {!notSignUp && <Alert message="Kullanıcı Mevcut" color="red"  />} */}

      <div className="wrapper">
        <div className="header">
          <div className="button">
            <button
              type="button"
              onClick={() => {
                setShowSignUp(false);
                setShowUser(true);
              }}
            >
              <img src={Left} alt="left" />
            </button>
          </div>
          <div className="page-header">Hesap oluştur</div>
        </div>
        <div className="form">
          <div className="inputs-general">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="E-posta"
              autoComplete="off"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Şifre"
              autoComplete="off"
              minLength={5}
            />
          </div>
          <div className="h3">Şahıs</div>
          <div className="inputs-personal">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              placeholder="Adı"
              autoComplete="off"
            />
            <input
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              type="text"
              name="surname"
              id="surname"
              placeholder="Soyadı"
              autoComplete="off"
            />
            <input
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              type="text"
              name="identityNumber"
              id="identityNumber"
              placeholder="Kimlik numarası"
              autoComplete="off"
            />
          </div>
          <div className="h3">İletişim</div>
          <div className="inputs-communication">
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
            <div className="input-gp">
              <span className="input-group-txt" id="basic-addon1">
                +90
              </span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="(5**) *** ** **"
              />
            </div>
          </div>
          <div className="rule">
            <input
              checked={rule1}
              onChange={(e) => setRule1(e.target.checked)}
              type="checkbox"
              name=""
              id="check1"
            />{" "}
            <label htmlFor="check1">
              {" "}
              <a href="#">Gizlilik politikasını</a> okudum ve kabul ediyorum{" "}
            </label>
          </div>
          <div className="rule">
            <input
              checked={rule2}
              onChange={(e) => setRule2(e.target.checked)}
              type="checkbox"
              name=""
              id="check2"
            />{" "}
            <label htmlFor="check2">
              {" "}
              Bershka'daki yenilikler,haberler ve kampanyalar hakkında iletiler
              almayı kabul ediyorum{" "}
            </label>
          </div>
          <button type="submit" disabled={!rule1} onClick={handleSubmit}>
            HESAP OLUŞTUR
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
