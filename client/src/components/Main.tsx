import Trending from "./Trending";
import Recommended from "./Recommended";
import { Types } from "./svgIconsObj";

const Main = ({
  data1,
  handleToggleBookmark,
  arrayBookmarked,
  filter,
}: {
  data1: Types[];
  handleToggleBookmark: (index: number) => void;
  arrayBookmarked: number[];
  filter: string;
}) => {
  return (
    <main className="px-4">
      <Trending
        data1={data1}
        handleToggleBookmark={handleToggleBookmark}
        arrayBookmarked={arrayBookmarked}
        filter={filter}
      />
      <Recommended
        data1={data1}
        handleToggleBookmark={handleToggleBookmark}
        arrayBookmarked={arrayBookmarked}
        filter={filter}
      />
    </main>
  );
};

export default Main;
