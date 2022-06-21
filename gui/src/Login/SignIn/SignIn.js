import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("Email", email);
    formData.append("Password", pass);
    await axios
      .post(`http://localhost:57678/Login`, formData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        loginUser(res.data.user);
        handleRole(formData);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Email or password is incorrect!");
      });
  };

  const loginUser = (userObj) => ({
    type: "LOGIN_USER",
    payload: userObj,
  });

  const handleRole = (formData) => {
    axios
      .post("http://localhost:57678/GetRole", {
        Email: email,
        Password: pass,
      })
      .then((res) => {
        if (res.data === "Instructor") {
          navigate("/instructorpage");
        }
        if (res.data === "Admin") {
          navigate("/admin");
        }
        if (res.data === "Student") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.welCom}>Welcome Back</div>
        <div className={styles.subTitle}>Log In to Your Account!</div>
        <div className={styles.google}>
          <button className={styles.google}>
            <i className="fa-brands fa-google" style={{marginRight: 10}}></i>Continue with google
          </button>
        </div>
        <div>
          <input
            type={"text"}
            className={styles.inputText}
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            type={"password"}
            className={styles.inputText}
            placeholder="Password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          ></input>
        </div>
        <div className={styles.remember}>
          <input style={{ marginTop: 10 }} type={"checkbox"} />
          Remember me
        </div>
        <div>
          <button className={styles.btnLogin} onClick={handleLogin}>
            Sign In
          </button>
          <NotificationContainer />
        </div>
        <p>
          Or{" "}
          <Link to={"."} className={styles.redText}>
            Forgot Password
          </Link>
          ?
        </p>
        <p>
          Don`t have an account?{" "}
          <Link to={"/signup"} className={styles.redText}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
