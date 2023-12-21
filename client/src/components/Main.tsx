import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import searchIcon from "../assets/icon-search.svg";
import axios from "axios";
import { Types, trendImages } from "./svgIconsObj";
import { useWindowWidth } from "@react-hook/window-size";

const Main: React.FC = () => {
  const [data, setData] = useState<Types[]>([]);
  const Width = useWindowWidth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("./data.json");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="mt-6 px-4">
      <form className="flex gap-4 bg-[#10141E]">
        <img className="w-6" src={searchIcon} alt="search icon" />
        <input
          className="bg-[#10141E] outline-0 w-full"
          type="text"
          placeholder="Search for movies or TV series"
        />
      </form>
      <section className="my-6">
        <h2 className="mb-4 text-xl tracking-[-0.312px]">Trending</h2>
        <Swiper
          slidesPerView={Width > 650 ? 2.5 : 1.4}
          spaceBetween={Width > 650 ? 40 : 16}
          freeMode={true}
        >
          {data.map(
            (items, index) =>
              items.isTrending && (
                <SwiperSlide key={items.title}>
                  <img
                    className="rounded-lg w-[240px]"
                    src={trendImages[index]}
                    alt={index.toString()}
                  />
                </SwiperSlide>
              )
          )}
        </Swiper>
      </section>
    </main>
  );
};

export default Main;
