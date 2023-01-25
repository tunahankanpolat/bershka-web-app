import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TypologyService from "../../services/TypologyService";
import { useStateContext } from "../Context/StateContext";

export default function ContentDefault(params) {
  const [typologies, setTypologies] = useState([]);
  const { setshowContentSlider } = useStateContext();
  function setBgColor(params) {
    document.getElementById("navbar").style.backgroundColor = "black";
  }
  useEffect(() => {
    let typologyService = new TypologyService();

    typologyService
      .getByCategoryIdAndGender(params.id, params.gender)
      .then((result) => setTypologies(result.data.data));
  }, []);

  return (
    <div style={{ marginLeft: "-2rem", marginTop: "-1rem" }}>
      <ul className="content-ul">
        <Link className="list-link">
          {" "}
          <li className="content-list-item invalid">Çok Satanlar</li>
        </Link>
        <Link className="list-link">
          {" "}
          <li className="content-list-item invalid">Basic</li>{" "}
        </Link>
        <Link className="list-link">
          {" "}
          <li className="content-list-item invalid">
            Party <span>NEW</span>
          </li>
        </Link>
        <Link className="list-link">
          <li className="content-list-item invalid  ">
            Özel Fiyatlar <span>NEW</span>
          </li>
        </Link>
        {typologies.map((item) => (
          <Link
            to={`${item.name}/${item.gender}`}
            className="list-link"
            key={item.id}
            onClick={() => {
              setshowContentSlider(false);
              setBgColor();
            }}
          >
            <li className="content-list-item">{item.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
