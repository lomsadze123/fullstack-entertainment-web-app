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

      navigate(response.data.savedUser.id ?? "/");
      console.log(response.data.token);
    } catch (error: any) {
      console.log(error.response?.data.error);
    }
  };

  const signIn = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email: getValues("email"),
        password: getValues("password"),
      });

      const user = data?.find((us) => us.email === getValues("email"));

      navigate(user?.id ?? "/");
      console.log("token ", response.data.token);
    } catch (error) {
      console.log(error);
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
        <Route
          path="/"
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
        <Route path="/:id" element={<Movies />} />
      </Routes>
    </div>
  );
};

export default App;
