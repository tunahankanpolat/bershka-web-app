import React, { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";

export default function AllProducts(props) {
  const [products, setProducts] = useState([]);
  let productService = new ProductService();

  useEffect(() => {
    productService
      .getAllWithView()
      .then((result) => setProducts(result.data.data));
    console.log(products);
  }, []);

  function handleProduct(productId) {
    productService
      .deleteProduct(productId)
      .then((result) => props.not(result.data.message));
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Product Id</th>
          <th>Product Name</th>
          <th>Color Name</th>
          <th>Typology Name</th>
          <th>Category Name</th>
          <th>Discount Percentage</th>
          <th>Price</th>
          <th>Gender</th>
          <th>Validation</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.productId}>
            <td>{product.productId}</td>
            <td>{product.name}</td>
            <td>{product.colorName}</td>
            <td>{product.typologyName}</td>
            <td>{product.categoryName}</td>
            <td>{product.discountPercentage}</td>
            <td>{product.price}</td>
            <td>{product.gender}</td>
            <td>
              <button onClick={() => handleProduct(product.id)}>Sil</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
