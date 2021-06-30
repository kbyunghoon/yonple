import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../media/search_icon.svg";
import List from "../components/List";
import Logo from "../media/logo.png";

const Main = (props) => {
  const { history } = props;
  const [keyvalue, setKeyvalue] = useState("");
  const [keyword, setKeyword] = useState("");
  const search = useRef();

  useEffect(() => {
    const timer1 = setTimeout(() => setKeyword(keyvalue), 150);
    return () => clearTimeout(timer1);
  }, [keyvalue]);

  const top = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Wrap>
        <FloatingBox>
          <FloatingGoTop onClick={top}>
            <svg
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 492.004 492.004"
            >
              <path
                d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
			c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
			c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
			c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
              />
            </svg>
          </FloatingGoTop>
        </FloatingBox>
        <Top>
          <Title>
            <img src={Logo} alt="logo" />
          </Title>
          <SearchContainer
            onClick={() => {
              search.current.focus();
            }}
          >
            <SearchWrapper>
              <SearchIcon
                onClick={() => {
                  search.current.focus();
                }}
              />
              <Search
                ref={search}
                type="text"
                placeholder="검색어를 입력하세요."
                onChange={(e) => setKeyvalue(e.target.value)}
              />
            </SearchWrapper>
          </SearchContainer>
        </Top>
        <List keyword={keyword} history={history} />
      </Wrap>
    </>
  );
};

const FloatingBox = styled.div`
  position: fixed;
  bottom: 56px;
  right: 5%;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const FloatingGoTop = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  cursor: pointer;
  z-index: 50;
  background-color: #0090b2;
  border-radius: 25px;
  transform: rotate(-90deg);
  transform-origin: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    width: 30%;
    height: 30%;
    fill: #ffffff;
  }
`;

const Search = styled.input`
  border: none;
  outline: none;
  width: 100%;
  margin-left: 5px;
`;

const SearchWrapper = styled.div`
  width: 20rem;
  border: 2px solid rgb(0, 0, 0, 0.6);
  border-radius: 5px;
  outline: none;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  & svg {
    width: auto;
  }
  :focus-within {
    border: 2px solid rgb(43, 97, 225, 0.6);
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
  user-select: none;
`;

const Title = styled.div`
  display: flex;
  width: auto;
  width: 100%;
  justify-content: center;
  user-select: none;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 10px;
`;

export default Main;
