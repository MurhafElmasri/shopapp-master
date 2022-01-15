
import Product from "./Product";
import "./styles.css";
import productsList from "../Data";



const Products = () => {

  return (
    <div className="products">
      {productsList.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Products;
