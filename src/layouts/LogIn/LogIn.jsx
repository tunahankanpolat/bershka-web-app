import React, { useState } from "react";
import { useStateContext } from "../Context/StateContext";
import "./LogIn.scss";
import Logo from "../../images/green-mnstr.png";
import Facebook from "../../images/facebook.png";
import "./LogIn.scss";
import UserService from "../../services/UserService";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
export default function LogIn() {
  const {
    setShowUser,
    isLogin,
    setisLogin,
    setisActive,
    isActive,
    setShowUpdate,
    setLogedUser,
    setUserId,showNavbar, setShowNavbar,
  } = useStateContext();
  const { setShowSignUp } = useStateContext();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const User = {
    email: email,
    password: password,
  };
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    let validate = validationSchema(User);
    if (validate) {
      setEmail("");
      setPassword("");
      let userService = new UserService();
      userService
        .logIn(User)
        .then(async (result) =>
          result.data.message === "Başarılı"
            ? 
            (
              // localStorage.setItem("isLogIn", true),
              // localStorage.setItem("userId", result.data.data.id),
              // localStorage.setItem("showUser", false),
              // localStorage.setItem("logedUser", true),
              notification("Giriş Başarılı"),
              await delay(2000),
              setisLogin(true),
              setShowUser(false),
              setLogedUser(true),
              setUserId(result.data.data.id)
              )
            :(
              result.data.message === "Admin" ? (
                notification("Admin Girişi"),await delay(2000),setShowNavbar(false),navigate("/admin/dashboard/management"),
                setShowUser(false)

              ):(
                notification("Kullanıcı henüz aktif değil ya da bilgileriniz yanlış"),
                await delay(2000),
                setisActive(false)
              )

            ) 
        );
    } else {
      console.log("girmedi");
    }
  };
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const validationSchema = (User) => {
    if (
      User.email === "" ||
      !String(User.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      notification("hatalı email");
      return false;
    } else if (
      User.password === "" ||
      User.password.length < 5 ||
      User.password.length > 15
    ) {
      notification("hatalı şifre minimum 5 karakter maksimum 15 karakter olmalıdır");
      return false;
    } else if (User.email === "" || User.password === "") {
      notification("Boş alan bırakmayınız");
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    window.localStorage.setItem("logIn", JSON.stringify(User));
  });
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
    <div id="logIn">
      {/* {isLogin && <Alert message="Giriş Yapılıyor" color="steelblue" />}
      {!isActive && (
        <Alert
          message="Kullanıcı henüz aktif değil ya da bilgileriniz yanlış"
          color="red"
        />
      )} */}

      <div className="wrapper">
        <div className="logIn-upper">
          <div className="button">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => (
                setShowUser(false)
              )}
            ></button>
          </div>
          <div className="header-wrapper">
            <img src={Logo} alt="green-monster" />
            <div className="h5">Oturum aç veya kaydol</div>
          </div>
          <div className="social-logIn">
            <button className="btn btn-primary">
              <div className="btn-img col-1  d-inline-block ">
                <img src={Facebook} alt="facebook-logo" />
              </div>
              <div className="btn-p d-inline-block col-11">
                Facebook ile devam et
              </div>
            </button>
            <div className="sub-info">
              <p>
                Sosyal medya hesabımla giriş yaparak hesaplarımın Gizlilik
                Politikasına uygun şekilde bağlanmasını kabul ediyorum
              </p>
            </div>
          </div>
        </div>
        <div className="trans">
          <p>veya</p>
        </div>

        <div className="logIn-lower">
          <form action="">
            <div className="inputs">
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
              />
            </div>
            <div className="validation">
              <div className="check">
                <input type="checkbox" name="hold-account" id="hold-account" />
                Oturumu Sürdür
              </div>
              <button
                className="border-0 bg-transparent"
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  setShowUpdate(true);
                  setShowUser(false);
                }}
              >
                Parolanı mı unuttun?
              </button>
            </div>
            <button
              className="btn btn-black"
              type="submit"
              disabled={password === ""}
              onClick={handleSubmit}
            >
              OTURUM AÇ
            </button>
          </form>
          <div className="footer">
            <p>
              Hesabın yok mu?{" "}
              <button
                className="border-0 bg-transparent"
                onClick={() => {
                  setShowSignUp(true);
                  setShowUser(false);
                }}
              >
                Kayıt Ol
              </button>{" "}
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
