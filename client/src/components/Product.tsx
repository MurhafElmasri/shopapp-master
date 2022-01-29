import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartItemType } from "../App";
import "./styles.css";

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

interface props {
  product: CartItemType;
}

const Product = (props: props) => {
  const { product } = props;

  return (
    <Container>
      <Link to={`/Product/${product._id}`}>
        <div className="imgcon">
          <img className="image" alt="" src={product.image} />
        </div>
        <Info>{product.title}</Info>
      </Link>
    </Container>
  );
};

export default Product;
