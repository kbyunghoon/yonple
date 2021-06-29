import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchUser(pageNumber, difficult, keyword) {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://recruit-api.yonple.com/recruit/869201/${difficult}-posts?page=${pageNumber}&search=${keyword}`
      )
      .then((response) => {
        if(response.data.length===0){
          setHasMore(false)
          console.log(response.data.length)
        }
        setInfo((prevUser) => [...prevUser, ...response.data]);
        setHasMore(true)
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [pageNumber]);

  return { loading, info, error, hasMore };
}
