import Trending from "./Trending";
import Recommended from "./Recommended";
import { Types } from "./svgIconsObj";

const Main = ({
  data1,
  handleToggleBookmark,
  arrayBookmarked,
}: {
  data1: Types[];
  handleToggleBookmark: (index: number) => void;

  arrayBookmarked: number[];
}) => {
  return (
    <main className="px-4">
      <Trending
        data1={data1}
        handleToggleBookmark={handleToggleBookmark}
        arrayBookmarked={arrayBookmarked}
      />
      <Recommended
        data1={data1}
        handleToggleBookmark={handleToggleBookmark}
        arrayBookmarked={arrayBookmarked}
      />
    </main>
  );
};

export default Main;
