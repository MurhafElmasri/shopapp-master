import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import './styles.css'

const Container = styled.div`
  height: 70px;
`;

const Wrapper = styled.div`
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.img``;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo
            src="/img/shop_logo_big.png"
            style={{ width: 100, height: 65 }}
          />
        </Left>
        <Center>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Center>
        <Right>
          <div className="Wrapper">
            <ul className="list">
              <li className="Menuitem">
                <Link to="/Register">
                  REGISTER
                </Link>
              </li>
              <li className="Menuitem">
                <Link to="/Login">
                  SIGN IN
                </Link>
              </li>
              <li className="Menuitem">
                <Link to="/Cart">
                  
                    <Badge badgeContent={4} color="primary">
                      <ShoppingCartOutlined />
                    </Badge>
                  
                </Link>
              </li>
            </ul>
          </div>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
