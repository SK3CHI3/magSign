//css
import "../styles/signup.css";
//assets
import google from "../assets/icons/google.svg";
//components
import Input from "./Input";
import UIToggler from "./UiToggler";
//react
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();

  const pattern = {
    username: /^[a-zA-Z0-9_]{3,}$/,
    password: /^.{6,}$/,
  };

  const [lift, setLift] = useState({
    username: false,
    password: false,
    confirm_password: false,
  });

  const [values, setValues] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });

  const onChange = (value, name) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [message, setMessage] = useState({ text: "", type: "" }); // type can be "error" or "success"

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (values.password !== values.confirm_password) {
      setMessage({ text: "Passwords do not match", type: "error" });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      setMessage({ text: "Account created successfully. Redirecting...", type: "success" });
      
      setTimeout(() => {
        navigate('/signin', { replace: true });
      }, 2000);
      
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  };

  const { turnRight, walk, start, stop, started } = props.animation;

  const slide = () => {
    props.setFacingRight(false);
    if (!started) start();
    walk();
    setTimeout(() => {
      stop();
      turnRight();
    }, 2900);
  };

  return (
    <div className="signup-container">
      <div className="toggler-container">
        <UIToggler />
      </div>
      <p className="lovebirds-title">Create Account</p>
      <p className="lovebirds-welcome">Join our community</p>
      {message.text && (
        <p className={message.type === "error" ? "error-message" : "success-message"}>
          {message.text}
        </p>
      )}
      <form className="signup-form" onSubmit={handleSubmit}>
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
          <Input
            className="confirm-password"
            name="confirm_password"
            type="password"
            placeholder="Confirm password*"
            required={true}
            value={values.confirm_password}
            onChange={onChange}
            pattern={pattern.password}
            lift={lift.confirm_password}
            setLift={setLift}
          />
        </div>
        <input className="submit-btn" type="submit" value="Create Account" />
      </form>
      <div className="signup-foot">
        <div className="new-container">
          <p className="new-text">Already have an account?</p>
          <button
            className="signin-btn"
            onClick={(e) => {
              e.preventDefault();
              slide();
              navigate("./signin", {replace: true});
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
