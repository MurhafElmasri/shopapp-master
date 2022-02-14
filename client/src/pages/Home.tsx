import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartItemType } from "../App";
import Deal from "../components/Deal";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import "../components/styles.css";
import { sendRequest } from "../utils/sendRequest";

const Home = () => {
  const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: end;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
    text-size: 30px;
    margin-bottom: 20px;
  `;

  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 300px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info} {
      opacity: 1;
    }
  `;
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

        <Container>
          <Link to={`/Categories/Electronics`}>
            <div className="imgcon">
              <img
                className="image"
                alt=""
                src="/img/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg"
              />
            </div>
            <Info> Electronics </Info>
          </Link>
        </Container>
        <Container>
          <Link to={`/Categories/Fashion`}>
            <div className="imgcon">
              <img
                className="image"
                alt=""
                src="/img/تعليق توضيحي 2022-01-26 134145.png"
              />
            </div>
            <Info> Fashion </Info>
          </Link>
        </Container>
        <Container>
          <Link to={`/Categories/Sports`}>
            <div className="imgcon">
              <img className="image" alt="" src="/img/1440_201903062023.jpg" />
            </div>
            <Info> Sports </Info>
          </Link>
        </Container>
        <Container>
          <Link to={`/Categories/HomeImprovement`}>
            <div className="imgcon">
              <img className="image" alt="" src="/img/MLA4049.png" />
            </div>
            <Info> Home improvement </Info>
          </Link>
        </Container>
      </div>
      <Newsletter />
    </div>
  );
};

export default Home;
