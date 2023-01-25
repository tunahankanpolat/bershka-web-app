import React, { useState } from "react";
import "./Liked.scss";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../Context/StateContext";
import CustomerService from "../../services/CustomerService";
import { ToastContainer, toast } from "react-toastify";

export default function Liked() {
  const { userId } = useStateContext();
  const { setshowContentSlider } = useStateContext();

  const [likeds, setLikeds] = useState([]);

  useEffect(() => {
    let customerService = new CustomerService();

    customerService
      .getFavourites(userId)
      .then((result) => setLikeds(result.data.data));
  }, []);

  function setBgColor(params) {
    document.getElementById("navbar").style.backgroundColor = "black";
  }

  function removeFavourite(itemId) {
    let customerService = new CustomerService();
    customerService
      .deleteFavourite(userId, itemId)
      .then((result) => notification(result.data.message));
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
    <div id="liked">
      <div className="wrapper">
        <div className="header">Favorilerim</div>
        <div className="sub-wrapper">
          {likeds.length === 0 ? (
            <div className="empty">
              <div>
                <h2>Upssss Hiç Mi Favorin Yok</h2><br /><br />
              </div>
              <i className="fa-regular fa-heart text-black"></i>
            </div>
          ) : (
            likeds?.map((item) => (
              <Link
                to={`${item.id}`}
                className="liked-link"
                key={item.id}
                onClick={() => {
                  setshowContentSlider(false);
                  setBgColor();
                }}
              >
                <div className="like-card">
                  <div className="like-card-header">
                    <img src={item.images[0].url} alt="model" />
                  </div>
                  <div className="like-card-footer">
                    <div className="card-description">
                      <div className="card-name">{item.name}</div>
                      <div className="card-price">{item.price} TL</div>
                    </div>
                    <span className="like">
                      <i
                        className="fa-solid fa-heart"
                        onClick={() => removeFavourite(item.id)}
                      ></i>
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
