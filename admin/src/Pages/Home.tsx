import React, { useState } from "react";
import { getrequest } from "../utils/getrequest";
import Product, { CartItemType } from "../Components/Product";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);

  return (
    <div>
      <div className="products">
        {products.map((product: CartItemType) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
      <div className="Addbutton">
        <button
          onClick={async () => {
            const response = await getrequest();
            setproducts(response);
          }}
        >
          show products
        </button>
        <button
          onClick={() => {
            navigate("/Addproduct");
          }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default Home;
