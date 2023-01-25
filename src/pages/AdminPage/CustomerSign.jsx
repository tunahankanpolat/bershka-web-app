import React, { useEffect, useState } from "react";
import AdminService from "../../services/AdminService";
import CustomerService from "../../services/CustomerService";

export default function CustomerSign(props) {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    let customerService = new CustomerService();
    customerService
      .getAllInActives()
      .then((result) => setCustomers(result.data.data));
    console.log(customers);
  }, []);

  function handleCustomer(customerId) {
    let adminService = new AdminService();
    adminService
      .activateCustomer(customerId)
      .then((result) => props.not(result.data.message));

  }

  
  return (
    <table>
      <thead>
        <tr>
          <th>Firstname</th>
          <th>LastName</th>
          <th>Email</th> 
          <th>IdentityNumber</th>
          <th>Validation</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.firstName}</td>
            <td>{customer.lastName}</td>
            <td>{customer.email}</td>
            <td>{customer.identityNumber}</td>
            <td>
            <button onClick={()=> handleCustomer(customer.id)}>Onayla</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
