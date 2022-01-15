import React from "react";
import Deal from "../components/Deal";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { productsList } from "../Data";
import { sendRequest } from "../utils/sendRequest";

const Home = () => {
  return (
    <div>
      <Deal />
      <Navbar />

      {productsList.map((productItem) => {
        return;
      })}
      <Products />

      <Newsletter />
    </div>
  );
};

export default Home;
