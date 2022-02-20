import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import GenericTaskComponent from './GenericTaskComponent'
import { FaGithub } from 'react-icons/fa'

function TaskList() {

  const [dropdownOpen, setToggle] = useState(false)
  const [dropdownValue, setDropdownValue] = useState("Generic Tasks")

  return (
    < div className="row " >
      <div className="col-8">
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
      </div>
      <div className="col-4">
        <FaGithub fontSize={22} />{' '}
        <text>Join to contribute and learn?</text>{' '}

        <a className="text-decoration-none" href="https://github.com/Siraz22/too-due-frontend">Frontend
        </a>
        <text> or </text>
        <a className="text-decoration-none" href="https://github.com/Siraz22/too-due-backend">Backend
        </a>

      </div>

      <div style={{
        paddingTop: "30px"
      }}>
        <GenericTaskComponent />
      </div>

    </div >
  )
}

export default TaskList