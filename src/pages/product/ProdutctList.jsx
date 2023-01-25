import React, { useState } from "react";
import { useEffect } from "react";
import ProductService from "../../services/ProductService";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../../layouts/Context/StateContext";
import CustomerService from "../../services/CustomerService";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import Filter from "../../images/filter.png";

import "./ProductList.scss";
import ColorService from "../../services/ColorService";
import SizeService from "../../services/SizeService";

export default function ProductList() {
  let { name, gender } = useParams();
  const { userId } = useStateContext();
  const { setshowContentSlider,searchItem } = useStateContext();

  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSize] = useState(null);
  const [colorInput, setColor] = useState(null);
  const [priceInput, setPrice] = useState(null);

  const prices = [
    { name: 200 },
    { name: 400 },
    { name: 600 },
    { name: 800 },
    { name: 1000 },
    { name: 1200 },
    { name: 1400 },
    { name: 1600 },
  ];

  useEffect(() => {
    let productService = new ProductService();
    
    if(gender === "search" && name !==null){
      console.log(searchItem);
       setProducts(searchItem);
      
   
    }
    else if(gender === "campaign-products" && name !==null){
      productService
        .getAllDiscounted()
        .then((result) => setProducts(result.data.data));
    }
    else{
      productService
        .getProductByTypologyAndGender(name, gender)
        .then((result) => setProducts(result.data.data));
    }
 
  }, []);
  useEffect(() => {
    let colorService = new ColorService();
    colorService.getAll().then((result) => setColors(result.data.data));
  }, [products]);
  useEffect(() => {
    let sizeService = new SizeService();
    sizeService.getAll().then((result) => setSizes(result.data.data));
  }, []);
  function setBgColor(params) {
    document.getElementById("navbar").style.backgroundColor = "black";
  }
  function likeProduct(productId) {
    let customerService = new CustomerService();
    customerService
      .addFavourites(userId, productId)
      .then((result) => alert(result.data.message));
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

  const openFilter = () => {
    document.querySelector(".filter-section").classList.toggle("active");
  };

  const handleFilter = () => {
    const filterObject = {
      color: colorInput,
      size: sizeInput,
      min: 0,
      max:  priceInput,
      typology: name,
      gender: gender,
    };

    setProducts([]);
    let productService = new ProductService();
    productService
      .filterProductList(filterObject)
      .then((result) => setProducts(result.data.data));
  };

  const handleClear = () => {
    setSize(null);
    setColor(null);
    setPrice(null);
    document.getElementsByTagName("input").checked = false;
    setProducts([]);
    let productService = new ProductService();
    productService
      .getProductByTypologyAndGender(name, gender)
      .then((result) => setProducts(result.data.data));
  };

  return (
    <div id="product-list">
      <div className="wrapper">
        <div className="header">
          {name}
          {
            gender !== "search" ?           <div className="filter-button" onClick={openFilter}>
            <img src={Filter} alt="" />
          </div> : <div></div>
          }

        </div>
        <div className="filter-section">
          <div className="filter-up">
            <div className="color-col">
              <div className="header">Renk</div>
              {colors?.map((color) => (
                <div key={color.name}>
                  <input
                    value={color.name}
                    onChange={e => {setColor(e.target.value);console.log(color)}}
                    type="radio"
                    name="color"
                    id={color.name}
                    checked={color.name === colorInput}
                  />
                  <label htmlFor={color.name}>{color.name}</label>
                </div>
              ))}
            </div>
            <div className="size-col">
              <div className="header">Beden</div>
              {sizes?.map((size) => (
                <div key={size.name}>
                  <input
                    type="radio"
                    name="size"
                    id={size.name}
                    value={size.name}
                    onChange={e => {setSize(e.target.value)}}
                    checked={size.name === sizeInput}

                  />
                  <label htmlFor={size.name}>{size.name}</label>
                </div>
              ))}
            </div>
            <div className="price-col">
              <div className="header">Fiyat</div>
              {prices?.map((price) => (
                <div key={price.name}>
                  <input
                    type="radio"
                    name="price"
                    id={price.name}
                    value={price.name}
                    onChange={e => {setPrice(e.target.value)}}
                    checked={JSON.stringify(price.name) === priceInput}

                  />
                  <label htmlFor={price.name}>{price.name} TL'ye kadar</label>
                </div>
              ))}
            </div>
          </div>
          {sizeInput || colorInput || priceInput ? (
            <div className="filter-d1">
              <button
                type="submit"
                className="clear-filter"
                onClick={handleClear}
              >
                <i class="fa-solid fa-trash"></i>Seçimleri Temizle
              </button>
            </div>
          ) : (
            <div></div>
          )}
          <div className="filter-down">
            <button type="submit" onClick={handleFilter}>
              Sonuçları Görüntüle
            </button>
          </div>
        </div>

        <div className="sub-wrapper">
          {products.map((item) => (
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
                    {userId !== "" ? (
                      <i
                        className="fa-regular fa-heart text-black"
                        onClick={() => likeProduct(item.id)}
                      ></i>
                    ) : (
                      <i
                        className="fa-regular fa-heart text-black"
                        onClick={() =>
                          notification("Öncelikle Giriş Yapmanız Gerekmektedir")
                        }
                      ></i>
                    )}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
