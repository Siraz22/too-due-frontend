import React, { useState } from 'react'
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'

function Header() {

  const [navbarToggle, setNavbarToggle] = useState(false)

  return (
    <div style={{ paddingBottom: "20px" }}>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <img src="logoArrow.png" style={{ height: "40px" }}>
          </img> too-due
        </NavbarBrand>
        <NavbarToggler onClick={() => setNavbarToggle(!navbarToggle)} />
        <Collapse isOpen={navbarToggle} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Overview</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Users (siraz22)
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  Siraz
                </DropdownItem>
                <DropdownItem>
                  User 2
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Header