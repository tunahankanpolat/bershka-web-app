import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { StateContext } from "./layouts/Context/StateContext";
import Dashboard from "./pages/home/Dashboard";
import Navbar from "./layouts/Navbar/Navbar";
function App() {
  return (
    <div className="App">
      <StateContext>
        {/* <Home/> */}
        <Navbar />
        <Dashboard />
        
      </StateContext>
    </div>
  );
}

export default App;
