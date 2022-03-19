/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword, auth, signInWithGoogle, signInWithFacebook } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/ProductPage');
  }, [user, loading]); // LOOK AT THIS IS SHIT STARTS BREAKING

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__features">
          <h5>Your Logo</h5>
          <h1>Login</h1>
          <div className="login_emailContainer">
            <div>Email</div>
            <input
              type='text'
              className='login__emailInput'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
            >
            </input>
          </div>
          <div className="login_passwordContainer">
            <div>Password</div>
            <input
              type='text'
              className='login__passwordInput'
              value={email}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            >
            </input>
          </div>
            <div className="login__reset">
              <Link to="/Reset">Forgot Password</Link>
            </div>
          <button
            className="login__btn"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Sign In
          </button>
          <div className="login__btnContainer">
            <div className='login__text'>or continue with</div>
            <div className="login__authBtns">
              <img
                className='login__authImg'
                src={require('./utils/google.png')}
                alt=''
                onClick={signInWithGoogle}
              />
              <img
                className='login__authImg'
                src={require('./utils/facebook.png')}
                alt=''
                onClick={signInWithFacebook}
              />
            </div>
          </div>
          <div className="login__registerText">
            Don't have an account yet?
            <Link className='login__register' to="/Register">Register</Link> for free
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;

{/* <div className="login">
<div className="login__container">
  <div className="login__text">
    <h1>LOGO</h1>
    <div></div>
    <div className="login__email_container">
      <div>
        Email
      </div>
      <input
        type="text"
        className="login__textBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
    </div>
    <div>
      <div className="login__passwordText">
        Password
      </div>
      <input
        type="password"
        className="login__textBox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
    </div>
  <button
    className="login__btn"
    onClick={() => logInWithEmailAndPassword(email, password)}
  >
    Login
  </button>
  <button className="login__btn login__google" onClick={signInWithGoogle}>
    Login with Google
  </button>
  <button className="login__btn login__google" onClick={signInWithFacebook}>
    Login with Facebook
  </button>
  <div>
    <Link to="/Reset">Forgot Password</Link>
  </div>
  <div>
    Don't have an account? <Link to="/Register">Register</Link> now.
  </div>
  </div>
</div>
</div> */}
