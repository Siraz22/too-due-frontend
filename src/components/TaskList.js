import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import GenericTaskComponent from './GenericTaskComponent'


function TaskList() {

  const [dropdownOpen, setToggle] = useState(false)
  const [dropdownValue, setDropdownValue] = useState("Generic Tasks")

  return (
    < div className="row " >
      <Dropdown isOpen={dropdownOpen} toggle={() => setToggle(!dropdownOpen)}>
        <DropdownToggle caret color="btn btn-outline-dark">
          {dropdownValue}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Select List Type</DropdownItem>
          <DropdownItem onClick={(e) => setDropdownValue(e.currentTarget.textContent)}>Generic Tasks</DropdownItem>
          <DropdownItem onClick={(e) => setDropdownValue(e.currentTarget.textContent)}>Interviewbit</DropdownItem>
          <DropdownItem onClick={(e) => setDropdownValue(e.currentTarget.textContent)}>Investments</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <div style={{
        paddingTop: "10px"
      }}>
        <GenericTaskComponent />
      </div>

    </div >
  )
}

export default TaskList