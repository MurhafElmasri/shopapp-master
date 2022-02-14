import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use-storage";
import styled from "styled-components";
import { CartItemType } from "../App";
import Announcement from "../components/Deal";
import Navbar from "../components/Navbar";
import { deleterequest } from "../utils/deleterequest";
import { getbyid } from "../utils/getbyid";
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

type ProductType = {
  _id: string;
  userID: string;
  productID: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
  category: string;
};
type CartType = {
  userID: string;
  productID: string;
  amount: number;
};

const Cart = () => {
  const navigate = useNavigate();
  const [cartitemIDs, setcartitemIDs] = useState([]);
  const [cartitems, setcartitems] = useState([] as ProductType[]);
  const [amount, setamount] = useState()
  const [userID, setuserID] = useLocalStorage("userID", "");








  const addtocart = async (cartItem: ProductType) => {
    console.log(cartItem)
    const response = await getbyid({
      route: `getcartitemById/${cartItem._id}`,
    });

    if (response.productData.userID === userID) {
      console.log("hello")
      const response2 = await putrequest({
        data: {
          amount: response.productData.amount + 1,
          productID: response.productData.productID,
          userID: userID
        },
      })
      console.log(response2.amount)
      setamount(response2.amount)

    }

  };




  const removefromcart = async (cartItem: ProductType) => {
    const response = await getbyid({
      route: `getcartitemById/${cartItem._id}`,
    });
    if (response.productData.userID === userID) {
      if (response.productData.amount === 1) {
        const response2 = await deleterequest({
          id: response.productData.productID,
          userID: userID,
        });
      } else {
        const response2 = await putrequest({
          data: {
            amount: response.productData.amount - 1,
            productID: response.productData.productID,
            userID: userID
          },
        });
      }
    }

  };


  useEffect(() => {
    const loadProducts = async () => {
      const response = await sendRequest({
        route: `getCartitemIDs/${userID}`,
        method: "GET",
      });
      console.log(response);
      setcartitemIDs(response);
      // console.log(cartitemIDs)
    };
    loadProducts();
  }, []);



  useEffect(() => {
    const mapLoop = async () => {
      console.log('Start')
    
      const cart = cartitemIDs.map(async (cartitem: CartType) => {
        const response = await sendRequest({
          route: `getCartitems/${cartitem.productID}`,
          method: "GET",
        });
        // console.log(response.cartitemdata);
        // console.log(cartitemIDs)
  
  
        return response.cartitemdata
      });
  
      const carts =  await Promise.all(cart)
      setcartitems(carts)
  
      console.log(carts)
      console.log('End')
    }
    mapLoop()

  }, [cartitemIDs]);

  const calculateTotal = (items: ProductType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton onClick={() => console.log(cartitemIDs)}>
            SHOPPING
          </TopButton>
          <TopButton onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
        </Top>
        <Bottom>
          <Products>
            {cartitems.map((cartItem) => (
              <Info>
                <Product>
                  <ProductDetail>
                    <Image src={cartItem.image} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {cartItem.title}
                      </ProductName>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add onClick={() => addtocart(cartItem)} />
                      <ProductAmount>{cartItem.amount}</ProductAmount>
                      <Remove onClick={() => removefromcart(cartItem)} />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {cartItem.price * cartItem.amount}
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
