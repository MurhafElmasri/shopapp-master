import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
      <div className="Addbutton">
        <Link to="/Addproduct"> <button> Add Product </button> </Link>
      </div>
  );
};

export default Home;
