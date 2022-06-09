import React from "react";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";

function SignUp(props) {
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
          ></input>
        </div>
        <div>
          <input
            type={"text"}
            className={styles.inputText}
            placeholder="Email Address"
          ></input>
        </div>
        <div>
          <input
            type={"password"}
            className={styles.inputText}
            placeholder="Password"
          ></input>
        </div>
        <div className={styles.remember}>
          <input style={{ marginTop: 10 }} type={"checkbox"} />
          I’m in for emails with exciting discounts and personalized
          recommendations
        </div>
        <div>
          <button className={styles.btnLogin}>Sign In</button>
        </div>
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
          <Link to={"/signin"} className={styles.redText}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
