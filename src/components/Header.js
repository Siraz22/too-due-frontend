import React from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'

function Header() {
  return (
    <div>
      <Navbar expand="sm" light>
        <NavbarBrand href="/">too-due</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/">Overview</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Users (Incomplete)
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