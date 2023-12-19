// import axios from "axios";
// import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import { useState } from "react";

export interface MainTypes {
  email: string;
  password: string;
  repeatPassword?: string;
}

const App = () => {
  const [formType, setFormType] = useState("signUp");

  // const [data, setData] = useState();

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3001/api/users");
  //       setData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetch();
  // }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<AuthForm formType={formType} setFormType={setFormType} />}
        />
      </Routes>
    </div>
  );
};

export default App;
