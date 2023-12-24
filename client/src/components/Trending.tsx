import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Types, images } from "./svgIconsObj";
import { useWindowWidth } from "@react-hook/window-size";
import play from "../assets/icon-play.svg";

const Trending = ({
  data1,
  handleToggleBookmark,
  arrayBookmarked,
}: {
  data1: Types[];
  handleToggleBookmark: (index: number) => void;
  arrayBookmarked: number[];
}) => {
  const Width = useWindowWidth();

  return (
    <section className="my-6">
      <h2 className="mb-4 text-xl tracking-[-0.312px] md:text-[32px]">
        Trending
      </h2>
      <Swiper
        slidesPerView={Width > 650 ? 2.5 : 1.4}
        spaceBetween={Width > 650 ? 40 : 16}
        freeMode={true}
      >
        {data1.map(
          (items, index) =>
            items.isTrending && (
              <SwiperSlide
                key={items.title}
                className="relative lg:cursor-pointer group"
              >
                <img
                  className="rounded-lg transition duration-300 lg:group-hover:scale-105 lg:group-hover:brightness-50"
                  src={images[index]}
                  alt={index.toString()}
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between">
                  <svg
                    onClick={() => handleToggleBookmark(index)}
                    className="self-end mr-2 mt-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <circle
                      opacity="0.500647"
                      cx="16"
                      cy="16"
                      r="16"
                      fill="#10141E"
                    />
                    <path
                      d="M20.7112 9.771L20.7215 9.77548L20.7319 9.77965C20.7992 9.80657 20.8386 9.84049 20.8705 9.88692C20.9032 9.93458 20.9167 9.97786 20.9167 10.0364V21.9636C20.9167 22.0221 20.9032 22.0654 20.8705 22.1131C20.8386 22.1595 20.7992 22.1934 20.7319 22.2203L20.7237 22.2236L20.7156 22.2271C20.7107 22.2292 20.6807 22.2407 20.6094 22.2407C20.5085 22.2407 20.4397 22.2142 20.3686 22.15L16.3572 18.2346L15.8333 17.7233L15.3095 18.2346L11.2975 22.1505C11.2129 22.2276 11.1421 22.25 11.0573 22.25C11.02 22.25 10.9882 22.2433 10.9555 22.229L10.9452 22.2245L10.9347 22.2203C10.8674 22.1934 10.8281 22.1595 10.7962 22.1131C10.7635 22.0654 10.75 22.0221 10.75 21.9636V10.0364C10.75 9.97786 10.7635 9.93458 10.7962 9.88692C10.8281 9.84049 10.8674 9.80657 10.9347 9.77965L10.9452 9.77548L10.9555 9.771C10.9882 9.75674 11.02 9.75 11.0573 9.75H20.6094C20.6466 9.75 20.6784 9.75674 20.7112 9.771Z"
                      stroke="white"
                      strokeWidth="1.5"
                      fill={arrayBookmarked.includes(index) ? "white" : "none"}
                    />
                  </svg>
                  <div className="hidden lg:group-hover:flex gap-[19px] bg-white bg-opacity-25 self-center p-[9px] rounded-[28.5px]">
                    <img src={play} alt="play icon" />
                    <h2 className="text-lg">Play</h2>
                  </div>
                  <div className="ml-4 mb-4">
                    <ul className="flex gap-2 text-xs">
                      <li>{items.year}</li>
                      <li className="flex items-center gap-[6px] before:content-['•']">
                        {items.category === "Movie" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              opacity="0.75"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.1733 0H1.82667C0.817827 0 0 0.817827 0 1.82667V10.1733C0 11.1822 0.817827 12 1.82667 12H10.1733C10.6578 12 11.1224 11.8075 11.465 11.465C11.8075 11.1224 12 10.6578 12 10.1733V1.82667C12 1.3422 11.8075 0.877585 11.465 0.535018C11.1224 0.192452 10.6578 0 10.1733 0ZM2.4 5.4H1.2V4.2H2.4V5.4ZM2.4 6.6H1.2V7.8H2.4V6.6ZM10.8 5.4H9.6V4.2H10.8V5.4ZM10.8 6.6H9.6V7.8H10.8V6.6ZM10.8 1.644V2.4H9.6V1.2H10.356C10.4738 1.2 10.5867 1.24678 10.67 1.33004C10.7532 1.41331 10.8 1.52624 10.8 1.644ZM2.4 1.2H1.644C1.52624 1.2 1.41331 1.24678 1.33004 1.33004C1.24678 1.41331 1.2 1.52624 1.2 1.644V2.4H2.4V1.2ZM1.2 10.356V9.6H2.4V10.8H1.644C1.52624 10.8 1.41331 10.7532 1.33004 10.67C1.24678 10.5867 1.2 10.4738 1.2 10.356ZM10.356 10.8C10.6012 10.8 10.8 10.6012 10.8 10.356V9.6H9.6V10.8H10.356Z"
                              fill="white"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                          >
                            <path
                              opacity="0.75"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.54 2.0291H10V7.57157H0V2.0291H2.46L1.11 0.858252L1.89 0.439103L3.5 1.82472L5.11 0.428711L5.89 0.858252L4.54 2.0291ZM1 2.72191V6.87876H6V2.72191H1ZM8.5 5.49314H7.5V4.80033H8.5V5.49314ZM7.5 4.10752H8.5V3.41472H7.5V4.10752Z"
                              fill="white"
                            />
                          </svg>
                        )}
                        <span>{items.category}</span>
                      </li>
                      <li className="before:content-['•'] before:mr-1">
                        {items.rating}
                      </li>
                    </ul>
                    <h3>{items.title}</h3>
                  </div>
                </div>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </section>
  );
};

export default Trending;
