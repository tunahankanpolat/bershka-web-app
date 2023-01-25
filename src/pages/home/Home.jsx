import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Home() {



  return (
    <div className="homePage">
      <Link to="/">
      <h3 className="header ">Bershka</h3>
      </Link>
      <div className="col-12 d-flex">
        <div className="col-6 left text-white">
          <Link to="/woman" className="link">
            <h5>... MODASINA GİT</h5>
            <h2>KADIN</h2>
          </Link>
        </div>
        <div className="col-6 right text-white">
          <Link to="/man" className="link" >
            <h5>... MODASINA GİT</h5>
            <h2>ERKEK</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
