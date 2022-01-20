import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Addproduct from "./Pages/Addproduct";
import "./Pages/Addproduct.css";
import Home from "./Pages/Home";
import Editproduct from "./Pages/Editproduct";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Editproduct/:id" element={<Editproduct />}></Route>
            <Route path="/Addproduct" element={<Addproduct />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
