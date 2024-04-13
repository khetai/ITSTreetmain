import React, { useEffect, useState, useContext } from "react";
import style from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { setCookie } from "../../helpers/cookie";
import uploadAllLocalStorage from "../../helpers/uploadLocalApi";
import { useNavigate, useLocation, NavLink, Link } from "react-router-dom";
import { MainContext } from "../../contexts/mainContextProvider";
import { useSelector } from "react-redux";
const handleInputChange = (e, stateChangerCb) => {
  const { name, value } = e.target;
  stateChangerCb(prevFormData => ({
    ...prevFormData,
    [name]: value,
  }));
};

function LogInPopUp({ setLogin }) {
  const url = useSelector(state => state.store.url);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loginFormData, setLoginFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState(false);
  const { setUser } = useContext(MainContext);

  const handleLoginSubmit = async (e, data) => {
    e.preventDefault();
    try {
      setRequested(true);
      const response = await fetch(`${url}Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setCookie("token", result.token, result.expires);
        setCookie(
          "refresh_token",
          result.refreshToken,
          result.refreshTokenExpires
        );
        const basket_local_result = await uploadAllLocalStorage(result.token);

        if (basket_local_result == "ok") {
          setUser(result.username);
          setRequested(false);
          document.body.style.opacity = "1";
          document.body.style.pointerEvents = "all";
          navigate("/");
        }
      } else {
        setRequested(false);
        setError(true);
        console.error("Login failed:", response);
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };
  useEffect(() => {
    document.body.style.opacity = requested ? "0.6" : "1";
    document.body.style.pointerEvents = requested ? "none" : "all";
  }, [requested]);

  return (
    <form
      className={style.loginForm}
      onSubmit={e => handleLoginSubmit(e, loginFormData)}
    >
      {error && (
        <span className={style.errorMessage}>
          {t("usernameOrPasswordIncorrect")}
        </span>
      )}
      <h1 className={style.title}>{t("Login")}</h1>
      <label htmlFor="email">
        <i className="fa-solid fa-envelope"></i>
        <input
          placeholder={t("email")}
          type="text"
          name="usernameOrEmail"
          id="email"
          value={loginFormData.usernameOrEmail}
          onChange={e => {
            handleInputChange(e, setLoginFormData);
          }}
        />
      </label>
      <label htmlFor="password">
        <i className="fa-solid fa-key"></i>
        <input
          placeholder={t("password")}
          type="password"
          name="password"
          id="password"
          value={loginFormData.password}
          onChange={e => {
            handleInputChange(e, setLoginFormData);
          }}
        />
      </label>
      <button type="submit">
        {requested ? (
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        ) : (
          t("Login")
        )}
      </button>
      <p onClick={() => setLogin(false)}>{t("noAccount?")}</p>
    </form>
  );
}

function SignInPopUp({ setLogin }) {
  const { t } = useTranslation();
  const [signInFormData, setSignInFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const validate = data => {
    const errors = {};
    if (!data.name) {
      errors.name = "nameEmpty";
    } else if (data.name?.length < 3) {
      errors.name = "nameLength";
    }
    if (!data.surname) {
      errors.surname = "surnameEmpty";
    } else if (data.surname?.length < 3) {
      errors.surname = "surnameLength";
    }
    if (!data.username) {
      errors.username = "usernameEmpty";
    } else if (data.username?.length < 3) {
      errors.username = "usernameLength";
    }
    if (!data.email.includes("@")) {
      errors.email = "emailFormat";
    }
    if (!data.password) {
      errors.password = "passwordEmpty";
    } else {
      if (data.password?.length < 8) {
        errors.password = "passwordLength";
      }
      if (!/[A-Z]/.test(data.password)) {
        errors.password = "passwordUppercase";
      }
      if (!/[a-z]/.test(data.password)) {
        errors.password = "passwordLowercase";
      }
      if (!/[0-9]/.test(data.password)) {
        errors.password = "passwordNumber";
      }
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "passwordMismatch";
    }
    return errors;
  };
  useEffect(() => {
    document.body.style.opacity = requested ? "0.6" : "1";
    document.body.style.pointerEvents = requested ? "none" : "all";
  }, [requested]);

  const handleSignInSubmit = async e => {
    e.preventDefault();
    const errors = validate(signInFormData);
    if (Object.keys(errors)?.length === 0) {
      setErrorMessage({});
      setError(false);
      setRequested(true);
      try {
        const response = await fetch(`${url}Auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signInFormData),
        });
        if (response.ok) {
          setRequested(false);
          document.body.style.opacity = "1";
          document.body.style.pointerEvents = "all";
          setLogin(true);
        } else {
          setRequested(false);
          setErrorMessage({ username: "usernameExists" });
          setError(true);
        }
      } catch (error) {
        console.error("ERROR", error);
      }
    } else {
      setErrorMessage(errors);
      setError(true);
      setRequested(false);
    }
  };
  return (
    <form
      className={style.loginForm}
      action="/signup"
      method="POST"
      onSubmit={handleSignInSubmit}
    >
      {error && (
        <span className={style.errorMessage}>
          {t(errorMessage[Object.keys(errorMessage)[0]])}
        </span>
      )}

      <h1 className={style.title}>{t("signup")}</h1>
      <label htmlFor="name">
        <i className="fa-solid fa-user"></i>
        <input
          placeholder={t("name")}
          type="text"
          name="name"
          id="name"
          value={signInFormData.name}
          onChange={e => {
            handleInputChange(e, setSignInFormData);
          }}
        />
      </label>
      <label htmlFor="surname">
        <i className="fa-solid fa-user"></i>
        <input
          placeholder={t("surname")}
          type="text"
          name="surname"
          id="surname"
          value={signInFormData.surname}
          onChange={e => {
            handleInputChange(e, setSignInFormData);
          }}
        />
      </label>
      <label htmlFor="username">
        <i className="fa-solid fa-envelope"></i>
        <input
          placeholder={t("username")}
          type="username"
          name="username"
          id="username"
          value={signInFormData.username}
          onChange={e => {
            handleInputChange(e, setSignInFormData);
          }}
        />
      </label>
      <label htmlFor="email">
        <i className="fa-solid fa-envelope"></i>
        <input
          placeholder={t("email")}
          type="email"
          name="email"
          id="email"
          value={signInFormData.email}
          onChange={e => {
            handleInputChange(e, setSignInFormData);
          }}
        />
      </label>
      <label htmlFor="password">
        <i className="fa-solid fa-key"></i>
        <input
          placeholder={t("password")}
          type="password"
          name="password"
          id="password"
          value={signInFormData.password}
          onChange={e => {
            handleInputChange(e, setSignInFormData);
          }}
        />
      </label>
      <label htmlFor="confirmPassword">
        <i className="fa-solid fa-key"></i>
        <input
          placeholder={t("confirmPassword")}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={signInFormData.confirmPassword}
          onChange={e => {
            handleInputChange(e, setSignInFormData);
          }}
        />
      </label>
      <button
        type="submit"
        onClick={e => handleSignInSubmit(e, signInFormData)}
      >
        {requested ? (
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        ) : (
          t("signup")
        )}
      </button>
      <p onClick={() => setLogin(true)}>{t("haveAccount?")}</p>
    </form>
  );
}

function Login() {
  const [login, setLogin] = useState(true);
  const location = useLocation();

  window.onpopstate = function (event) {
    if (
      location.pathname === "/login" &&
      window.location.pathname === "/order"
    ) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <Helmet>
        <title>ITStreet</title>
      </Helmet>
      <section className={style.container}>
        <Link
          to={"/"}
          style={{
            position: "fixed",
            top: "10px",
            left: "10px",
            cursor: "pointer",
          }}
        >
          ITStreet
        </Link>
        {login ? (
          <LogInPopUp setLogin={setLogin}></LogInPopUp>
        ) : (
          <SignInPopUp setLogin={setLogin}></SignInPopUp>
        )}
      </section>
    </>
  );
}

export default Login;
