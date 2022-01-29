import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./components/styles.css";
import Cart from "./pages/Cart";
import Elecetronics from "./pages/Elecetronics";
import Fashion from "./pages/Fashion";
import Home from "./pages/Home";
import HomeImprovement from "./pages/HomeImprovement";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Sports from "./pages/Sports";

export type CartItemType = {
  _id: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
  category: string;
};

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Product/:id" element={<Product />}></Route>
            <Route
              path="/Categories/Elecetronics"
              element={<Elecetronics />}
            ></Route>
            <Route path="/Categories/Fashion" element={<Fashion />}></Route>
            <Route path="/Categories/Sports" element={<Sports />}></Route>
            <Route
              path="/Categories/HomeImprovement"
              element={<HomeImprovement />}
            ></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route path="/Cart" element={<Cart />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
