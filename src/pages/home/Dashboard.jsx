import React from "react";
import Woman from "../product/Woman";
import Man from "../product/Man";

import { Routes, Route } from "react-router-dom";
import ProductDetail from "../product/ProductDetail";
import Liked from "../../layouts/Liked/Liked";
import ProductList from "../product/ProdutctList";
import UserOrders from "../UserOrders/UserOrders";
import UserRefunds from "../UserRefunds/UserRefunds";
import UserInfo from "../UserInfo/UserInfo";
import OrderPage from "../OrderPage/OrderPage";
import AdminPage from "../AdminPage/AdminPage";

export default function Dashboard() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Man />} />
        <Route exact path="/man" element={<Man />} />
        <Route exact path="/woman" element={<Woman />} />
        <Route exact path="/wish-list" element={<Liked />} />

        <Route path="/man/:id" element={<ProductDetail />} />
        <Route path="/woman/:id" element={<ProductDetail />} />
        <Route path="/wish-list/:id" element={<ProductDetail />} />

        <Route exact path="/:name/:gender" element={<ProductList />} />
        <Route exact path="/:search" element={<ProductList />} />

        <Route exact path="/:name/:gender/:id" element={<ProductDetail />} />
        <Route exact path="/user-panel/:id" element={<UserOrders />} />
        <Route exact path="/order" element={<OrderPage />} />
        <Route exact path="/admin/dashboard/management" element={<AdminPage />} />

      </Routes>
    </div>
  );
}
