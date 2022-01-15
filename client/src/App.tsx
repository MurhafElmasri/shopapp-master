import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./components/styles.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";

export type CartItemType = {
  id: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
  quantity: number;
};

function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Product/:productId" element={<Product />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            {/* <Route path="/Cart" element={<Cart product={product} />}></Route> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
