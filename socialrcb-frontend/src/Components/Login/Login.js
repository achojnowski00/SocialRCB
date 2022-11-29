import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import { ErrorMess } from "../../Components/ErrorMess/ErrorMess";
import "./Login.scss";

async function loginUser(credentials) {
  return fetch("http://127.0.0.1:8000/api/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function registerUser(credentials) {
  return fetch("http://127.0.0.1:8000/api/auth/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [usernameReg, setUsernameReg] = useState();
  const [passwordReg, setPwsswordReg] = useState();
  const [emailReg, setEmailReg] = useState();

  const [isErrEmailR, setIsErrEmailR] = useState(false);
  const [isErrEmailRMess, setIsErrEmailRMess] = useState();
  const [isErrUsernameR, setIsErrUsernameR] = useState(false);
  const [isErrUsernameRMess, setIsErrUsernameRMess] = useState();
  const [isErrPasswdR, setIsErrPasswdR] = useState(false);
  const [isErrPasswdRMess, setIsErrPasswdRMess] = useState();

  const [isLoginError, setIsLoginError] = useState(false);
  const [isLoginErrorMess] = useState("Błędny login lub hasło");

  const resetStates = () => {
    setIsErrEmailR(false);
    setIsErrEmailRMess("");
    setIsErrUsernameR(false);
    setIsErrUsernameRMess("");
    setIsErrPasswdR(false);
    setIsErrPasswdRMess("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password,
    });
    if ("access" in response) {
      swal("Witaj", response.user.username, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("access", response["access"]);
        localStorage.setItem("user", JSON.stringify(response["user"]));
        window.location.href = "/profile";
      });
    } else {
      // console.log(response);
      swal(
        "Failed",
        "Nie istnieje użytkownik o podanej nazwie i haśle",
        "error",
        {
          buttons: false,
          timer: 1000,
        }
      );
      setIsLoginError(true);
    }
  };

  const handleRegisterSubmit = async (e) => {
    resetStates();
    e.preventDefault();
    const response = await registerUser({
      username: usernameReg,
      password: passwordReg,
      email: emailReg,
    });
    if ("token" in response) {
      swal("Pomyślnie zarejestrowano", response.user.username, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("access", response["token"]);
        localStorage.setItem("user", JSON.stringify(response["user"]));
        window.location.href = "/profile";
      });
    } else {
      // console.log(response);
      const blad = "Wprowadzono błędne dane";
      swal("Failed", blad, "error", {
        buttons: false,
        timer: 1000,
      });
      if (response.email) {
        setIsErrEmailRMess(response.email);
        setIsErrEmailR(true);
      }
      if (response.username) {
        setIsErrUsernameRMess(response.username);
        setIsErrUsernameR(true);
      }
      if (response.password) {
        setIsErrPasswdRMess(response.password);
        setIsErrPasswdR(true);
      }
    }
  };

  return (
    <div className="autoryzacja">
      <p className="autoryzacja__title">Logowanie</p>
      <form
        className="autoryzacja__login"
        noValidate
        onSubmit={handleLoginSubmit}
      >
        {isLoginError && <ErrorMess message={isLoginErrorMess} />}
        <TextField
          className="autoryzacja__input"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          error={isLoginError}
          label="Nazwa użytkownika"
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          className="autoryzacja__input"
          variant="outlined"
          required
          margin="normal"
          fullWidth
          error={isLoginError}
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="autoryzacja__button"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Zaloguj
        </Button>
      </form>

      <p className="autoryzacja__title">Rejestracja</p>
      <form
        className="autoryzacja__login"
        noValidate
        onSubmit={handleRegisterSubmit}
      >
        {isErrEmailR && <ErrorMess message={isErrEmailRMess} />}
        <TextField
          className="autoryzacja__input"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Adres email"
          error={isErrEmailR}
          onChange={(e) => setEmailReg(e.target.value)}
        />
        {isErrUsernameR && <ErrorMess message={isErrUsernameRMess} />}
        <TextField
          className="autoryzacja__input"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Nazwa uzytkownika"
          error={isErrUsernameR}
          onChange={(e) => setUsernameReg(e.target.value)}
        />
        {isErrPasswdR && <ErrorMess message={isErrPasswdRMess} />}
        <TextField
          className="autoryzacja__input"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Hasło (min. 8 znaków)"
          type="password"
          error={isErrPasswdR}
          onChange={(e) => setPwsswordReg(e.target.value)}
        />
        <Button
          className="autoryzacja__button"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Zarejestruj
        </Button>
      </form>
    </div>
  );
}
