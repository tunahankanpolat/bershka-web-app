import React, { useState } from "react";
import "./BillingInfo.scss";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import CustomerService from "../../services/CustomerService";
import { ToastContainer, toast } from "react-toastify";

export default function BillingInfo(props) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");
  const [loadMoney, setLoadMoney] = useState("");

  async function handleBudget() {
    let customerService = new CustomerService();
    customerService
      .increaseBudget(props.customer.id, loadMoney)
      .then((result) => {
        notification(result.data.message);
      });
    customerService.getCustomerById(props.customer.id).then((result) => {
      props.setCustomer(result.data.data);
    });
    document.getElementById("budgetElement").innerHTML =
      "Mevcut Bakiye : " +
      Number(Number(props.customer.budget) + Number(loadMoney)) +
      " TL";
  }
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
    <div id="billingInfo">
      <div className="up">
        <div className="up-left">
          <b id="budgetElement">Mevcut Bakiye :</b>

          <p>
            Eğer bakiye yeterli ise yüklemeye gerek yoktur.
            <br /> Satın almak için öncelikle cüzdanınızda yeterli para
            olmalıdır. <br /> Eğer bakiye güncellenmediyse inputları boş
            bırakarak bir kez daha yükleye basınız.
          </p>
        </div>
        <button
          type="submit"
          onClick={() => {
            handleBudget();
          }}
        >
          YÜKLE
        </button>
      </div>

      <div className="card-up">
        <div className="crd">
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focus}
          />
          <input
            type="tel"
            name="loadMoney"
            placeholder="Yüklenecek Tutar"
            value={loadMoney}
            maxLength={5}
            onChange={(e) => setLoadMoney(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
        </div>
        <div className="card-form">
          <form action="">
            <input
              type="tel"
              name="number"
              placeholder="Kart Numarası"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <input
              type="text"
              name="name"
              placeholder="Ad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={expiry}
              maxLength={4}
              onChange={(e) => setExpiry(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              value={cvc}
              maxLength={3}
              onChange={(e) => setCvc(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
          </form>
        </div>
      </div>
      <div className="billLocation">
        <div className="title">
          <b>Fatura adresi seçiniz</b>
        </div>
        <div className="addressLines">
          {props.customer.locations?.map((item) => (
            <div className="inp-group" key={item.id}>
              <input
                type="radio"
                name="location"
                value={item.id}
                id={item.id}
                onChange={(e) => {
                  props.setBillingAddress(e.target.value);
                }}
                checked={props.billingAddress === JSON.stringify(item.id)}
              />
              <label htmlFor={item.id}>
                <div className="location">
                  <b>{item.title}</b>
                  <b>
                    {props.customer.firstName + " " + props.customer.lastName}{" "}
                  </b>
                </div>
                <div className="location">{item.address}</div>
                <div className="location">{item.city}</div>
                <div className="location">Town</div>
                <div className="location">{item.postCode}</div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
