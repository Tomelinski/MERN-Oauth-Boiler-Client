import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import MainNav from "./navigation/mainNav";
import Home from "./pages/home";
import Profile from "./user/profile";
import Login from "./user/login";
import LoginSuccess from "./user/loginSuccess";
import Register from "./user/register";
import axios from "axios";
import { AuthContext } from "./context/auth-context";

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [userData, setUserData] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((user, token, expirationDate) => {
    setToken(token);
    setUserData(user);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userData: user,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserData(null);
    setTokenExpirationDate(null);
    axios.get("http://localhost:8080/auth/logout");
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userData,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/login/success" exact>
          <LoginSuccess />
        </Route>
        <Route path="/auth/google" exact></Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token,
          userData,
          login,
          logout,
        }}
      >
        <MainNav />
        <BrowserRouter>{routes}</BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
