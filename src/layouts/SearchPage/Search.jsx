import React, { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import SearchLogo from "../../images/search-black.png";
import { useStateContext } from "../Context/StateContext";
import "./Search.scss";
import ProductService from "../../services/ProductService";
export default function Search() {
  const { setShowSearch,searchItem,setSearchItem,setshowContentSlider} = useStateContext();
  const [search, setSearch] = useState(null);

  const navigate = useNavigate();


  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      let productService = new ProductService();
      productService
        .getByNameLike(search)
        .then((result) => setSearchItem(result.data.data));
      setShowSearch(false);setshowContentSlider(false);    await delay(1000);
      navigate(`/${search}/search`);
    }
  };

  async function handleSearch(name){
    console.log(name);
    let productService = new ProductService();
    productService
      .getByNameLike(name)
      .then((result) => setSearchItem(result.data.data));
    setShowSearch(false);setshowContentSlider(false);setBgColor();  await delay(1000);
    navigate(`/${name}/search`);
  }
  function setBgColor(params) {
    document.getElementById("navbar").style.backgroundColor = "black";
  }
  const delay = ms => new Promise(res => setTimeout(res, ms));

  return (
    <div id="searchPage">
      <div className="wrapper">
        <div className="page-header">
          <Link to="/" className="link" onClick={() => setShowSearch(false)}>
            <div className="logo">Bershka</div>
          </Link>
          <div className="button">
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              onClick={() => setShowSearch(false)}
            ></button>
          </div>
        </div>
        <div className="page-content">
          <div className="search-icon">
            <div className="form">
              <img src={SearchLogo} />
              <input
                type="text"
                name="search"
                id="searchProduct"
                placeholder="Ara"
                autoComplete="off"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleEnter}
              />
            </div>
          </div>
          <div className="most-searched">
            <div className="h5">En Çok Arananlar</div>
            <ul>
              <li>
                <div onClick={()=>handleSearch("Mont")} className="list-link">Mont</div>
              </li>
              <li>
                <div  onClick={()=>handleSearch("Kaban")} className="list-link">Kaban</div>
              </li>
              <li>
                <div onClick={()=>handleSearch("Bot")} className="list-link">Bot</div>
              </li>
              <li>
                <div onClick={()=>handleSearch("Ceket")} className="list-link">Ceket</div>
              </li>
              <li>
                <div onClick={()=>handleSearch("Deri ceket")} className="list-link">Deri ceket</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
