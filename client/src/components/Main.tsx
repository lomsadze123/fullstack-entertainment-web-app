import Trending from "./Trending";
import Recommended from "./Recommended";
import { Types } from "./svgIconsObj";

const Main = ({
  data1,
  handleToggleBookmark,
  bookmarked,
}: {
  data1: Types[];
  handleToggleBookmark: (index: number) => void;

  bookmarked: number[];
}) => {
  return (
    <main className="px-4">
      <Trending
        data1={data1}
        handleToggleBookmark={handleToggleBookmark}
        bookmarked={bookmarked}
      />
      <Recommended
        data1={data1}
        handleToggleBookmark={handleToggleBookmark}
        bookmarked={bookmarked}
      />
    </main>
  );
};

export default Main;
