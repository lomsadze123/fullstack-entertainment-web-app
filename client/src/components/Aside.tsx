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
  const [choose, setChoose] = useState(-1);
  return (
    <aside className="flex justify-between bg-[#161D2F] py-[18px] px-6 relative">
      <img className="w-[25px] h-auto" src={movieImage} alt="movies icon" />
      <nav className="flex items-center gap-6">
        {icons.map((icon, index) => (
          <svg
            onClick={() => setChoose(index)}
            key={icon.label}
            width="100"
            height="100"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-label={icon.label}
          >
            <path
              d={icon.path}
              fill={choose === index ? "#FFF" : icon.fill}
            ></path>
          </svg>
        ))}
      </nav>
      <img
        onClick={() => setShow(!show)}
        className="w-6 rounded-[24px] border-white border-[1px]"
        src={avatar}
        alt="avatar icon"
      />
      {show && (
        <Link
          to="/auth"
          className="flex flex-col gap-4 absolute right-5 top-[70px] bg-[#161D2F] p-4 rounded w-[55%] text-[15px]"
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
