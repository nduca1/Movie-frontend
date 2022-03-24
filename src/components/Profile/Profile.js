import React, { useState, useEffect } from "react";

import axios from "axios";

import { toast } from "react-toastify";
import "./Profile.css";
function Profile() {
  const [favoriteMovieArray, setFavoriteMovieArray] = useState([]);

  useEffect(() => {
    fetchFavoriteMovie();
  }, []);

  async function fetchFavoriteMovie() {
    try {
      let url =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3001"
          : "https://noble-movie-backend.herokuapp.com/";
      let payload = await axios.get(`${url}/api/user/get-user-favorite-movie`, {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
        },
      });

      setFavoriteMovieArray(payload.data.payload.favoriteMovie);
    } catch (e) {
      console.log(e);
      toast.error(`😯 ${e.response.data.payload[0]}`);
    }
  }

  async function handleDeleteFavoriteMovie(id) {
    try {
      let url =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3001"
          : "https://noble-movie-backend.herokuapp.com/";
      let payload = await axios.delete(
        `${url}/api/user/delete-favorite-movie`,
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
          data: {
            movieId: id,
          },
        }
      );
      setFavoriteMovieArray(payload.data.payload);
      toast.success("Congrats! movieDelete");
    } catch (e) {
      console.log(e);
      toast.error(`😯 ${e.response.data.payload[0]}`);
    }
  }

  return (
    <div className="profile-container">
      <div>
        {favoriteMovieArray.map((item) => {
          return (
            <React.Fragment key={item._id}>
              <div className="favorite-container">
                <div>
                  <img src={item.image} />
                </div>

                <div>
                  <h1>{item.title}</h1>
                  <div>{item.plot}</div>
                  <div className="delete-button">
                    <button onClick={() => handleDeleteFavoriteMovie(item._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
