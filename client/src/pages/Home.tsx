import React, { useEffect, useState } from "react";
import { CartItemType } from "../App";
import Deal from "../components/Deal";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Product from "../components/Product";
import { sendRequest } from "../utils/sendRequest";

const Home = () => {
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

  console.log({ search });

  const filteredProductsList =
    search.trim() === "" || !products
      ? products
      : products.filter((x) =>
          x.title.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      <Deal />
      <Navbar searchValues={search} setSearchValue={setSearch} />
      <div className="products">
        {filteredProductsList.map((product: CartItemType) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
      <Newsletter />
    </div>
  );
};

export default Home;
