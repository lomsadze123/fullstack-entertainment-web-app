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
import Bookmarks from "./components/Bookmarks";

export interface MainTypes {
  email: string;
  password: string;
  repeatPassword?: string;
  id?: string;
}

type Bookmark = {
  id: number;
  userId: string;
};

const App = () => {
  const [formType, setFormType] = useState("signUp");
  const navigate = useNavigate();
  const [_, setData] = useState<MainTypes[]>([]); // server-data
  const [data1, setData1] = useState<Types[]>([]); // movies-data
  const [bookmarked, setBookmarked] = useState<Bookmark[]>([]);
  const [filter, setFilter] = useState("");
  const [additionError, setAdditionError] = useState(false);
  const location = useLocation();
  const token =
    localStorage.getItem("upToken") || localStorage.getItem("token");
  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm<MainTypes>();

  const signUp = async () => {
    try {
      const response = await axios.post(
        "https://fullstack-entertainment-web-app.onrender.com/api/users",
        {
          email: getValues("email"),
          password: getValues("password"),
          repeatPassword: getValues("repeatPassword"),
        }
      );

      localStorage.setItem("upToken", response.data.token);
      localStorage.setItem("userId", response.data.savedUser.id);
      navigate("/Home");
    } catch (error: any) {
      console.log(error.response?.data.error);
    }
  };

  const signIn = async () => {
    try {
      const response = await axios.post(
        "https://fullstack-entertainment-web-app.onrender.com/api/login",
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
      localStorage.setItem("userId_login", response.data.user.id);
      setAdditionError(false);
      navigate("/Home");
    } catch (error: any) {
      if (error.response?.status === 401) {
        setAdditionError(true);
      }
      if (error.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("upToken");
        console.log("Token expired, please log in again.");
      } else {
        console.log(error);
      }
    }
  };

  const handleToggleBookmark = async (index: number) => {
    try {
      const res = await axios.post(
        "https://fullstack-entertainment-web-app.onrender.com/api/bookmarks",
        {
          id: index,
        },
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("upToken") || localStorage.getItem("token")
            }`,
          },
        }
      );

      setBookmarked(res.data);
    } catch (error: any) {
      if (error.response.status === 500) {
        navigate("/auth");
      } else {
        console.log(error);
      }
    }
  };

  const arrayBookmarked = bookmarked.map((item) => item.id);

  useEffect(() => {
    const fetch = async () => {
      try {
        const userId =
          localStorage.getItem("userId") ||
          localStorage.getItem("userId_login");
        if (userId) {
          const response = await axios.get(
            `https://fullstack-entertainment-web-app.onrender.com/api/users`
          );
          const responseBookmarks = await axios.get(
            `https://fullstack-entertainment-web-app.onrender.com/api/bookmarks/${userId}`
          );
          setData(response.data);

          setBookmarked(responseBookmarks.data);
        }
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
      {location.pathname !== "/auth" && (
        <Aside token={token} setFormType={setFormType} />
      )}
      <div className="max-w-[1272px] lg:mx-auto lg:mt-8">
        {location.pathname !== "/auth" && (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-4 bg-[#10141E] px-4 mb-6 text-white md:text-2xl"
          >
            <img className="w-6" src={searchIcon} alt="search icon" />
            <input
              onChange={(e) => setFilter(e.target.value)}
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
                handleToggleBookmark={handleToggleBookmark}
                arrayBookmarked={arrayBookmarked}
                filter={filter}
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
                additionError={additionError}
              />
            }
          />
          <Route
            path="/single"
            element={
              <OnlyMovies
                data1={data1}
                handleToggleBookmark={handleToggleBookmark}
                arrayBookmarked={arrayBookmarked}
                filter={filter}
              />
            }
          />
          <Route
            path="bookmarked"
            element={
              <Bookmarks
                data1={data1}
                handleToggleBookmark={handleToggleBookmark}
                arrayBookmarked={arrayBookmarked}
                filter={filter}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
