import React, { useState } from "react";
import { Route, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleterequest } from "../utils/deleterequest";
import { putrequest } from "../utils/putrequest";
const localhost = process.env.REACT_APP_LOCALHOST_KEY;

const Editproduct = () => {
  const params = useParams() as { id: string };

  //   const product = products.find((x) => x.id === params.productid);
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
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
  // type Args = { id: string };
  // async function deleterequest(props: Args) {
  //   const { id } = props;

  //   // console.log({ loc: process.env.LOCALHOST });

  //   const res = await fetch(`${localhost}:3000/Home/:${params.id}`, {
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "DELETE",
  //   })
  //     // .then((res) => res.json())
  //     // .then((id) => console.log(id))
  //     // .catch((err: any) => {
  //     //   console.log(err);
  //     // });

  //   // console.log(data)
  //     const responseToJson = res.json();

  //     return responseToJson;
  // }

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
          <Link to={`/`}>
            <button
              onClick={async () => {
                const response = await putrequest({
                  data: {
                    title,
                    image,
                    description,
                    price,
                  },
                  id: params.id,
                });
                navigate("/");
              }}
            >
              Edit Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Editproduct;
