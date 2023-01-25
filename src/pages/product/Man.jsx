import React from "react";
import "./Man.css";
export default function man() {
  return (
    <div className="man">

      <div className="content">
        <div className="content-text">Bershka Man</div>
      </div>
      <div className="image-cont1">
        <img
          src={
            "https://static.bershka.net/4/static/images/home/2022/1221/D_slide_man_novedades_-1.jpg?20230102025009"
          }
        ></img>
      </div>
      <div className="content">
      <div className="content-text">
      Bershka Man

      </div>
    </div>
    <div
        id="videoCarousel"
        className="carousel"
        data-ride="carousel"
        style={{ height: "100vh" }}
      >
        <div className="carousel-inner " style={{ height: "100vh" }}>
          <div className="carousel-item active" style={{ height: "100vh" }}>
            <video
              style={{ height: "100vh" }}
              className="d-block"
              loop
              muted
              autoPlay
              src="https://static.bershka.net/4/static/images/home/2022/slidesHTML/going-out-1201/assets/D_slide_woman_mfd_-1.mp4?20221209021209"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
