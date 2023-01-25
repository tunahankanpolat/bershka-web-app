import React, { useEffect, useState } from "react";
import AdminService from "../../services/AdminService";
import OrderService from "../../services/OrderService";

export default function OrderManagement(props) {


    const [orders, setOrders] = useState([]);
    let orderService = new OrderService();

    useEffect(() => {
      orderService
        .getAll()
        .then((result) => setOrders(result.data.data));     
        console.log(orders);
    }, []);
  
    function handleOrder(orderId) {
        orderService
        .deleteOrder(orderId)
        .then((result) => props.not(result.data.message));
    }


  return (
    <table>
    <thead>
      <tr>
        <th>Order Price</th>
        <th>Order Location</th>
        <th>Billing Location</th> 
        <th>Creation Date</th>
        <th>Discount Code</th>
        <th>Validation</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order.id}>
             <td>{order.totalPrice} TL</td>
             <td>{order.location.address+" "+order.location.city}</td>
             <td>{order.billingLocation.address+" "+ order.billingLocation.city}</td>
             <td>{order.creationDate}</td>
             <td>{order.discountCode.code}</td>


          <td>
          <button onClick={()=> handleOrder(order.id)}>İptal Et</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}
