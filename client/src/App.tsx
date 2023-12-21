import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import { useForm } from "react-hook-form";
import Movies from "./components/Movies";

export interface MainTypes {
  email: string;
  password: string;
  repeatPassword?: string;
  id?: string;
}

const App = () => {
  const [formType, setFormType] = useState("signUp");
  const navigate = useNavigate();
  const [data, setData] = useState<MainTypes[]>([]);
  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm<MainTypes>();

  const signUp = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/users", {
        email: getValues("email"),
        password: getValues("password"),
        repeatPassword: getValues("repeatPassword"),
      });

      localStorage.setItem("upToken", response.data.token);
      navigate(response.data.savedUser.id ?? "/");
    } catch (error: any) {
      console.log(error.response?.data.error);
    }
  };

  const signIn = async () => {
    try {
      const token =
        localStorage.getItem("upToken") || localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3001/api/login",
        {
          email: getValues("email"),
          password: getValues("password"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("token", response.data.token);

      const user = data?.find((us) => us.email === getValues("email"));

      navigate(user?.id ?? "/");
    } catch (error: any) {
      if (error.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("upToken");
        console.log("Token expired, please log in again.");
      } else {
        console.log(error);
      }
    }
  };

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
  }, [navigate]);

  // console.log(data);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Movies setFormType={setFormType} />} />
        <Route
          path="/auth"
          element={
            <AuthForm
              formType={formType}
              setFormType={setFormType}
              getValues={getValues}
              register={register}
              signUp={signUp}
              signIn={signIn}
              reset={reset}
              errors={errors}
              handleSubmit={handleSubmit}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
