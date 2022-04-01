import React, { useContext, useState } from 'react'
import { Button, Modal, Form, InputGroup } from 'react-bootstrap'
import AuthenticationService from '../apiService/AuthenticationService';
import { AuthenticationContext, AUTHENTICATION_ACTIONS } from '../App';

function LoginPage(props) {

  const authenticationContext = useContext(AuthenticationContext);

  const [show, setShow] = useState(true);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClose = () => {
    setShow(false);
    console.log(props.history.push("/"))
  }

  const handleLogin = () => {
    //an attempt has been made to log in
    console.log(username + "," + password)

    //hardcoded
    if (username === 'siraz' && password === 'password123') {
      AuthenticationService.successfulLogin(username);
      authenticationContext.authenticationDispatch(
        {
          type: AUTHENTICATION_ACTIONS.LOGIN
        }
      );
      handleClose();
    }
    else {
      console.log("Login Failed")
    }
  }

  console.log("Login Page")
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <InputGroup hasValidation>
                <Form.Control type="email" onChange={(e) => setUsername(e.target.value)} placeholder="Enter email"
                  isInvalid={username === '' ? true : false}
                  isValid={username === '' ? false : true} />
                <Form.Control.Feedback type="invalid">
                  Username is empty
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Continue as Guest
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LoginPage