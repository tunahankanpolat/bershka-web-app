import React, { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { useStateContext } from "../../layouts/Context/StateContext";
import ProductService from "../../services/ProductService";
import { useParams } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import Gonder from "../../images/gonder.png";
import Iadeler from "../../images/refund.png";
import SizeService from "../../services/SizeService";
const ProductDetail = () => {
  let { id } = useParams();
  const {
    userId,
    setTotalQuantities,
    cartItems,
    setCartItems,
  } = useStateContext();
  const [product, setProduct] = useState({});
  const [showPage, setshowPage] = useState(false);
  const [sizes, setsizes] = useState([])
  let customerService = new CustomerService();

  useEffect(() => {
    let productService = new ProductService();
    productService
      .getProductById(id)
      .then((result) => setProduct(result.data.data));
    
      let sizeService = new SizeService();
      sizeService.getAllWithProductId(id).then((result) => setsizes(result.data.data) );
      console.log(product)
  }, [id]);

  useEffect(() => {
    setInterval(() => {
      setshowPage(true);
    }, 100);
  }, []);

  // const sizes = [
  //   { key: "S", value: "S" },
  //   { key: "M", value: "M" },
  //   { key: "L", value: "L" },
  //   { key: "XL", value: "XL" },
  //   { key: "XXL", value: "XXL" },
  // ];
  const [selectedSizes, setSize] = useState();
  function submitHandle() {
    // onAdd(product, 1, selectedSizes);
    if (userId !== "") {
      console.log(selectedSizes)
      customerService.addBasket(userId, id, 1, Number(selectedSizes)).then((result) => {
        notification(result.data.message);
        customerService
          .getBasket(userId)
          .then((result) => setCartItems(result.data.data));
        setTotalQuantities(cartItems.length);
      });
      // async function waiter(){
      //   await delay(200);
      // }

      // console.log(cartItems.length)
      //
    } else {
      notification("Lütfen giriş yapınız.");
    }
  }
  function dis() {
    if (!selectedSizes) {
      document.getElementsByClassName("button").item(0).innerHTML = "BEDEN SEÇ";
    }
  }

  function likeProduct() {
    customerService
      .addFavourites(userId, id)
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
    <div>
      {showPage && (
        <div className="productDetail">
          <div className="productDetail-left">
            <div
              id="carousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={product.images[0].url}
                    className="d-block"
                    alt="slide-1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={product.images[1].url}
                    className="d-block"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={product.images[2].url}
                    className="d-block"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="productDetail-right">
            <div className="content">
              <div className="header">{product.name}</div>
              <div className="price">{product.price} TL</div>
              <div className="product-info">
                <div className="color">{product.color.name}</div>
              </div>

              <div className="sizes">
                <div className="size-header">Beden Seç</div>

                {sizes.map((s) => (
                  <div className="btn-group" key={s.size.id}>
                    <input
                      type="radio"
                      name="size"
                      id={s.size.id}
                      className="btn"
                      value={s.size.id}
                      checked={JSON.stringify(s.size.id) === selectedSizes}
                      onChange={(e) => setSize(e.target.value)}
                    />
                    <div className="input-group">
                      <label htmlFor={s.size.id}>{s.size.name}</label>
                    </div>
                  </div>
                ))}
                {/* {JSON.stringify(selectedSize)} */}

                {/* <div className="selectedSizes-table">
                  <div className="selectedSizes-logo">
                    <i className="fa-solid fa-ruler"></i>
                  </div>
                </div> */}
              </div>
              <div className="footer">
                <button
                  className="button"
                  onClick={() => {
                    selectedSizes ? submitHandle() : dis();
                  }}
                >
                  SEPETE EKLE
                </button>
                {userId !== "" ? (
                  <div className="liked-icon">
                    <i
                      className="fa-regular fa-heart"
                      onClick={() => likeProduct()}
                    ></i>
                  </div>
                ) : (
                  <div className="liked-icon">
                    <i
                      className="fa-regular fa-heart"
                      onClick={() =>
                        notification("Öncelikle Giriş Yapmanız Gerekmektedir")
                      }
                    ></i>
                  </div>
                )}
              </div>
            </div>
            <div className="footer-content">
              <button
                type="button"
                class="btn"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <b>Gönderi</b>
              </button>
              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                      <div className="modal-header">
                      <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                      </div>
                    <div class="modal-body">
                      <img src={Gonder} alt="" width={450} />
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn" >|</button>
              <button
                type="button"
                class="btn"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop2"
              >
                <b>İadeler</b>
              </button>
              <div
                class="modal fade"
                id="staticBackdrop2"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                      <div className="modal-header">
                      <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                      </div>
                    <div class="modal-body">
                      <img src={Iadeler} alt="" width={450}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
