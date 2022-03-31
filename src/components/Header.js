import React, { useState } from 'react'
import { Container, Form, Nav, Navbar, NavItem, NavLink } from 'react-bootstrap'

function Header() {

  const [navbarToggle, setNavbarToggle] = useState(false)

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
                <Navbar.Text>Hello, Guest</Navbar.Text>
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
              <Nav.Link href="/">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header