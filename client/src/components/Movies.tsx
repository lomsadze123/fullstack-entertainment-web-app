import Main from "./Main";
import { Types } from "./svgIconsObj";

const Movies = ({
  data1,
  handleToggleBookmark,
  arrayBookmarked,
}: {
  data1: Types[];
  handleToggleBookmark: (index: number) => void;
  arrayBookmarked: number[];
}) => {
  return (
    <div className="text-white">
      <Main
        data1={data1}
        handleToggleBookmark={handleToggleBookmark}
        arrayBookmarked={arrayBookmarked}
      />
    </div>
  );
};

export default Movies;
