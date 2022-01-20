import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { sendRequest } from "../utils/sendRequest";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url("https://images.hepsiburada.net/banners/s/0/433-250/banner_20210924083643.png/format:webp")
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
  flex: 1;
  width: 80%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 15px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [iserror, setiserror] = useState(false);
  

  const navigate = useNavigate();

  const confirmpassword = (e: ChangeEvent<HTMLInputElement>) => {
    setconfirm(e.target.value)
    if (password != confirm){
      setiserror(true)
    }

  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>

        <Input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setemail(e.target.value)} />

        <Input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          placeholder="Confirm password"
          onChange={(e) => confirmpassword(e)}
          style={iserror ? { border: "1px solid red" } : {}}
        />
        {iserror ? (
          <span style={{ color: "red" }}>Confirm password should be match with entered password</span>
        ) : null}
        <Agreement>
          By creating an account, I consent to the processing of my personal
          data in accordance with the <b>PRIVACY POLICY</b>
        </Agreement>
        <Button
          onClick={async () => {
            const response = await sendRequest({
              data: {
                username,
                email,
                password,
              },
              route: "register",
            });
            navigate("/");
          }}
        >
          Create
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Register;
