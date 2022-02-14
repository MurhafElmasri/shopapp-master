import React, { useEffect, useState } from "react";
import { getrequest } from "../utils/getrequest";
import Product, { CartItemType } from "../Components/Product";
import { useNavigate } from "react-router-dom";
import { deleteall } from "../utils/deleteall";
import generateRandomData from "../utils/generateRandomData";
import { sendRequest } from "../utils/sendRequest";

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

  const deleteAllProducts = async () => {
    const response = await deleteall();
  };

  return (
    <div>
      <div className="Addbutton">
        <button
          onClick={async () => {
            const data = await generateRandomData({ itemsLength: 50 });

            await Promise.all(
              data.map(async (product) => {
                await sendRequest({
                  data: product,
                });
              })
            );
            alert("Added Products Successfully :)");
          }}
        >
          Click Me To Load Data
        </button>
        <button onClick={deleteAllProducts}>Delete all products</button>
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
