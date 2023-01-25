import React, { useState } from 'react'
import "./ForgotPassword.scss";
import { useStateContext } from '../Context/StateContext';
import CustomerService from '../../services/CustomerService';
import Left from "../../images/left.png";

export default function ForgotPassword() {

    const {setShowUser,setForgotPassword,forgotPassword,setShowUpdate } = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  
    const handleSubmit = () => {
      const Customer = {
        email: email,
        password: password,
      };
  
      let validate = validationSchema(Customer);
      if (validate) {
        // clear inputs
        setEmail("");
        setPassword("");
        let customerService = new CustomerService();
        customerService
          .updatePassword(Customer)
          .then((result) =>
            result.data.message === "Başarılı" ? setForgotPassword(true) : alert("Üzgünüz bir hata oluştu"),
           
          );
  
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
      } else {
        return true;
      }
    };



  return (
    <div id='forgotPassword'>
          <div className="wrapper">
        <div className="header">
          <div className="button">
            <button
              type="button"
              onClick={() => {
                setShowUpdate(false);
                setShowUser(true);
              }}
            >
              <img src={Left} alt="left" />
            </button>
          </div>
          <div className="page-header">Parolanı mı unuttun?</div>
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
              placeholder="Yeni Şifre"
              autoComplete="off"
              minLength={5}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            SIFIRLA
          </button>
        </div>
      </div>
    </div>
  )
}
