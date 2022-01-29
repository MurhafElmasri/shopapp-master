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

const Product = () => {
  const [product, setProduct] = useState<CartItemType | undefined>();
  const params = useParams() as { id: string };
  const [userid, setuserid] = useLocalStorage("userid", "");
  const [newamount, setnewamount] = useState(1);

  const addtocart = async (product: CartItemType) => {
    const response = await getbyid({
      id: product._id,
    });
    console.log(response.status);
    if (response.status === "error") {
      const response2 = await sendRequest({
        data: {
          username: userid,
          _id: product._id,
          title: product.title,
          image: product.image,
          description: product.description,
          price: product.price,
          amount: 1,
          category: product.category,
        },
        route: "AddCartitem",
        method: "POST",
      });
    }
    if (response.status === "success") {
      if (response.isitemincart.username === userid) {
        const response2 = await putrequest({
          data: {
            amount: response.isitemincart.amount + 1,
            id: response.isitemincart._id,
          },
        });
      } else {
        const response2 = await sendRequest({
          data: {
            username: userid,
            _id: product._id,
            title: product.title,
            image: product.image,
            description: product.description,
            price: product.price,
            amount: 1,
            category: product.category,
          },
          route: "AddCartitem",
          method: "POST",
        });
      }
    }
  };

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

  const navigate = useNavigate();

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
