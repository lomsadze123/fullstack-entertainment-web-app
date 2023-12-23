import Main from "./Main";
import { Types } from "./svgIconsObj";

const Movies = ({
  data1,
  handleToggleBookmark,
  bookmarked,
}: {
  data1: Types[];
  handleToggleBookmark: (index: number) => void;
  bookmarked: number[];
}) => {
  return (
    <div className="text-white">
      <Main
        data1={data1}
        handleToggleBookmark={handleToggleBookmark}
        bookmarked={bookmarked}
      />
    </div>
  );
};

export default Movies;
