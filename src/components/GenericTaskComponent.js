import React, { useContext, useState } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from 'reactstrap'
import { GenericTaskContext } from '../App'

function Priority({ priorityPassed }) {
  return (
    <React.Fragment>
      <Button color="danger">{priorityPassed}</Button>
    </React.Fragment>
  )
}

function Status({ statusPassed }) {

  const [genericTaskDropdownOpen, setStatus] = useState()
  const [genericTaskValue, setStatusValue] = useState(statusPassed)

  return (
    <React.Fragment>
      <Dropdown isOpen={genericTaskDropdownOpen} toggle={() => setStatus(!genericTaskDropdownOpen)}>
        <DropdownToggle color='success' caret>
          {genericTaskValue}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={(e) => setStatusValue(e.currentTarget.textContent)}>Not Started</DropdownItem>
          <DropdownItem onClick={(e) => setStatusValue(e.currentTarget.textContent)}>Underway</DropdownItem>
          <DropdownItem onClick={(e) => setStatusValue(e.currentTarget.textContent)}>Complete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

function GenericTaskComponent(props) {

  const genericTaskContext = useContext(GenericTaskContext)

  function RenderGenericTasks() {

    let tempTaskList = genericTaskContext.genericTaskState.map((genericTask) => {
      return (
        <React.Fragment key={genericTask.id}>
          {/* <GenericTaskComponent /> */}
          <tr key={genericTask.id}>
            <th className="align-middle">{genericTask.id}</th>
            <td className="align-middle">{genericTask.task}</td>
            <td className="align-middle"><Priority priorityPassed={genericTask.priority} /></td>
            <td className="align-middle"><Status statusPassed={genericTask.status} /></td>
            <td className="align-middle">{genericTask.progress}%</td>
          </tr>
        </React.Fragment>
      )
    })

    return tempTaskList;
  }

  return (
    <React.Fragment>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          <RenderGenericTasks />
        </tbody>
      </Table>

    </React.Fragment>
  )
}

export default GenericTaskComponent;