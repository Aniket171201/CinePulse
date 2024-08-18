import { useNavigate } from "react-router-dom";
import "../../styles/UpComingMovie.css";
import "../../styles/MovieCard.css";
import ComingSoon from "./ComingSoon";
const UpComingMovie = () => {
  const navigate = useNavigate();
  return (
    <>
      <br />
      <div className="Maindiv mycur maindiv">
        <div
          class=" card-group myupcoming alert alert-secondary"
          role="alert"
          onClick={() => navigate("/movies")}
        >
          <h4 className="myh4">Now Showing</h4>
          <h6 className="myh6">In Cinemas For You {">"} </h6>
        </div>
      </div>
      <ComingSoon />
    </>
  );
};
export default UpComingMovie;
