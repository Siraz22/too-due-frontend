import React, { useContext, useState } from 'react'
import { Button, ButtonToggle, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from 'reactstrap'
import { GenericTaskContext, GENERIC_TASK_ACTIONS } from '../../App'
import { FcAddRow } from "react-icons/fc";
import { BrowserRouter as Switch, Link, Route } from 'react-router-dom'
import GenericTaskOperationsModal from './GenericTaskOperationsModals';
import { MODAL_OPERATION } from './GenericTaskOperationsModals';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useEffect } from 'react';
import APIaxios from '../../apiService/APIaxios';

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

  useEffect(() => {
    //use this to call the Get API call and update the state
    APIaxios.getGenericTasks().then((response) =>
      genericTaskContext.genericTaskDispatch({
        type: GENERIC_TASK_ACTIONS.GET,
        payload: response.data
      })
    )
  }, [])

  function renderGenericTasks() {

    let tempTaskList = [];
    if (genericTaskContext.genericTaskState.length > 0) {
      tempTaskList = genericTaskContext.genericTaskState.map((genericTask) => {
        return (
          <React.Fragment key={genericTask.id}>
            <GenericTaskEntry taskEntry={genericTask} />
          </React.Fragment>
        )
      })
    }

    return tempTaskList;
  }

  return (
    <React.Fragment>

      <Switch>

        <div className="table-responsive">
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
        </div>

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

  const { id, taskName, priority, status } = props.taskEntry
  const [genericTaskDropdownOpen, setStatusToggle] = useState()
  const [genericStatusValue, setStatusValue] = useState(status)
  const [completionBool, setCompletionBool] = useState(status === GENERIC_STATUS.COMPLETED ? true : false)

  function DoneButton() {

    const genericTaskContext = useContext(GenericTaskContext)

    function doneToggle() {

      setCompletionBool(prevState => !prevState)

      //console.log(completionBool)

      const taskBeingToggled = {
        id: props.taskEntry.id,
        priority: props.taskEntry.priority,
        status: completionBool ? GENERIC_STATUS.NOT_STARTED : GENERIC_STATUS.COMPLETED,
        taskName: props.taskEntry.taskName
      }

      setStatusValue(completionBool ? GENERIC_STATUS.NOT_STARTED : GENERIC_STATUS.COMPLETED)

      //console.log(taskBeingToggled)

      APIaxios.updateGenericTask(taskBeingToggled.id, taskBeingToggled).then(
        genericTaskContext.genericTaskDispatch(
          {
            type: GENERIC_TASK_ACTIONS.PUT,
            payload: taskBeingToggled
          }
        )
      )

      //NOTE : any changes done to the useState variables will not be updated till this function ends
      //hence value of completionBool stays false even if updated with toggleCompletion.
      //It's updated once this local function ends

      //To be able to use updated value of completion bool, instead of toggleCompletion(!completionBool),
      //it is advised to use functional passing method for state updation like toggleCompletion(prevState => !prevState)
      //Then, completionBool will be updated for consequent use
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

    const genericTaskContext = useContext(GenericTaskContext)

    function changedStatus(statusPassed) {
      const newTaskEntry = {
        id: props.taskEntry.id,
        taskName: props.taskEntry.taskName,
        status: statusPassed,
        priority: props.taskEntry.priority
      }

      //console.log(statusPassed)
      setStatusValue(statusPassed)

      APIaxios.updateGenericTask(props.taskEntry.id, newTaskEntry).then(
        genericTaskContext.genericTaskDispatch({
          type: GENERIC_TASK_ACTIONS.PUT,
          payload: newTaskEntry
        })
      )
    }

    return (
      <React.Fragment>
        <Dropdown isOpen={genericTaskDropdownOpen} toggle={() => setStatusToggle(!genericTaskDropdownOpen)}>
          <DropdownToggle disabled={completionBool} color='success' caret>
            {genericStatusValue}
          </DropdownToggle>
          <DropdownMenu>
            {/* <DropdownItem onClick={(e) => setStatusValue(e.currentTarget.textContent)}>{GENERIC_STATUS.NOT_STARTED}</DropdownItem>
            <DropdownItem onClick={(e) => setStatusValue(e.currentTarget.textContent)}>{GENERIC_STATUS.UNDERWAY}</DropdownItem> */}

            <DropdownItem onClick={(e) => changedStatus(e.currentTarget.textContent)}>{GENERIC_STATUS.NOT_STARTED}</DropdownItem>
            <DropdownItem onClick={(e) => changedStatus(e.currentTarget.textContent)}>{GENERIC_STATUS.UNDERWAY}</DropdownItem>

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
        <td className="align-middle">{taskName}</td>
        <td className="align-middle"><Priority /></td>
        <td className="align-middle"><Status /></td>
        <td className="align-middle"><ActionButtons /></td>
      </tr>
    </React.Fragment>
  )

}

export default GenericTaskComponent;