/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  logInWithEmailAndPassword,
  auth,
  signInWithGoogle,
  signInWithFacebook,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger loading screen
      return;
    }
    if (user) navigate("/ListingPage");
  }, [user, loading]); // LOOK AT THIS IS SHIT STARTS BREAKING

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <div className={styles.login__features}>
          <h5>Voluntary</h5>
          <h1>Login</h1>
          <div className={styles.login_emailContainer}>
            <div>Email</div>
            <input
              type="email"
              className={styles.login__emailInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            ></input>
          </div>
          <div className={styles.login_passwordContainer}>
            <div>Password</div>
            <input
              type="password"
              className={styles.login__passwordInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            ></input>
          </div>
          <div className={styles.login__reset}>
            <Link to="/Reset">Forgot Password</Link>
          </div>
          <button
            className={styles.login__btn}
            onClick={() => logInWithEmailAndPassword(email, password)}
            disabled={loading}
          >
            Sign In
          </button>
          <div className={styles.login__btnContainer}>
            <div className={styles.login__text}>or continue with</div>
            <div className={styles.login__authBtns}>
              <img
                className={styles.login__authImg}
                src={require("./utils/google.png")}
                alt=""
                onClick={signInWithGoogle}
                disabled={loading}
              />
              <img
                className={styles.login__authImg}
                src={require("./utils/facebook.png")}
                alt=""
                onClick={signInWithFacebook}
                disabled={loading}
              />
            </div>
          </div>
          <div className={styles.login__registerText}>
            Don't have an account yet?
            <Link className={styles.login__register} to="/Register">
              Register
            </Link>{" "}
            for free
          </div>
        </div>
      </div>
      <img src={require("./utils/Mascot.png")} alt=""></img>
    </div>
  );
}
export default Login;
