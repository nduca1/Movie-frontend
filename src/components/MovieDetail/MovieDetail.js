import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import axios from "axios";
import { toast } from "react-toastify";

import "./MovieDetail.css";

function MovieDetail() {
  let params = useParams();

  const [movieInfo, setMovieInfo] = useState("");

  useEffect(() => {
    fetchSingleMovie();
  }, []);

  async function fetchSingleMovie() {
    try {
      let movieUrl =
        process.env.NODE_ENV === "development"
          ? `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API}&t=${params.title}`
          : `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API}&t=${params.title}`;
      let response = await axios.get(movieUrl);

      setMovieInfo(response.data);
    } catch (e) {}
  }

  async function addToFavorite() {
    try {
      let url =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3001"
          : "https://noble-movie-backend.herokuapp.com";
      let payload = await axios.post(
        `${url}/api/user/add-favorite-movie`,
        {
          image: movieInfo.Poster,
          title: movieInfo.Title,
          plot: movieInfo.Plot,
        },
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        }
      );

      toast.success("Congrats! Favorite Movie Saved");
    } catch (e) {
      toast.error(`😯 ${e.response.data.payload[0]}`);
    }
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-container-left">
        <div>
          <img src={movieInfo.Poster} />
        </div>
      </div>
      <div className="movie-detail-container-right">
        <div>
          <h1>{movieInfo.Title}</h1>
        </div>

        <div>
          <p>Year: {movieInfo.Year}</p>
        </div>

        <div>
          <p>Rating: {movieInfo.Rated}</p>
        </div>

        <div>
          <p>Released: {movieInfo.Released}</p>
        </div>

        <div>
          <p>Actors: {movieInfo.Actors}</p>
        </div>

        <div>
          <p>Awards: {movieInfo.Awards}</p>
        </div>

        <div>
          <p>Genre: {movieInfo.Genre}</p>
        </div>

        <div className="plot-style">
          <p>Plot: {movieInfo.Plot}</p>
        </div>

        <div>
          <button onClick={addToFavorite}>Add To Favorites</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
