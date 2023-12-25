import Main from "./Main";
import { Types } from "./svgIconsObj";

const Movies = ({
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
    <div className="text-white">
      <Main
        data1={data1}
        handleToggleBookmark={handleToggleBookmark}
        arrayBookmarked={arrayBookmarked}
        filter={filter}
      />
    </div>
  );
};

export default Movies;
