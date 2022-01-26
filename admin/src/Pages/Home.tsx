import React, { useEffect, useState } from "react";
import { getrequest } from "../utils/getrequest";
import Product, { CartItemType } from "../Components/Product";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getrequest();
      setproducts(response);
    };
    loadProducts();

    // (async() => {})();
  }, []);

  return (
    <div>
      <div className="Addbutton">
        <button
          onClick={() => {
            navigate("/Addproduct");
          }}
        >
          Add Product
        </button>
      </div>
      <div className="products">
        {products.map((product: CartItemType) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
