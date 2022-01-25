import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "react-use-storage";
import styled from "styled-components";
import { CartItemType } from "../App";
import Deal from "../components/Deal";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { sendRequest } from "../utils/sendRequest";

// import { getrequest } from "../utils/getrequest";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 5px;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-size: 50px;
`;

const Desc = styled.p`
  margin-right: 300px;
  font-size: 20px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 60px;
  color: orange;
`;

const AddContainer = styled.div`
  width: 50%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid orange;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

interface props {
  addtocart: (clickedItem: CartItemType) => void;
}

const Product = (props: props) => {
  const [product, setProduct] = useState<CartItemType | undefined>();
  const params = useParams() as { id: string };

  useEffect(() => {
    const getProduct = async () => {
      const response = await sendRequest({
        route: `getProductById/${params.id}`,
        method: "GET",
      });

      setProduct(response.productData);
    };

    getProduct();
  }, [params.id]);

  const { addtocart } = props;
  const navigate = useNavigate();

  // const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [islogin, setislogin] = useLocalStorage("islogin", false);

  if (!product) {
    return null;
  }

  return (
    <Container>
      <Deal />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.description}</Desc>
          <Price>{product.price}</Price>
          <AddContainer>
            {islogin ? (
              <Button onClick={() => addtocart(product)}>ADD TO CART</Button>
            ) : (
              <Button onClick={() => navigate("/Login")}>ADD TO CART</Button>
            )}
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
    </Container>
  );
};

export default Product;
