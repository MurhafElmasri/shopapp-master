// import { Info } from "@material-ui/icons";
import styled from "styled-components";
import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { deleterequest } from "../utils/deleterequest";
import { useNavigate } from "react-router-dom";

export type CartItemType = {
  _id: string;
  description: string;
  image: string;
  price: number;
  title: string;
};

interface props {
  product: CartItemType;
}

const Product = (props: props) => {
  const navigate = useNavigate();
  const { product } = props;

  const Container = styled.div``;

  const Wrapper = styled.div`
    padding: 20px;
  `;

  const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  `;

  const Bottom = styled.div`
    display: flex;
  `;

  const Info = styled.div`
    flex: 3;
  `;

  const Product = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const ProductDetail = styled.div`
    flex: 2;
    display: flex;
  `;

  const Image = styled.img`
    width: 200px;
  `;

  const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  `;

  const ProductName = styled.span``;

  const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
  `;

  const id = product._id;
  return (
    <div>
      <Container>
        <Wrapper>
          <Info>
            <Product>
              <ProductDetail>
                <Image src={product.image} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductPrice>
                  <div className="editdata">
                    <Link to={`/Editproduct/${product._id}`}>
                      <button>edit</button>
                    </Link>
                    <button
                      onClick={async () => {
                        const deleteproduct = await deleterequest({
                          id: product._id,
                        });
                      }}
                    >
                      remove
                    </button>
                  </div>
                </ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Product;
