import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar, NavItem } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AuthenticationService from '../apiService/AuthenticationService'
import LoginPage from './LoginPage'
import { AuthenticationContext, AUTHENTICATION_ACTIONS } from '../App'
import { Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

function Header() {

  const authenticationContext = useContext(AuthenticationContext);

  //console.log("Header")
  // console.log(authenticationContext)

  function handleLogout() {
    AuthenticationService.logout();
    authenticationContext.authenticationDispatch(
      {
        type: AUTHENTICATION_ACTIONS.LOGOUT
      }
    )
  }

  return (
    <div style={{ paddingBottom: "20px" }}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img src="logoArrow.png" style={{ height: "40px" }}>
            </img> too-due
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
            >
              <NavItem>
                <Navbar.Text>Hello, {AuthenticationService.getUsername()}</Navbar.Text>
              </NavItem>
              {/* <NavDropdown title="User">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              {!AuthenticationService.isLoggedIn() && <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>}
              {AuthenticationService.isLoggedIn() && <Button variant="danger" onClick={handleLogout}>Logout</Button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>

        {AuthenticationService.isLoggedIn() && <Route path="/login" exact>
          <Redirect to="/generic" />
        </Route>}

        <Route path="/login" exact render={
          (props) => (
            <LoginPage
              {...props}
            />
          )
        } />
      </Switch>

    </div>
  )
}

export default Header