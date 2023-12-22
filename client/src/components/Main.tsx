import Trending from "./Trending";
import Recommended from "./Recommended";
import { Types } from "./svgIconsObj";

const Main = ({
  data1,
  setBookmarked,
  bookmarked,
}: {
  data1: Types[];
  setBookmarked: React.Dispatch<React.SetStateAction<number[]>>;
  bookmarked: number[];
}) => {
  return (
    <main className="px-4">
      <Trending
        data1={data1}
        setBookmarked={setBookmarked}
        bookmarked={bookmarked}
      />
      <Recommended
        data1={data1}
        setBookmarked={setBookmarked}
        bookmarked={bookmarked}
      />
    </main>
  );
};

export default Main;
