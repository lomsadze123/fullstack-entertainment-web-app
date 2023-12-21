import Aside from "./Aside";
import Main from "./Main";

const Movies = ({
  setFormType,
}: {
  setFormType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="text-white">
      <Aside setFormType={setFormType} />
      <Main />
    </div>
  );
};

export default Movies;
