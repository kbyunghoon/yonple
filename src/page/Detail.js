import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Logo from "../media/logo.png";

const Detail = (props) => {
  const { history } = props;
  const [data, setData] = useState();

  useEffect(() => {
    const type = props.match.params.type;
    const id = props.match.params.id;
    const get_post = {
      url: `https://recruit-api.yonple.com/recruit/869201/${type}-posts/${id}`,
      method: "GET",
    };
    axios(get_post)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.match.params.id, props.match.params.type]);

  return (
    <Container>
      <LogoImg>
        <img src={Logo} alt="logo" />
      </LogoImg>
      {data ? (
        <Wrap>
          <TextWrap>
            <Title>{data.title}</Title>
            <Desc>{data.content}</Desc>
          </TextWrap>
        </Wrap>
      ) : (
        <></>
      )}
      <Bottom>
        <Button onClick={() => history.goBack()}>뒤로 가기</Button>
      </Bottom>
    </Container>
  );
};

const TextWrap = styled.div`
  margin: 20px 20px;
  display: flex;
  flex-direction: column;
`;

const LogoImg = styled.div`
  user-select: none;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const Wrap = styled.div`
  margin: 0 auto;
  border: 1px solid #000000;
`;

const Title = styled.div`
  display: flex;
  font-size: 25px;
  margin: 0 auto;
  line-break: loose;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
  line-height: 2rem;
`;

const Desc = styled.div`
  margin: 0 auto;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  margin-top: 10px;
  cursor: pointer;
  font-family: "paybooc-Bold";
  font-size: 18px;
  color: #ffffff;
  background-color: #2baae1;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2baae1;
  border-radius: 5px;
  width: 8rem;
  height: 3rem;
`;

export default Detail;
