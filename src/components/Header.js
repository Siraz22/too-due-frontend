import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar, NavItem } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AuthenticationService from '../apiService/AuthenticationService'
import LoginPage from './LoginPage'
import { AuthenticationContext, AUTHENTICATION_ACTIONS } from '../App'

function Header() {

  const authenticationContext = useContext(AuthenticationContext);

  // console.log("Header")
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
      <Navbar bg="dark" variant="dark" expand="md">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src="logoArrow.png" style={{ height: "40px" }}>
            </img> too-due
          </Navbar.Brand>
          {/* <NavbarToggler onClick={() => setNavbarToggle(!navbarToggle)} /> */}
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
              {AuthenticationService.isLoggedIn() && <Button variant="none" onClick={handleLogout}>Logout</Button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Route path="/login" exact render={
        (props) => (
          <LoginPage
            {...props}
          />
        )
      } />

    </div>
  )
}

export default Header