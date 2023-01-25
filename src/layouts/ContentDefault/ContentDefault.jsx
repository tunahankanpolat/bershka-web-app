import React, { useEffect, useState } from "react";
export default function ContentDefault() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setHide(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
      <div className={`${hide ? "hide content-default" : "content-default"}`}>
        <ul className="content-ul">
          <li className="content-list-item">YENİ</li>
          <li className="content-list-item">
            %30'A VARAN İNDİRİM <span>NEW</span>
          </li>{" "}
          <br />
          <li className="content-list-item">GİYİM</li>
          <li className="content-list-item">AYAKKABI</li>
          <li className="content-list-item">AKSESUAR</li>
          <li className="content-list-item">COLLABORATIONS</li>
          <br />
          <li className="content-list-item">BASIC</li>
          <br />
          <li className="content-list-item">#bershkastyle Gallery</li>
          <li className="content-list-item">Bershka Creators</li>
        </ul>
      </div>
  );
}
