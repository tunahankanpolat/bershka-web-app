import React, { useState } from "react";
import CustomerService from "../../services/CustomerService";
import { useStateContext } from "../Context/StateContext";
import "./OrderInfo.scss";
export default function OrderInfo(props) {
  const {
    totalPrice,
    totalQuantities,
    setShowCart,
    userId,
    setTotalQuantities,
    cartItems,
    setCartItems,
    settotalPrice,
  } = useStateContext();

  return (
    <div id="orderInfo">
      <div className="title">
        <b>Kayıtlı bir adres seçin</b>
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
                props.setShippingAddress(e.target.value)
              }}
              checked={props.shippingAddress === JSON.stringify(item.id)}
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
  );
}
