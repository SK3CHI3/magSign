//css
import "../styles/signin.css";
//assets
import google from "../assets/icons/google.svg";
//components
import Input from "./Input";
import UIToggler from "./UiToggler";
//react
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = (props) => {
  const navigate = useNavigate();

  const pattern = {
    username: /^[a-zA-Z0-9_]{3,}$/,
    password: /^.{6,}$/,
  };

  const [lift, setLift] = useState({
    username: false,
    password: false,
  });

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" }); // type can be "error" or "success"

  const onChange = (value, name) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      setMessage({ text: "Login successful. Welcome back!", type: "success" });
      
      // TODO: Add dashboard redirect
      setTimeout(() => {
        // Will add dashboard navigation later
      }, 2000);
      
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  };

  const { turnLeft, walk, start, stop, started } = props.animation;

  const slide = () => {
    props.setFacingRight(true);
    if (!started) start();
    walk();
    setTimeout(() => {
      stop();
      turnLeft();
    }, 2900);
  };

  return (
    <div className="signin-container">
      <div className="toggler-container">
        <UIToggler />
      </div>
      <p className="lovebirds-title">Welcome Back</p>
      <p className="lovebirds-welcome">Sign in to your account</p>
      {message.text && (
        <p className={message.type === "error" ? "error-message" : "success-message"}>
          {message.text}
        </p>
      )}
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="fields-container">
          <Input
            className="username"
            name="username"
            type="text"
            placeholder="Username*"
            required={true}
            value={values.username}
            onChange={onChange}
            pattern={pattern.username}
            lift={lift.username}
            setLift={setLift}
          />
          <Input
            className="password"
            name="password"
            type="password"
            placeholder="Password*"
            required={true}
            value={values.password}
            onChange={onChange}
            pattern={pattern.password}
            lift={lift.password}
            setLift={setLift}
          />
        </div>
        <button
          className="forgot-btn"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Forgot password?
        </button>
        <input className="submit-btn" type="submit" value="Sign in" />
      </form>
      <div className="signin-foot">
        <p className="or-section">or</p>
        <button className="google-btn">
          <img src={google} alt="google" />
          Continue with Google
        </button>
        <div className="new-container">
          <p className="new-text">Don't have an account?</p>
          <button
            className="create-btn"
            onClick={(e) => {
              e.preventDefault();
              slide();
              navigate("/signup", {replace: true});
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
