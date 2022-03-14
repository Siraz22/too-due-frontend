import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import GenericTaskComponent from './CustomTasks/GenericTaskComponent'
import InterviewbitTaskComponent from './InterviewBitTasks/InterviewbitTaskComponent'
import { FaGithub } from 'react-icons/fa'
import { BrowserRouter as Switch, Link, Route } from 'react-router-dom'

function TaskList() {

  const [dropdownOpen, setToggle] = useState(false)
  const [dropdownValue, setDropdownValue] = useState("Generic Tasks")

  return (
    < div className="row " >
      <Switch>
        <div className="col-8">

          <Dropdown isOpen={dropdownOpen} toggle={() => setToggle(!dropdownOpen)}>
            <DropdownToggle caret color="btn btn-outline-dark">
              {dropdownValue}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Select List Type</DropdownItem>
              <Link className="text-decoration-none" to="/generic">
                <DropdownItem onClick={(e) => setDropdownValue(e.currentTarget.textContent)}>Generic Tasks</DropdownItem>
              </Link>
              <Link className="text-decoration-none" to="/interviewbit">
                <DropdownItem onClick={(e) => setDropdownValue(e.currentTarget.textContent)}>Interviewbit</DropdownItem>
              </Link>
              <Link className="text-decoration-none" to="/investments">
                <DropdownItem onClick={(e) => setDropdownValue(e.currentTarget.textContent)}>Investments</DropdownItem>
              </Link>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="col-4">
          <FaGithub fontSize={22} />{' '}
          <p style={{ marginBottom: "0" }}>Join to contribute and learn?</p>{' '}

          <a className="text-decoration-none" href="https://github.com/Siraz22/too-due-frontend">Frontend
          </a>
          {' '}or{' '}
          <a className="text-decoration-none" href="https://github.com/Siraz22/too-due-backend">Backend
          </a>

        </div>

        <div style={{
          paddingTop: "30px"
        }}>

          <Route exact path="/">
            <GenericTaskComponent />
          </Route>
          <Route exact path="/generic">
            <GenericTaskComponent />
          </Route>
          <Route exact path="/interviewbit">
            <InterviewbitTaskComponent />
          </Route>

        </div>
      </Switch>

    </div >
  )
}

export default TaskList