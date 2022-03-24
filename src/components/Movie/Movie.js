import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Spinner from "../Spinner/Spinner";

import "./Movie.css";

let dopeMovieArray = [
  "the lord of the rings",
  "predator",
  "blade runner",
  "shield",
  "avengers",
  "dr strange",
];

function Movie() {
  let randomMovie =
    dopeMovieArray[Math.floor(Math.random() * dopeMovieArray.length)];

  const [movieTitle, setMovieTitle] = useState(randomMovie);
  const [movieArray, setMovieArray] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMovie();
  }, []);

  async function fetchMovie() {
    setIsLoading(true);
    try {
      let response = await axios.get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API}&s=${movieTitle}`
      );

      setMovieArray(response.data.Search);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="movie-container">
        <div className="movie-input">
          <input type="text" onChange={(e) => setMovieTitle(e.target.value)} />
          <button onClick={fetchMovie}>Search</button>
        </div>
      </div>

      <div className="movie-list-container">
        {isLoading ? (
          <Spinner />
        ) : (
          movieArray &&
          movieArray.map((item) => {
            return (
              <div className="movie-list-item-container" key={item.imdbID}>
                <div>
                  <img src={item.Poster} />
                </div>

                <div>
                  <Link to={`${item.Title}`}>
                    <h2>{item.Title}</h2>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default Movie;
