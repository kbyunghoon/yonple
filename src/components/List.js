import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";
import { InfinityScroll } from "../components/InfinityScroll";
import {
  GET_POST,
  SHIFT_POST,
  KEYWORD,
  DIFFICULT,
  DETAIL,
} from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

const List = (props) => {
  const { history, keyword } = props;
  const [pages, setPages] = useState(0);
  const difficult = useSelector((state) => state.post.difficult);
  const info = useSelector((state) => state.post.post_list);
  const [is_last, setisLast] = useState(true);
  const [target, setTarget] = useState(null);
  const detail = useSelector((state) => state.post.detail);

  const dispatch = useDispatch();

  useEffect(() => {
    if (detail) {
      dispatch(DETAIL(false));
      return;
    }
    setPages(0);
    setisLast(false);
    const get_DB = {
      url: `https://recruit-api.yonple.com/recruit/869201/${difficult}-posts?page=0&search=${keyword}`,
      method: "GET",
    };
    axios(get_DB)
      .then((res) => {
        const data = {
          data: res.data,
        };
        dispatch(GET_POST(data));
        setPages((prevState) => prevState + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [difficult, keyword]);

  InfinityScroll({
    target,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting) {
        if (is_last) {
          return;
        }
        const get_DB = {
          url: `https://recruit-api.yonple.com/recruit/869201/${difficult}-posts?page=${pages}&search=${keyword}`,
          method: "GET",
        };
        axios(get_DB)
          .then((res) => {
            if (res.data.length === 0) {
              setisLast(true);
              return;
            }
            const data = {
              data: res.data,
            };
            dispatch(SHIFT_POST(data));
            setPages((prevState) => prevState + 1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });

  const clickA = () => {
    if (difficult === "a") {
      return;
    } else {
      dispatch(DIFFICULT("a"));
    }
  };

  const clickB = () => {
    if (difficult === "b") {
      return;
    } else {
      dispatch(DIFFICULT("b"));
    }
  };

  return (
    <>
      <TabWrap>
        <TabA onClick={clickA} active={difficult}>
          A Post
        </TabA>
        <TabB onClick={clickB} active={difficult}>
          B Post
        </TabB>
      </TabWrap>
      <>
        {info &&
          info.map((p, idx) => {
            if (idx + 1 === info.length) {
              return (
                <Fragment key={idx}>
                  <Wrap
                    onClick={() => history.push(`/${p.type}/${p.id}`)}
                    ref={setTarget}
                  >
                    <PostTitle>
                      {p.id}.{p.title}
                    </PostTitle>
                    <PostDesc>{p.content}</PostDesc>
                  </Wrap>
                </Fragment>
              );
            } else {
              return (
                <Fragment key={idx}>
                  <Wrap onClick={() => history.push(`/${p.type}/${p.id}`)}>
                    <PostTitle>
                      {p.id}.{p.title}
                    </PostTitle>
                    <PostDesc>{p.content}</PostDesc>
                  </Wrap>
                </Fragment>
              );
            }
          })}
      </>
    </>
  );
};

const TabWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1.2rem;
  width: 10rem;
  height: 30px;
  justify-content: space-between;
  background: #f4f4f4 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
`;

const TabA = styled.div`
  font-family: "paybooc-Light";
  border-right: 1px solid #b7b7b7;
  display: flex;
  width: 5rem;
  font-weight: ${(props) => (props.active === "a" ? "600" : "")};
  color: ${(props) => (props.active === "a" ? "blue" : "")};
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;

const TabB = styled.div`
  font-family: "paybooc-Light";
  display: flex;
  width: 5rem;
  font-weight: ${(props) => (props.active === "b" ? "600" : "")};
  color: ${(props) => (props.active === "b" ? "blue" : "")};
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  width: 100%;
  border: 1px solid #8ba1f0;
  border-radius: 5px;
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  :hover {
    transform: scale(1.03);
  }
`;

const PostTitle = styled.div`
  font-weight: 600;
`;

const PostDesc = styled.div`
  margin-top: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export default List;
