import React, { useEffect, useState } from "react";
import { CartItemType } from "../App";
import Deal from "../components/Deal";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Product from "../components/Product";
import { sendRequest } from "../utils/sendRequest";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../components/styles.css";

const Sports = () => {
  const [products, setProducts] = useState<CartItemType[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const response = await sendRequest({
        route: "getProductsList",
        method: "GET",
      });

      setProducts(response);
    };

    loadProducts();

    // (async() => {})();
  }, []);



  const Sportslist = products.filter((x) =>
    x.category === "Sports"
  );

//   const filteredProductsList =
//     search.trim() === "" || !products
//       ? products
//       : products.filter((x) =>
//           x.title.toLowerCase().includes(search.toLowerCase())
//         );

  return (
    <div>
      <Deal />
      <Navbar searchValues={search} setSearchValue={setSearch} />
      <div className="products">
        {Sportslist.map((product: CartItemType) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
      <Newsletter />
    </div>
  );
};

export default Sports;
