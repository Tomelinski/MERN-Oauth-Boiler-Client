import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useContext, useState } from "react";
import axios from "axios";

import { AuthContext } from "../context/auth-context";
//import { authenticate } from "passport";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const auth = useContext(AuthContext);

  const loginUser = async (credentials) => {
    console.log(credentials);
    return fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  };

  const loginGoogle = async () => {
    const response = await axios
      .get("http://localhost:8080/auth/user", {
        withCredentials: true,
      })
      .catch((err) => {
        console.log("An Error has occured while authenticating");
      });

    if (response && response.data) {
      //console.log("user: " + response.data);
      //const username = response.data._id;
      auth.login(response.data, response.data._id);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("login");
    try {
      const token = await loginUser({ username, password });

      auth.login({ username, password }, token);
    } catch (err) {
      console.log(err);
    }
  };

  const redirectToGoogle = async () => {
    let timer;
    const googleLoginURL = "http://localhost:8080/auth/google";
    const newWindow = window.open(
      googleLoginURL,
      "_black",
      "width=500, height=600"
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Auth Success");

          loginGoogle();

          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <div className="row">
      <div className="offset-md-3 col-md-6 col-sm-12 mt-3">
        <h1>Login</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your profile with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <div className="mt-4">
          <Button variant="primary" type="button" onClick={redirectToGoogle}>
            Login with Google
          </Button>
        </div>
        <div>
          <p>
            Don't Have an account? <a href="/Register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
