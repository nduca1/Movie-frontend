import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// import jwtDecode from "jwt-decode";

import "react-toastify/dist/ReactToastify.css";

import Movie from "./components/Movie/Movie";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import useAuthHooks from "./components/hooks/useAuthHooks";

function App() {
  const [user, setUser] = useAuthHooks();

  function logout() {
    window.localStorage.removeItem("jwtToken");
    setUser(null);
  }

  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/movie"
            element={
              <PrivateRoute>
                <Movie />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route path="movie/:title" element={<MovieDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
