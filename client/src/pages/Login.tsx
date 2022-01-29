import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use-storage";
import styled from "styled-components";
import { sendRequest } from "../utils/sendRequest";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url("https://static.standard.co.uk/s3fs-public/thumbnails/image/2017/03/29/17/scotch-and-soda-header.jpg?width=968")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  align-items: center;
  width: 20%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Input = styled.input`
  width: 80%;
  flex: 1;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  text-decoration: none;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [islogin, setislogin] = useLocalStorage("islogin", false);
  const [userid, setuserid] = useLocalStorage("userid", "");

  const [userIsWrong, setUserIsWrong] = useState(false);
  const [passIsWrong, setpassIsWrong] = useState(false);

  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          style={userIsWrong ? { border: "1px solid red" } : {}}
        />
        {userIsWrong ? (
          <span style={{ color: "red" }}>The Entered Username is Wrong</span>
        ) : null}
        <Input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          style={passIsWrong ? { border: "1px solid red" } : {}}
        />
        {passIsWrong ? (
          <span style={{ color: "red" }}>The Entered Password is Wrong</span>
        ) : null}

        <Button
          onClick={async () => {
            const response = await sendRequest({
              route: "Login",
              data: { username, password },
            });
            setUserIsWrong(false);
            setpassIsWrong(false);

            if (response.status === "loginSuccess") {
              setislogin(true);
              setuserid(response.username);
              console.log(userid);
              navigate("/");
            }

            if (response.status === "userNotFound") {
              setUserIsWrong(true);
            }

            if (response.status === "wrongPassword") {
              setpassIsWrong(true);
            }
          }}
        >
          LOGIN
        </Button>
        <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
        <Link>CREATE A NEW ACCOUNT</Link>
      </Wrapper>
    </Container>
  );
};

export default Login;
