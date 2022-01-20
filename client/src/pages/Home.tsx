import React, { useState } from "react";
import { CartItemType } from "../App";
import Deal from "../components/Deal";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Product from "../components/Product";
import { getrequest } from "../utils/getrequest";



const Home = () => {
  const [products, setproducts] = useState([]);
  return (
    <div>
      <Deal />
      <Navbar />
      <button
        onClick={async () => {
          const response = await getrequest();
          setproducts(response);
        }}
      >
        show products
      </button>
      <div className="products">
        {products.map((product: CartItemType) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
      <Newsletter />
    </div>
  );
};

export default Home;
