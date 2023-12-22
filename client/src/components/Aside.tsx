import movieImage from "../assets/movieIcon.svg";
import avatar from "../assets/avatar.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import icons from "./svgIconsObj";
// import navTv from "../assets/icon-nav-tv-series.svg";
// import tv from "../assets/icon-category-tv.svg";
// import movies from "../assets/icon-category-movie.svg";

const Aside = ({
  setFormType,
}: {
  setFormType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [show, setShow] = useState(false);
  const [choose, setChoose] = useState(0);
  return (
    <aside className="flex justify-between bg-[#161D2F] py-[18px] mb-4 px-6 relative lg:flex-col lg:h-[960px] md:rounded-[10px] lg:rounded-[20px] lg:justify-start lg:gap-[75px] lg:px-[38px] lg:py-9">
      <img className="w-[25px] h-auto" src={movieImage} alt="movies icon" />
      <nav className="flex items-center gap-6 lg:flex-col lg:gap-10">
        {icons.map((icon, index) => (
          <Link
            to={icon.same ? "single" : icon.label}
            state={icon.label}
            key={icon.label}
          >
            <svg
              className="group"
              onClick={() => setChoose(index)}
              width="100"
              height="100"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-label={icon.label}
            >
              <path
                className="lg:group-hover:fill-[#FC4747]"
                d={icon.path}
                fill={choose === index ? "#FFF" : icon.fill}
              ></path>
            </svg>
          </Link>
        ))}
      </nav>
      <img
        onClick={() => setShow(!show)}
        className="w-6 rounded-[24px] border-white border-[1px] mt-auto lg:cursor-pointer"
        src={avatar}
        alt="avatar icon"
      />
      {show && (
        <Link
          onClick={() => setShow(false)}
          to="/auth"
          className="flex flex-col gap-4 absolute z-10 right-5 top-[70px] bg-[#161D2F] p-4 rounded w-[55%] text-[15px] max-w-[260px] lg:top-[850px] lg:right-[-160px] lg:w-[150%]"
        >
          <button
            onClick={() => setFormType("signIn")}
            className="bg-[#FC4747] rounded font-medium py-1"
          >
            Login
          </button>
          <button className="bg-[#FC4747] rounded font-medium py-1">
            Sign Up
          </button>
        </Link>
      )}
    </aside>
  );
};

export default Aside;
