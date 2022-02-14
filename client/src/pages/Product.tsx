import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "react-use-storage";
import styled from "styled-components";
import { CartItemType } from "../App";
import Deal from "../components/Deal";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { getbyid } from "../utils/getbyid";
import { putrequest } from "../utils/putrequest";
import { sendRequest } from "../utils/sendRequest";

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
  max-width: 60%
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
type ProductType = {
  userID: string;
  productID: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
  category: string;
};
const Product = () => {
  const [product, setProduct] = useState<ProductType | undefined>();
  const params = useParams() as { id: string };
  // const [user, setuser] = useLocalStorage("userid", "");
  const [userID, setuserID] = useLocalStorage("userID", "");

  const addtocart = async (product: ProductType) => {
    const response = await getbyid({
      route: `getcartitemById/${params.id}`,
    });
    console.log(response.status);
    if (response.status === "error") {
      const response2 = await sendRequest({
        data: {
          userID: userID,
          productID: params.id,
        },
        route: "AddCartitem",
        method: "POST",
      });

    }
    if (response.status === "success") {
      if (response.productData.userID === userID) { //------------------------------------------------
        const response2 = await putrequest({
          data: {
            amount: product.amount + 1,
            id: response.productData.productID,
          },
        });
      } else {
        const response2 = await sendRequest({
          data: {
            userID: userID,
            productID: params.id,
          },
          route: "AddCartitem",
          method: "POST",
        });
      }
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      const response = await getbyid({
        route: `getProductById/${params.id}`,
      });
      setProduct(response.productData);
    };

    getProduct();
  }, [params.id]);

  const navigate = useNavigate();

  const [islogin, setislogin] = useLocalStorage("islogin", false);

  if (!product) {
    return (
      <p>Product Not Found</p>
    )
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
