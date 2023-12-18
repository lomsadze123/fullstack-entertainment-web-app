import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <h1>{data?.email}</h1>
      <h1>{data?.password}</h1>
    </div>
  );
};

export default App;
