import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { SetStateAction } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "react-use-storage";
import styled from "styled-components";
import "./styles.css";

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

interface Props {
  setSearchValue?: React.Dispatch<SetStateAction<string>>;
  searchValues?: string;
}

const Navbar = (props: Props) => {
  const [islogin, setislogin] = useLocalStorage("islogin", false);
  const [userid, setuserid] = useLocalStorage("userid", "");
  const { searchValues, setSearchValue } = props;

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo
              src="/img/shop_logo_big.png"
              style={{ width: 100, height: 65 }}
            />
          </Link>
        </Left>
        <Center>
          <SearchContainer>
            <Input
              placeholder="Search"
              value={searchValues ?? ""}
              onChange={(e) => {
                if (setSearchValue) {
                  setSearchValue(e.target.value);
                }
              }}
            />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Center>
        <Right>
          <div className="Wrapper">
            <ul className="list">
              {islogin ? (
                <>
                  <li className="Menuitem">{userid}</li>
                  <li
                    className="Menuitem"
                    onClick={() => {
                      setislogin(false);
                    }}
                  >
                    LOGOUT
                  </li>
                </>
              ) : (
                <>
                  <li className="Menuitem">
                    <Link to="/Register">REGISTER</Link>
                  </li>
                  <li className="Menuitem">
                    <Link to="/Login">SIGN IN</Link>
                  </li>
                </>
              )}

              <li className="Menuitem">
                <Link to="/Cart">
                  <ShoppingCartOutlined />
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
