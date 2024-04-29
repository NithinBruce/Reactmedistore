
import "./App.css";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />    
      <div className="container text-center">
        <br />
        <h1 className="display-4 text-dark"><b>WELCOME TO CUREHUB</b></h1>
        <hr />
        <br /><br /><br />
        <h2>Create An Account</h2>
        <br />
        <Link to="/register" className="btn btn-dark btn-lg ">Register</Link>
        <br /><br /><br /><br /><br />
        <h3>Already Have An Account</h3>
        <Link to="/login" className="btn btn-dark btn-lg">Login</Link>
      </div>
    </>
  );
}

export default App;
