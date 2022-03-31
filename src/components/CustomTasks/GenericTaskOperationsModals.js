import React, { useContext, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { GenericTaskContext, GENERIC_TASK_ACTIONS } from '../../App'
import { GENERIC_PRIORITY, GENERIC_STATUS } from './GenericTaskComponent'
import { v4 as uuid } from 'uuid'
import APIaxios from '../../apiService/APIaxios'

export const MODAL_OPERATION = {
  ADD_MODAL: 'add_modal',
  EDIT_MODAL: 'edit_modal',
  DELETE_MODAL: 'delete_modal'
}

function GenericTaskOperationsModal(props) {

  const genericTaskContext = useContext(GenericTaskContext)

  function AddModal() {

    console.log("add modal")

    const [taskName, setTaskName] = useState('')
    const [priority, setPriority] = useState(GENERIC_PRIORITY.LOW)
    const [status, setStatus] = useState(GENERIC_STATUS.NOT_STARTED)

    function onAdd() {
      const entry = {
        id: uuid(),
        taskName: taskName,
        priority: priority,
        status: status
      }

      // console.log(entry)
      APIaxios.addGenericTask(entry).then((response) =>
        genericTaskContext.genericTaskDispatch(
          {
            type: GENERIC_TASK_ACTIONS.POST,
            payload: entry
          }
        )
      )
      closeModal();
    }

    function closeModal() {
      props.history.push("/")
    }

    return (
      <React.Fragment>

        <Modal show={true}>
          <Modal.Header>Add a new generic task</Modal.Header>
          <Modal.Body>
            <Form>

              <Form.Group className='mb-3'>
                <legend>Task Name</legend>
                <InputGroup hasValidation>
                  <Form.Control placeholder='A summary of your task'
                    isValid={taskName === '' ? false : true}
                    isInvalid={taskName === '' ? true : false}
                    onChange={(e) => setTaskName(e.target.value)}>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">Task should have a name</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className='mb-3' onClick={(e) => setPriority(e.target.id)}>
                <legend>Priority</legend>
                <Form.Check id={GENERIC_PRIORITY.LOW} defaultChecked={true} type="radio" name="priority" label={GENERIC_PRIORITY.LOW} />
                <Form.Check id={GENERIC_PRIORITY.MODERATE} type="radio" name="priority" label={GENERIC_PRIORITY.MODERATE} />
                <Form.Check id={GENERIC_PRIORITY.HIGH} type="radio" name="priority" label={GENERIC_PRIORITY.HIGH} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <legend>Status</legend>
                <Form.Group onClick={(e) => setStatus(e.target.value)}>
                  <Form.Select type="select">
                    <option>{GENERIC_STATUS.NOT_STARTED}</option>
                    <option>{GENERIC_STATUS.UNDERWAY}</option>
                    <option disabled={true}>{GENERIC_STATUS.COMPLETED}</option>
                  </Form.Select>
                </Form.Group>
              </Form.Group>
              <Button variant="success"
                disabled={taskName === '' ? true : false}
                onClick={onAdd}>
                Add
              </Button>
              {' '}
              <Button onClick={closeModal} variant="danger">
                Cancel
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

      </React.Fragment >
    )
  }

  function DeleteModal() {

    const taskToDelete = props.location.taskEntry

    function closeModal() {
      props.history.push("/")
    }

    function onDelete() {

      APIaxios.deleteGenericTask(taskToDelete.id).then(
        genericTaskContext.genericTaskDispatch(
          {
            type: GENERIC_TASK_ACTIONS.DELETE,
            payload: taskToDelete.id
          }
        )
      )

      closeModal();
    }

    return (
      <Modal show={true}>
        <Modal.Header >Delete Task?</Modal.Header>
        <Modal.Body>
          <legend>Task Summary</legend>
          <ul>
            <li><p style={{ marginBottom: "0rem" }}>{taskToDelete.taskName}</p></li>
            <li><p style={{ marginBottom: "0rem" }}>{taskToDelete.priority}</p></li>
            <li><p style={{ marginBottom: "0rem" }}>{taskToDelete.status}</p></li>
          </ul>
          <Button variant="danger" onClick={onDelete}>Yes</Button>{' '}
          <Button variant="secondary" onClick={closeModal}>No</Button>
        </Modal.Body>
      </Modal>
    )
  }

  function EditModal() {
    const taskToUpdate = props.location.taskEntry

    const [taskName, setTaskName] = useState(taskToUpdate.taskName)
    const [priority, setPriority] = useState(taskToUpdate.priority)
    const [status, setStatus] = useState(taskToUpdate.status)

    function onEdit() {
      const entry = {
        id: taskToUpdate.id,
        taskName: taskName,
        priority: priority,
        status: status
      }

      // console.log(entry)
      APIaxios.updateGenericTask(entry.id, entry).then(
        genericTaskContext.genericTaskDispatch(
          {
            type: GENERIC_TASK_ACTIONS.PUT,
            payload: entry
          }
        ))
      closeModal();
    }

    function closeModal() {
      props.history.push("/")
    }

    return (
      <React.Fragment>

        <Modal show={true}>
          <Modal.Header >Updating generic Task</Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <legend>Task Name</legend>
                <InputGroup hasValidation>
                  <Form.Control value={taskName}
                    isValid={taskName === '' ? false : true}
                    isInvalid={taskName === '' ? true : false}
                    onChange={(e) => setTaskName(e.target.value)}>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">Task should have a name</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" onClick={(e) => setPriority(e.target.id)}
              >
                <legend>Priority</legend>
                <Form.Check id={GENERIC_PRIORITY.LOW}
                  defaultChecked={priority === GENERIC_PRIORITY.LOW ? true : false}
                  type="radio" name="priority" label={GENERIC_PRIORITY.LOW} />
                <Form.Check id={GENERIC_PRIORITY.MODERATE}
                  defaultChecked={priority === GENERIC_PRIORITY.MODERATE ? true : false}
                  type="radio" name="priority" label={GENERIC_PRIORITY.MODERATE} />
                <Form.Check id={GENERIC_PRIORITY.HIGH}
                  defaultChecked={priority === GENERIC_PRIORITY.HIGH ? true : false}
                  type="radio" name="priority" label={GENERIC_PRIORITY.HIGH} />
              </Form.Group>

              <Form.Group className="mb-3">
                <legend>Status</legend>
                <Form.Group onClick={(e) => setStatus(e.target.value)}>
                  <Form.Select type="select">
                    <option>{GENERIC_STATUS.NOT_STARTED}</option>
                    <option>{GENERIC_STATUS.UNDERWAY}</option>
                    <option disabled={true}>{GENERIC_STATUS.COMPLETED}</option>
                  </Form.Select>
                </Form.Group>
              </Form.Group>

              <Button variant="success" onClick={onEdit}
                disabled={taskName === '' ? true : false}
              >
                Edit
              </Button>
              {' '}
              <Button onClick={closeModal} variant="danger">
                Cancel
              </Button>

            </Form>
          </Modal.Body>
        </Modal>

      </React.Fragment >
    )
  }

  function renderFunction() {
    if (props.modalOperation === MODAL_OPERATION.ADD_MODAL) return <AddModal />
    else if (props.modalOperation === MODAL_OPERATION.DELETE_MODAL) return <DeleteModal />
    else if (props.modalOperation === MODAL_OPERATION.EDIT_MODAL) return <EditModal />
  }

  // console.log("Inside Modal Operations");
  // console.log(props)

  return (
    <React.Fragment>
      {renderFunction()}
    </React.Fragment>
  )

}

export default GenericTaskOperationsModal