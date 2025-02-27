import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./ForgetPass.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlicer";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { email } = location.state || { email: "" };
  const [OTPValues, setOTPValues] = useState({
    OTP: "",
    password: "",
    email: email,
  });
  const [signinValues, setSigninValues] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ValidateOTP = (values) => {
    const errors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (!values.OTP) {
      errors.OTP = "OTP is required";
    } else if (!/^\d{6}$/.test(values.OTP)) {
      errors.OTP = "OTP must be a 6-digit number";
    }
    if (!values.password) errors.password = "password is required";
    else if (!passwordRegex.test(values.password))
      errors.password =
        "password must include uppercase, lowercase, special symbol, numbers";

    return errors;
  };

  const validateSignIn = (values) => {
    const errors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!values.username) errors.username = "Username is required";
    else if (/\s/.test(values.username))
      errors.username = "Username must not contain spaces";

    if (!values.password) errors.password = "password is required";
    else if (!passwordRegex.test(values.password))
      errors.password =
        "password must include uppercase, lowercase, special symbol, numbers";
    return errors;
  };

  const handleOTP = async (e) => {
    e.preventDefault();
    const errors = ValidateOTP(OTPValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      try {
        console.log(OTPValues.email);
        const response = await axios.post(
          "http://localhost:3000/api/reset-password",
          {
            email: OTPValues.email,
            otp: OTPValues.OTP,
            password: OTPValues.password,
          },
          {
            withCredentials: true,
          }
        );
        toast.success(response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
      setOTPValues({
        OTP: "",
        password: "",
        email: "",
      });
    } else {
      setIsSubmitted(false);
    }
  };
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    const errors = validateSignIn(signinValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/sign-in",
          signinValues,
          { withCredentials: true }
        );

        toast.success(response.data.msg, toastOptions);
        if (response.data.status === "unauthorized") {
          toast.warn("please verify Email", toastOptions);
        }
        console.log(response);
        localStorage.setItem("isSubscribed", response.data.isSubscribed);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        dispatch(authActions.changeStatus(response.data.status));
        console.log(authActions.login());

        navigate("/");
      } catch (error) {
        toast.error(error.response.data.msg, toastOptions);
      }
      setSigninValues({
        username: "",
        password: "",
      });
    } else {
      setIsSubmitted(false);
      localStorage.setItem("isSubscribed", "false");
    }
  };

  const handleChangeSignUp = (e) => {
    const { name, value } = e.target;
    setOTPValues({ ...OTPValues, [name]: value });
  };

  const handleChangeSignIn = (e) => {
    const { name, value } = e.target;
    setSigninValues({ ...signinValues, [name]: value });
  };

  useEffect(() => {
    const signUpButtons = document.querySelectorAll(".signUp");
    const signInButtons = document.querySelectorAll(".signIn");
    const main = document.getElementById("main");

    const handleSignUpClick = () => main.classList.add("right-panel-active");
    const handleSignInClick = () => main.classList.remove("right-panel-active");

    signUpButtons.forEach((btn) =>
      btn.addEventListener("click", handleSignUpClick)
    );
    signInButtons.forEach((btn) =>
      btn.addEventListener("click", handleSignInClick)
    );

    return () => {
      signUpButtons.forEach((btn) =>
        btn.removeEventListener("click", handleSignUpClick)
      );
      signInButtons.forEach((btn) =>
        btn.removeEventListener("click", handleSignInClick)
      );
    };
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="custom-form-container">
          <div className="containerr right-panel-active" id="main">
            <div className="form-container">
              <div className="sign-up">
                <form onSubmit={handleOTP}>
                  <h1>Reset Password</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" className="social">
                      <FontAwesomeIcon icon={faGooglePlusG} />
                    </a>
                    <a href="#" className="social">
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </div>
                  <input
                    type="text"
                    name="OTP"
                    placeholder="Enter OTP"
                    value={OTPValues.OTP}
                    onChange={handleChangeSignUp}
                    required
                  />
                  {formErrors.OTP && <p className="error">{formErrors.OTP}</p>}
                  <input
                    type="password"
                    name="password"
                    placeholder="New password"
                    value={OTPValues.password}
                    onChange={handleChangeSignUp}
                    required
                  />
                  {formErrors.password && (
                    <p className="error">{formErrors.password}</p>
                  )}
                  <button className="signUp" type="submit">
                    Confirm
                  </button>
                  <p
                    className="tryagain"
                    onClick={() => navigate("/forget-pass")}
                  >
                    Try again ?
                  </p>
                </form>
              </div>

              <div className="sign-in">
                <form onSubmit={handleSignIn}>
                  <h1>Sign in</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" className="social">
                      <FontAwesomeIcon icon={faGooglePlusG} />
                    </a>
                    <a href="#" className="social">
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={signinValues.username}
                    onChange={handleChangeSignIn}
                    required
                  />
                  {formErrors.username && (
                    <p className="error">{formErrors.username}</p>
                  )}
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={signinValues.password}
                    onChange={handleChangeSignIn}
                    required
                  />
                  {formErrors.password && (
                    <p className="error">{formErrors.password}</p>
                  )}
                  <Link to="/forget-pass">Forget password?</Link>
                  <button className="signIn" type="submit">
                    Sign In
                  </button>
                </form>
              </div>
            </div>

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-right">
                  <h1>Hello, Reader</h1>
                  <p>Enter your OTP and start your journey with us</p>
                  <button className="signUp">Confirm OTP</button>
                </div>
                <div className="overlay-left">
                  <h1>Welcome !</h1>
                  <p>
                    To keep connected with us please login with your personal
                    info after Confirming OTP
                  </p>
                  <button className="signIn">Sign In</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
