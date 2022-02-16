import React from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'

function Header() {
  return (
    <div style={{ paddingBottom: "20px" }}>
      <Navbar color="dark" dark expand="sm">

        <NavbarBrand href="/">
          <img src="logoArrow.png" style={{ height: "40px" }}>
          </img> too-due
        </NavbarBrand>
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
      </Navbar>
    </div>
  )
}

export default Header