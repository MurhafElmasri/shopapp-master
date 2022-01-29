import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use-storage";
import styled from "styled-components";
import { CartItemType } from "../App";
import Announcement from "../components/Deal";
import Navbar from "../components/Navbar";
import { deleterequest } from "../utils/deleterequest";
import { putrequest } from "../utils/putrequest";
import { sendRequest } from "../utils/sendRequest";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
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
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Products = styled.div`
  // display: flex;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Summary = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  justify-content: flex-end;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const navigate = useNavigate();
  const [cartitems, setcartitems] = useState([] as CartItemType[]);
  const [userid, setuserid] = useLocalStorage("userid", "");

  const addtocart = async (cartitem: CartItemType) => {
    const response2 = await putrequest({
      data: {
        amount: cartitem.amount + 1,
        id: cartitem._id,
      },
    });
  };

  const removefromcart = async (cartitem: CartItemType) => {
    if (cartitem.amount === 1) {
      const response2 = await deleterequest({
        id: cartitem._id,
      });
    } else {
      const response2 = await putrequest({
        data: {
          amount: cartitem.amount - 1,
          id: cartitem._id,
        },
      });
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      const response = await sendRequest({
        route: "getCartitems",
        method: "GET",
      });
      setcartitems(response);
    };

    loadProducts();

    // (async() => {})();
  }, []);

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
        </Top>
        <Bottom>
          <Products>
            {cartitems.map((cartitem) => (
              <Info>
                <Product>
                  <ProductDetail>
                    <Image src={cartitem.image} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {cartitem.title}
                      </ProductName>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add onClick={() => addtocart(cartitem)} />
                      <ProductAmount>{cartitem.amount}</ProductAmount>
                      <Remove onClick={() => removefromcart(cartitem)} />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {cartitem.price * cartitem.amount}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              </Info>
            ))}
          </Products>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>
                $ {calculateTotal(cartitems)}{" "}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                $ {calculateTotal(cartitems)}{" "}
              </SummaryItemPrice>
            </SummaryItem>
            <Button onClick={() => alert("Implement Checkout!")}>
              CHECKOUT NOW
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
