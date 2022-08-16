import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";

function SignUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const handleSignIn = ()=>{
    if(name !== "" && email !== "" && pass !== "" && confirmPass !== ""){
      if(pass === confirmPass){
        var data = new FormData();
        data.append("UserName", name);
        data.append("LastName", name);
        data.append("Email", email);
        data.append("Password", pass);
        data.append("ConfirmPassword", confirmPass);
        axios.post(`http://localhost:57678/Users/SignUp`, data)
        .then((res)=>{
          LogIn();

        })
        .catch((error)=>{
          console.log(error);
          NotificationManager.error("Sign In error!");
        })
      }
      else{
        NotificationManager.warning("Pass and confirmPass are not valid!");
      }
    }else{
      NotificationManager.warning("Please enter enough information!");
    }
  }

  const LogIn = ()=>{
    const formData = new FormData();
    formData.append("Email", email);
    formData.append("Password", pass);
    axios
      .post(`http://localhost:57678/Login`, formData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        loginUser(res.data.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Email or password is incorrect!");
      });
  }

  const loginUser = (userObj) => ({
    type: "LOGIN_USER",
    payload: userObj,
  });

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.welCom}>Welcome Back</div>
        <div className={styles.subTitle}>Sign Up and Start Learning!</div>
        <div>
          <input
            type={"text"}
            className={styles.inputText}
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
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
        <div>
          <input
            type={"password"}
            className={styles.inputText}
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
          ></input>
        </div>
        <div className={styles.remember}>
          <input style={{ marginTop: 10 }} type={"checkbox"} />
          I’m in for emails with exciting discounts and personalized
          recommendations
        </div>
        <div>
          <button className={styles.btnLogin} onClick={handleSignIn}>Sign In</button>
        </div>
        <NotificationContainer/>
        <p>
          By signing up, you agree to our{" "}
          <Link to={"."} className={styles.redText}>
            Terms of Use
          </Link>
          and{" "}
          <Link to={"."} className={styles.redText}>
            Privacy Policy
          </Link>
        </p>
        <p class="">
          Already have an account?{" "}
          <Link to={"/login/signin"} className={styles.redText}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
