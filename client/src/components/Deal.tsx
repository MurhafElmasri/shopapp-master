import styled from "styled-components";

const Container = styled.div`
  height: 40px;
  background-image: url(/img/orange.jpg);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Deal = () => {
  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
};

export default Deal;
