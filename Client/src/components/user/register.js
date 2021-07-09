import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const Register = () => {
  const [isValid, setIsValid] = useState(true);

  const checkValid = () => {};

  return (
    <div className="row">
      <div className="offset-md-3 col-md-6 col-sm-12 mt-3">
        <h2>Register</h2>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <div>
          <p>
            Register an account with <a href="/auth/google">Google here</a>
          </p>
        </div>
        <div>
          <p>
            Have an account? <a href="/Login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
