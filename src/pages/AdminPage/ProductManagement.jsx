import React, { useEffect, useState } from "react";
import ColorService from "../../services/ColorService";
import CategoryService from "../../services/CategoryService";
import TypologyService from "../../services/TypologyService";
import SizeService from "../../services/SizeService";

import "./ProductManagement.scss";
import ProductService from "../../services/ProductService";
export default function ProductManagement(props) {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [typology, setTypology] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState();

  const [colorList, setColorList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [typologyList, setTypologyList] = useState([]);
  const [sizeList, setSizeList] = useState([]);

  const sizes = [];
  useEffect(() => {
    let colorService = new ColorService();
    colorService.getAll().then((result) => setColorList(result.data.data));

    let categoryService = new CategoryService();
    categoryService
      .getAll()
      .then((result) => setCategoryList(result.data.data));

    let sizeService = new SizeService();
    sizeService.getAll().then((result) => setSizeList(result.data.data));
  }, []);

  function typologyHandle() {
    let typologyService = new TypologyService();
    typologyService
      .getByCategoryIdAndGender(category, gender)
      .then((result) => setTypologyList(result.data.data));
    console.log(sizes);
  }

  function handleAdd() {
    const amount = [];
    for (let index = 0; index < sizes.length; index++) {
      amount.push(20);
    }
    console.log(amount);
    let product = {
      name: name,
      price: Number(price),
      colorId: Number(color),
      categoryId: Number(category),
      typologyId: Number(typology),
      img_1: image1,
      img_2: image2,
      img_3: image3,
      gender: gender,
      sizeId: sizes,
      discountPercentage: Number(0),
      amount: amount,
    };
    if (validationSchema(product)) {
      console.log(product);
      let productService = new ProductService();
      productService.addProduct(product).then((result) => props.not("ekledi"));

      setName("");
      setPrice("");
      setColor("");
      setCategory("");
      setTypology("");
      setImage1("");
      setImage2("");
      setImage3("");
      setGender("");
      setSize("");
      amount.splice(0, amount.length);
    }else{
      props.not("Lütfen Tüm Alanları Doldurunuz")
    }
  }

  const validationSchema = (product) => {
    if (
      product.name === "" ||
      product.price === "" ||
      product.colorId === "" ||
      product.categoryId === "" ||
      product.typologyId === "" ||
      product.img_1 === "" ||
      product.img_2 === "" ||
      product.img_3 === "" ||
      product.gender === "" 
    ) {
      return false;
    } else {
      return true;  
    }
  };

  return (
    <div id="productManagement">
      <div className="left">
        <div id="carousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={image1}
                className="d-block"
                alt="GÖRSEL URL YÜKLEYİNİZ"
              />
            </div>
            <div className="carousel-item">
              <img
                src={image2}
                className="d-block"
                alt="GÖRSEL URL YÜKLEYİNİZ"
              />
            </div>
            <div className="carousel-item">
              <img
                src={image3}
                className="d-block"
                alt="GÖRSEL URL YÜKLEYİNİZ"
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
      <div className="right">
        <div className="inpt-grp">
          <div className="inline-inpt">
            <input
              type="text"
              name="name"
              id="name"
              value={image1}
              onChange={(e) => setImage1(e.target.value)}
              autoFocus={false}
              required={true}
            />
            <span>Url 1</span>
          </div>
          <div className="inline-inpt">
            <input
              type="text"
              name="name"
              id="name"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
              autoFocus={false}
              required={true}
            />
            <span>Url 2</span>
          </div>
          <div className="inline-inpt">
            <input
              type="text"
              name="image3"
              id="image3"
              value={image3}
              onChange={(e) => setImage3(e.target.value)}
              autoFocus={false}
              required={true}
            />
            <span>Url 3</span>
          </div>
        </div>
        <div className="inline-inpt">
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus={false}
            required={true}
            autoComplete="off"
          />
          <span>Ürün Adı</span>
        </div>
        <div className="inline-inpt">
          <input
            type="text"
            name="price"
            id="price"
            required={true}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            autoFocus={false}
            autoComplete="off"
          />
          <span>Ürün Fiyatı</span>
        </div>
        <div className="inline-inpt">
          <select
            name="color"
            id="color"
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="00">Renk Seçiniz</option>
            {colorList.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
        </div>

        <div className="inline-inpt">
          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="00">Kategori Seçiniz</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="inpt-gender">
          <label htmlFor="male">
            <input
              type="radio"
              name="gender"
              id="male"
              value="ERKEK"
              onChange={(e) => {
                setGender(e.target.value);
              }}
              checked={"ERKEK" === gender}
            />
            Erkek
          </label>
          <label htmlFor="female">
            <input
              type="radio"
              name="gender"
              id="female"
              value="KADIN"
              onChange={(e) => {
                setGender(e.target.value);
              }}
              checked={"KADIN" === gender}
            />
            Kadın
          </label>
        </div>

        <div className="inline-inpt">
          <select
            name="typology"
            id="typology"
            onClick={() => typologyHandle()}
            onChange={(e) => setTypology(e.target.value)}
          >
            <option value="00">Tipoloji Seçiniz</option>
            {typologyList.map((typology) => (
              <option key={typology.id} value={typology.id}>
                {typology.name}
              </option>
            ))}
          </select>
        </div>
        <div className="in-checkbox">
          {sizeList.map((size) => (
            <label>
              <input
                type="checkbox"
                name="size"
                id={size.id}
                value={size.id}
                onChange={(e) => {
                  sizes.includes(e.target.value)
                    ? sizes.splice(sizes.indexOf(e.target.id), 1)
                    : sizes.push(Number(e.target.id));
                  console.log(e.target.id);
                  console.log(sizes);
                }}
              />
              {size.name}
            </label>
          ))}
        </div>
        <button type="submit" className="btn-add" onClick={() => handleAdd()}>
          EKLE
        </button>
      </div>
    </div>
  );
}
