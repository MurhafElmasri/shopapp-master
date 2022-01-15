import { useParams } from "react-router-dom";
import styled from "styled-components";
import Deal from "../components/Deal";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import productsList from "../Data";

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
  const params = useParams() as { productId: string };

  console.log("========>", { params });

  const product = productsList.find((x) => x.id === params.productId);

  if (!product) {
    return <h1>Product Not Found</h1>;
  }else {

    return (
      <Container>
        <Navbar />
        <Deal />
        <Wrapper>
          <ImgContainer>
            <Image src={product.image} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.description}</Desc>
            <Price>{product.price}</Price>
            <AddContainer>
              {/* <Button onClick={() => addtocart(product)}>ADD TO CART</Button> */}
            </AddContainer>
          </InfoContainer>
        </Wrapper>
        <Newsletter />
      </Container>
    );

  }


};

export default Product;