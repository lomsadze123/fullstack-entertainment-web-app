import Main from "./Main";
import { Types } from "./svgIconsObj";

const Movies = ({
  data1,
  setBookmarked,
  bookmarked,
}: {
  data1: Types[];
  setBookmarked: React.Dispatch<React.SetStateAction<number[]>>;
  bookmarked: number[];
}) => {
  return (
    <div className="text-white">
      <Main
        data1={data1}
        setBookmarked={setBookmarked}
        bookmarked={bookmarked}
      />
    </div>
  );
};

export default Movies;
