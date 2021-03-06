import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import GenericTaskComponent from './CustomTasks/GenericTaskComponent'
import InterviewbitTaskComponent from './InterviewBitTasks/InterviewbitTaskComponent'
import { FaGithub } from 'react-icons/fa'
import { Switch, Link, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

function TaskList() {

  //console.log("Taskbar")

  const [dropdownValue, setDropdownValue] = useState("Generic Tasks")

  return (
    < div className="row" >
      <div className="col-8">

        <Dropdown>
          <Dropdown.Toggle variant="btn btn-outline-dark">
            {dropdownValue}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={"/generic"} onClick={(e) => setDropdownValue(e.currentTarget.textContent)}>Generic Tasks</Dropdown.Item >
            <Dropdown.Item as={Link} to={"/interviewbit"} onClick={(e) => setDropdownValue(e.currentTarget.textContent)}>Interviewbit</Dropdown.Item>
          </Dropdown.Menu>
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


        <Switch>

          <Route path="/" exact>
            <Redirect to="/generic" />
            <GenericTaskComponent />
          </Route>

          <Route path="/generic">
            <GenericTaskComponent />
          </Route>
          <Route path="/interviewbit">
            <InterviewbitTaskComponent />
          </Route>

        </Switch>

      </div>

    </div >
  )
}

export default TaskList