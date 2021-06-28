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

  return (
    <>
      <Wrap>
        <Top>
          <Title>
            <img src={Logo} alt="logo"/>
          </Title>
          <SearchContainer>
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

const Search = styled.input`
  border: none;
  outline: none;
  width: auto;
  margin-left: 5px;
`;

const SearchWrapper = styled.div`
  width: 20rem;
  border: 1px solid rgb(43, 97, 225, 0.6);
  border-radius: 5px;
  outline: none;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  & svg {
    width: auto;
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
  margin-right: 10px;
  justify-content: center;
  & img {
    /* width: 1rem; */
  }
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
