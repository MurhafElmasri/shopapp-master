import styled from "styled-components";
import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { deleterequest } from "../utils/deleterequest";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

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

  const { product } = props;

  const Container = styled.div``;

  const Wrapper = styled.div`
    padding: 20px;
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const verify = async () => {
    const deleteproduct = await deleterequest({
      id: product._id,
    });
  };

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

                    <div>
                      <Button variant="outlined" onClick={handleClickOpen}>
                        Delete
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Are you sure ?"}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Link to={"/"}>
                            <Button
                              onClick={() => {
                                verify();
                                handleClose();
                              }}
                            >
                              Delete
                            </Button>
                          </Link>
                        </DialogActions>
                      </Dialog>
                    </div>
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
