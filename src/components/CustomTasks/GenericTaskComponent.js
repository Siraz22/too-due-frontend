import React, { useContext, useState } from 'react'
import { Button, ToggleButton, Dropdown, Table } from 'react-bootstrap'
import { GenericTaskContext, GENERIC_TASK_ACTIONS } from '../../App'
import { FcAddRow } from "react-icons/fc";
import { Switch, Route, Link } from 'react-router-dom'
import GenericTaskOperationsModal from './GenericTaskOperationsModals';
import { MODAL_OPERATION } from './GenericTaskOperationsModals';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useEffect } from 'react';
import APIaxios from '../../apiService/APIaxios';
import { FcCollapse, FcExpand } from 'react-icons/fc'
import AuthenticatedRoute from '../AuthenticatedRoute';

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
  const [sortingString, setSortingString] = useState('name')
  const [ascendingSort, setSortingOrder] = useState(false)
  let sortedTaskList = [];

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

      sortedTaskList = [...genericTaskContext.genericTaskState]
      //console.log(sortedTaskList);

      if (sortingString === 'name') {
        sortedTaskList.sort((task1, task2) => {
          if (task1.taskName < task2.taskName) {
            return -1 * (ascendingSort === true ? 1 : -1);
          }
          if (task1.taskName > task2.taskName) {
            return 1 * (ascendingSort === true ? 1 : -1);
          }
          return 0;
        })
      }
      else if (sortingString === 'priority') {

        let arr = [GENERIC_PRIORITY.LOW, GENERIC_PRIORITY.MODERATE, GENERIC_PRIORITY.HIGH];

        sortedTaskList.sort((task1, task2) => {
          if (arr.indexOf(task1.priority) < arr.indexOf(task2.priority)) {
            return -1 * (ascendingSort === true ? 1 : -1);
          }
          if (arr.indexOf(task1.priority) > arr.indexOf(task2.priority)) {
            return 1 * (ascendingSort === true ? 1 : -1);
          }
          return 0;
        })

        //console.log(arr.indexOf("Low"));
      }
      else if (sortingString === 'status') {

        let arr = [GENERIC_STATUS.NOT_STARTED, GENERIC_STATUS.UNDERWAY, GENERIC_STATUS.COMPLETED];

        sortedTaskList.sort((task1, task2) => {
          if (arr.indexOf(task1.status) < arr.indexOf(task2.status)) {
            return -1 * (ascendingSort === true ? 1 : -1);
          }
          if (arr.indexOf(task1.status) > arr.indexOf(task2.status)) {
            return 1 * (ascendingSort === true ? 1 : -1);
          }
          return 0;
        })
      }

      //console.log(sortedTaskList);

      tempTaskList = sortedTaskList.map((genericTask) => {
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

      <div className="table-responsive">
        <Table hover style={{
          textAlign: "center"
        }}>
          <thead>
            <tr>
              <th></th>

              <th><Button variant='none' onClick={() => {
                setSortingString('name');
                setSortingOrder(prevState => !prevState);
              }}> <strong>Task</strong> {ascendingSort === true ? <FcCollapse /> : <FcExpand />}</Button></th>

              <th><Button variant='none' onClick={() => {
                setSortingString('priority');
                setSortingOrder(prevState => !prevState);
              }}><strong>Priority</strong> {ascendingSort === true ? <FcCollapse /> : <FcExpand />}</Button></th>

              <th><Button variant='none' onClick={() => {
                setSortingString('status');
                setSortingOrder(prevState => !prevState);
              }}><strong>Status</strong> {ascendingSort === true ? <FcCollapse /> : <FcExpand />}</Button></th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderGenericTasks()}
            <tr>
              <td>

                <Link to="/generic/add">
                  <Button variant='none'>
                    <FcAddRow fontSize={42} />
                  </Button>
                </Link>

              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* {console.log("inside generic task switch route")} */}

      <Switch>
        <AuthenticatedRoute exact path="/generic/add" render={
          (props) => (
            <GenericTaskOperationsModal
              {...props}
              modalOperation={MODAL_OPERATION.ADD_MODAL}
            />
          )
        } />
        <AuthenticatedRoute path="/generic/delete/:id" render={
          (props) => (
            <GenericTaskOperationsModal
              {...props}
              modalOperation={MODAL_OPERATION.DELETE_MODAL}
            />
          )
        }
        />
        <AuthenticatedRoute path="/generic/edit/:id" render={
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
  // const [genericTaskDropdownOpen, setStatusToggle] = useState()
  const [genericStatusValue, setStatusValue] = useState(status)
  const [completionBool, setCompletionBool] = useState(status === GENERIC_STATUS.COMPLETED ? true : false)

  function DoneButton() {

    const genericTaskContext = useContext(GenericTaskContext)

    function doneToggle() {

      setCompletionBool(prevState => !prevState)

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
        <ToggleButton variant='none' onClick={doneToggle}>
          <img src={completionBool ? 'logoArrow.png' : 'logoArrowIncomplete.png'} style={{ height: "30px" }} />
        </ToggleButton>
      </React.Fragment >
    )
  }

  function Priority() {

    const [color, setColor] = useState()

    function fetchColor(passedPriority) {
      //console.log(passedPriority)
      if (passedPriority === GENERIC_PRIORITY.HIGH) setColor("danger");
      else if (passedPriority === GENERIC_PRIORITY.MODERATE) setColor("warning");
      else setColor("info");
    }

    useEffect(() => {
      fetchColor(priority);
    }, [])
    //fetchColor(priority);

    return (
      <React.Fragment>
        <Button variant={color}>{priority}</Button>
      </React.Fragment>
    )
  }

  function Status() {

    const genericTaskContext = useContext(GenericTaskContext)
    const [color, setColor] = useState()

    function fetchColor(passedStatus) {
      //console.log(passedPriority)
      if (passedStatus === GENERIC_STATUS.NOT_STARTED) setColor("secondary");
      else if (passedStatus === GENERIC_STATUS.UNDERWAY) setColor("warning");
      else setColor("success");
    }

    useEffect(() => {
      fetchColor(status);
    }, [])

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
        <Dropdown >
          <Dropdown.Toggle disabled={completionBool} variant={color}>
            {genericStatusValue}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* <Dropdown.Item onClick={(e) => setStatusValue(e.currentTarget.textContent)}>{GENERIC_STATUS.NOT_STARTED}</Dropdown.Item>
            <Dropdown.Item onClick={(e) => setStatusValue(e.currentTarget.textContent)}>{GENERIC_STATUS.UNDERWAY}</Dropdown.Item> */}

            <Dropdown.Item onClick={(e) => changedStatus(e.currentTarget.textContent)}>{GENERIC_STATUS.NOT_STARTED}</Dropdown.Item>
            <Dropdown.Item onClick={(e) => changedStatus(e.currentTarget.textContent)}>{GENERIC_STATUS.UNDERWAY}</Dropdown.Item>

            <Dropdown.Item disabled>{GENERIC_STATUS.COMPLETED}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    )
  }

  function ActionButtons() {
    return (
      <React.Fragment>

        <Link to={{
          pathname: `generic/delete/${id}`,
          taskEntry: { ...props.taskEntry }
        }}>
          <i><FaTrashAlt color="maroon" fontSize={20} /></i>
        </Link>{' '}

        <Link to={{
          pathname: `generic/edit/${id}`,
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