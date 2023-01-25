import "./Woman.css";
import WomanBackground from "../../images/wmn-bg.png" 
export default function Woman() {

 

  return (
    <div className="woman">

      <div className="content">
        <div className="content-text">Bershka Woman</div>
      </div>
      <div className="image-cont1">
        <img
          src={
            WomanBackground
          }
        ></img>
      </div>
      <div className="content">
      <div className="content-text">
      Bershka Woman

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
  )
}
