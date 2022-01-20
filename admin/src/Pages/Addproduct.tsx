import React, { useState } from "react";
import "./Addproduct.css";
import { sendRequest } from "../utils/sendRequest";
import { getrequest } from "../utils/getrequest";
import { useNavigate } from "react-router-dom";

const Addproduct = () => {
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [amount, setamount] = useState("1");
  // const [products, setproducts] = useState("No products found");



  function submit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const ProductData = {
      title: title,
      image: image,
      description: description,
      price: price,
    };
  }
  const navigate = useNavigate();

  return (
    <div className="productinfo">
      <div className="form">
        <div className="control">
          <label htmlFor="title">Product Title</label>
          <input
            type="text"
            required
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="image">Product Image</label>
          <input
            type="url"
            required
            onChange={(e) => setimage(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            onChange={(e) => setdescription(e.target.value)}
          ></textarea>
        </div>
        <div className="control">
          <label htmlFor="number">Price</label>
          <input
            type="text"
            required
            onChange={(e) => setprice(e.target.value)}
          />
        </div>
        <div className="actions">
          <button
            onClick={async () => {
              const response = await sendRequest({
                data: {
                  title,
                  image,
                  description,
                  price,
                  amount,
                }
              });
              // console.log(response);
              // const response2 = await getrequest();
              // setproducts(response2);
              // console.log(products)
              navigate("/");
            }}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
