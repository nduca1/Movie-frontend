import React, { useState, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import useAuthHooks from "../hooks/useAuthHooks";
import useIsEmail from "../hooks/useIsEmail";
import useInputHooks from "../hooks/useInputHooks";
import usePasswordHooks from "../hooks/usePasswordHooks";

import "./Signup.css";

function Signup() {
  const [, , checkToken] = useAuthHooks();
  const [email, setEmail, errorEmail, setEmailOnBlur, setEmailOnFocus] =
    useIsEmail();
  const [
    username,
    setUsername,
    errorUsername,
    setUsernameOnBlur,
    setUsernameOnFocus,
  ] = useInputHooks();

  const [
    password,
    setPassword,
    errorPassword,
    setPasswordOnBlur,
    setPasswordOnFocus,
  ] = usePasswordHooks();

  const navigate = useNavigate();

  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  useEffect(() => {
    if (checkToken()) {
      navigate("/movie");
    }
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    if (errorEmail || errorUsername || errorPassword) {
      toast.error("please fill out the form correctly");
      return;
    }

    try {
      let url =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3001"
          : "https://noble-movie-backend.herokuapp.com/";
      await axios.post(`${url}/api/user/create-user`, {
        username,
        email,
        password,
      });

      toast.success("Congrats! Now please go login!");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (e) {
      toast.error(`😯 ${e.response.data.payload[0]}`);
    }
  }

  return (
    <form className="sign-up-container" onSubmit={handleSubmit}>
      <div>
        <h1>Sign up</h1>

        <div className="form-input">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onBlur={() => setUsernameOnBlur(true)}
            onFocus={() => setUsernameOnFocus(true)}
            required
          />
          <div className={`${errorUsername ? "form-error" : undefined}`}>
            <span>
              {errorUsername && "username cannot have special characters"}{" "}
            </span>
          </div>
        </div>

        <div className="form-input">
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onBlur={() => setEmailOnBlur(true)}
            onFocus={() => setEmailOnFocus(true)}
            required
          />
          <div className={`${errorEmail ? "form-error" : undefined}`}>
            <span>{errorEmail && "Please enter a valid email"} </span>
          </div>
        </div>

        <div className="form-input">
          <input
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onBlur={() => setPasswordOnBlur(true)}
            onFocus={() => setPasswordOnFocus(true)}
            required
          />
          <div className={`${errorPassword ? "form-error" : undefined}`}>
            <span>{errorPassword && "Please enter a valid email"} </span>
          </div>
        </div>

        <button>Submit</button>
      </div>
    </form>
  );
}

export default Signup;
