import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import { useForm } from "react-hook-form";
import Movies from "./components/Movies";
import { Types } from "./components/svgIconsObj";
import OnlyMovies from "./components/OnlyMovies";
import Aside from "./components/Aside";
import searchIcon from "./assets/icon-search.svg";

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
  const [data1, setData1] = useState<Types[]>([]);
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const location = useLocation();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("./data.json");
        setData1(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="lg:flex lg:items-start md:mt-[23px] md:mx-[25px] lg:m-0 lg:pt-8 lg:pl-8 lg:gap-5">
      {location.pathname !== "/auth" && <Aside setFormType={setFormType} />}
      <div className="max-w-[1272px] lg:mx-auto lg:mt-8">
        {location.pathname !== "/auth" && (
          <form className="flex gap-4 bg-[#10141E] px-4 mb-6 text-white md:text-2xl">
            <img className="w-6" src={searchIcon} alt="search icon" />
            <input
              className="bg-[#10141E] outline-0 w-full"
              type="text"
              placeholder="Search for movies or TV series"
            />
          </form>
        )}
        <Routes>
          <Route
            path="/Home"
            element={
              <Movies
                data1={data1}
                setBookmarked={setBookmarked}
                bookmarked={bookmarked}
              />
            }
          />
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
          <Route
            path="/single"
            element={
              <OnlyMovies
                data1={data1}
                setBookmarked={setBookmarked}
                bookmarked={bookmarked}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
