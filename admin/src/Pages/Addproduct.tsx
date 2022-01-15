import React, { useRef, useState } from "react";
import "./Addproduct.css";
import { sendRequest } from "../utils/sendRequest";

const Addproduct = () => {
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");

  function submit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const ProductData = {
      title: title,
      image: image,
      description: description,
      price: price,
    };

    console.log(ProductData);
  }

  return (
    <div className="productinfo">
      <form className="form" onSubmit={submit}>
        <div className="control">
          <label htmlFor="title">Product Title</label>
          <input
            type="text"
            required
            id="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="image">Product Image</label>
          <input
            type="url"
            required
            id="image"
            value={image}
            onChange={(e) => setimage(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          ></textarea>
        </div>
        <div className="control">
          <label htmlFor="number">Price</label>
          <input
            type="text"
            required
            id="price"
            value={price}
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
                },
                route: "Addproduct",
              });
            }}
          >
            Add Meetup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addproduct;
