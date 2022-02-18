import React, { useContext, useState } from 'react'
import { Button, ButtonToggle, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from 'reactstrap'
import { GenericTaskContext } from '../App'
import { FcAddRow } from "react-icons/fc";
import { BrowserRouter as Switch, Link, Route } from 'react-router-dom'
import GenericTaskOperationsModal from './GenericTaskOperationsModals';
import { MODAL_OPERATION } from './GenericTaskOperationsModals';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

export const GENERIC_STATUS = {
  NOT_STARTED: 'Not Started',
  UNDERWAY: 'Underway',
  COMPLETED: 'Completed'
}

export const GENERIC_PRIORITY = {
  LOW: 'Low',
  MODERATE: 'Moderate',
  HIGH: 'High'
}

function GenericTaskComponent(props) {

  const genericTaskContext = useContext(GenericTaskContext)

  function renderGenericTasks() {

    let tempTaskList = genericTaskContext.genericTaskState.map((genericTask) => {
      return (
        <React.Fragment key={genericTask.id}>
          <GenericTaskEntry taskEntry={genericTask} />
        </React.Fragment>
      )
    })

    return tempTaskList;
  }

  return (
    <React.Fragment>

      <Switch>

        <Table hover style={{
          textAlign: "center"
        }}>
          <thead>
            <tr>
              <th></th>
              <th>Task</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderGenericTasks()}
            <tr>
              <td>

                <Link to="/add">
                  <Button color='none'>
                    <FcAddRow fontSize={42} />
                  </Button>
                </Link>

              </td>
            </tr>
          </tbody>
        </Table>

        <Route path="/add" exact render={
          (props) => (
            <GenericTaskOperationsModal
              {...props}
              modalOperation={MODAL_OPERATION.ADD_MODAL}
            />
          )
        } />
        <Route path="/delete/:id" exact render={
          (props) => (
            <GenericTaskOperationsModal
              {...props}
              modalOperation={MODAL_OPERATION.DELETE_MODAL}
            />
          )
        }
        />
        <Route path="/edit/:id" exact render={
          (props) => (
            <GenericTaskOperationsModal
              {...props}
              modalOperation={MODAL_OPERATION.EDIT_MODAL}
            />
          )
        } />
      </Switch>
    </React.Fragment >
  )
}

//This represents each entry with it's own local variables
function GenericTaskEntry(props) {

  const { id, task, priority, status } = props.taskEntry
  const [genericTaskDropdownOpen, setStatusToggle] = useState()
  const [genericTaskValue, setStatusValue] = useState(status)
  const [completionBool, toggleCompletion] = useState(false)

  function DoneButton() {
    function doneToggle() {

      //NOTE : any changes done to the useState variables will not be updated till this function ends
      //hence value of completionBool stays false even if updated with toggleCompletion.
      //It's updated once this local function ends

      toggleCompletion(prevState => !prevState)

      //To be able to use updated value of completion bool, instead of toggleCompletion(!completionBool),
      //it is advised to use functional passing method for state updation like toggleCompletion(prevState => !prevState)
      //Then, completionBool will be updated for consequent use
      if (!completionBool) {
        setStatusValue(GENERIC_STATUS.COMPLETED)
      }
      else {
        setStatusValue(GENERIC_STATUS.NOT_STARTED)
      }
    }

    return (
      < React.Fragment >
        <ButtonToggle color='none' onClick={doneToggle}>
          <img src={completionBool ? 'logoArrow.png' : 'logoArrowIncomplete.png'} style={{ height: "30px" }} />
        </ButtonToggle>
      </React.Fragment >
    )
  }

  function Priority() {
    return (
      <React.Fragment>
        <Button color="danger">{priority}</Button>
      </React.Fragment>
    )
  }

  function Status() {
    return (
      <React.Fragment>
        <Dropdown isOpen={genericTaskDropdownOpen} toggle={() => setStatusToggle(!genericTaskDropdownOpen)}>
          <DropdownToggle disabled={completionBool} color='success' caret>
            {genericTaskValue}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={(e) => setStatusValue(e.currentTarget.textContent)}>{GENERIC_STATUS.NOT_STARTED}</DropdownItem>
            <DropdownItem onClick={(e) => setStatusValue(e.currentTarget.textContent)}>{GENERIC_STATUS.UNDERWAY}</DropdownItem>
            <DropdownItem disabled>{GENERIC_STATUS.COMPLETED}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    )
  }

  function ActionButtons() {
    return (
      <React.Fragment>

        <Link to={{
          pathname: `delete/${id}`,
          taskEntry: { ...props.taskEntry }
        }}>
          <i><FaTrashAlt color="maroon" fontSize={20} /></i>
        </Link>{' '}

        <Link to={{
          pathname: `edit/${id}`,
          taskEntry: { ...props.taskEntry }
        }}>
          <i><FaEdit color="gray" fontSize={20} /></i>
        </Link>

      </React.Fragment >
    )
  }

  return (
    <React.Fragment>
      <tr>
        <th className="align-middle"><DoneButton /></th>
        <td className="align-middle">{task}</td>
        <td className="align-middle"><Priority /></td>
        <td className="align-middle"><Status /></td>
        <td className="align-middle"><ActionButtons /></td>
      </tr>
    </React.Fragment>
  )

}

export default GenericTaskComponent;