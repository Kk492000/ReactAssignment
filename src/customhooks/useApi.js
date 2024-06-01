import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useApi = (url) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const getData = useCallback(async () => {
    setLoader(true);
    try {
      const response = await axios({
        method: "GET",
        url: url,
      });
      if (response?.status === 200) {
        setData(response?.data);
        setLoader(false);
      } else {
        alert("Error Fetching Users Data");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoader(false);
      alert("Connection Error");
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, loader };
};

export default useApi;
