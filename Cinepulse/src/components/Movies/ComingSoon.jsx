import React from "react";
import moviesData from "../JsonFiles/movies.json";

const ComingSoon = () => {
  return (
    <>
      <br />
      <div className="Maindiv row row-cols-1 row-cols-md-3 g-4">
        {moviesData.map((movie) => (
          <div className="Mycard col" key={movie.id}>
            <div className="card h-100">
              <img
                src={movie.image}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.description}</p>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  {movie.releaseDate}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ComingSoon;
