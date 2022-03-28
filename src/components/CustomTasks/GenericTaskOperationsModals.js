import React, { useContext, useState } from 'react'
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
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

        <Modal isOpen={true}>
          <ModalHeader toggle={closeModal}>Add a new generic task</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <legend>Task Name</legend>
                <Input placeholder='A summary of your task'
                  valid={taskName === '' ? false : true}
                  invalid={taskName === '' ? true : false}
                  onChange={(e) => setTaskName(e.target.value)}>
                </Input>
                <FormFeedback invalid>Task should have a name</FormFeedback>
              </FormGroup>
              <FormGroup onClick={(e) => setPriority(e.target.id)}>
                <legend>Priority</legend>
                <Label> <Input id={GENERIC_PRIORITY.LOW} defaultChecked={true} type="radio" name="priority" /> {GENERIC_PRIORITY.LOW} </Label>
                <br />
                <Label> <Input id={GENERIC_PRIORITY.MODERATE} type="radio" name="priority" /> {GENERIC_PRIORITY.MODERATE} </Label>
                <br />
                <Label> <Input id={GENERIC_PRIORITY.HIGH} type="radio" name="priority" /> {GENERIC_PRIORITY.HIGH} </Label>
              </FormGroup>
              <FormGroup >
                <legend>Status</legend>
                <FormGroup onClick={(e) => setStatus(e.target.value)}>
                  <Input type="select">
                    <option>{GENERIC_STATUS.NOT_STARTED}</option>
                    <option>{GENERIC_STATUS.UNDERWAY}</option>
                    <option disabled={true}>{GENERIC_STATUS.COMPLETED}</option>
                  </Input>
                </FormGroup>
              </FormGroup>
              <Button color="success"
                disabled={taskName === '' ? true : false}
                onClick={onAdd}>
                Add
              </Button>
              {' '}
              <Button onClick={closeModal} color="danger">
                Cancel
              </Button>
            </Form>
          </ModalBody>
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
      <Modal isOpen={true}>
        <ModalHeader toggle={closeModal}>Delete Task?</ModalHeader>
        <ModalBody>
          <legend>Task Summary</legend>
          <ul>
            <li><p style={{ marginBottom: "0rem" }}>{taskToDelete.taskName}</p></li>
            <li><p style={{ marginBottom: "0rem" }}>{taskToDelete.priority}</p></li>
            <li><p style={{ marginBottom: "0rem" }}>{taskToDelete.status}</p></li>
          </ul>
          <Button color="danger" onClick={onDelete}>Yes</Button>{' '}
          <Button color="secondary" onClick={closeModal}>No</Button>
        </ModalBody>
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

        <Modal isOpen={true}>
          <ModalHeader toggle={closeModal}>Updating generic Task</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <legend>Task Name</legend>
                <Input value={taskName}
                  valid={taskName === '' ? false : true}
                  invalid={taskName === '' ? true : false}
                  onChange={(e) => setTaskName(e.target.value)}>
                </Input>
                <FormFeedback invalid>Task should have a name</FormFeedback>

              </FormGroup>

              <FormGroup onClick={(e) => setPriority(e.target.id)}
              >
                <legend>Priority</legend>
                <Label> <Input id={GENERIC_PRIORITY.LOW}
                  defaultChecked={priority === GENERIC_PRIORITY.LOW ? true : false}
                  type="radio" name="priority" /> {GENERIC_PRIORITY.LOW} </Label>
                <br />
                <Label> <Input id={GENERIC_PRIORITY.MODERATE}
                  defaultChecked={priority === GENERIC_PRIORITY.MODERATE ? true : false}
                  type="radio" name="priority" /> {GENERIC_PRIORITY.MODERATE} </Label>
                <br />
                <Label> <Input id={GENERIC_PRIORITY.HIGH}
                  defaultChecked={priority === GENERIC_PRIORITY.HIGH ? true : false}
                  type="radio" name="priority" /> {GENERIC_PRIORITY.HIGH} </Label>
              </FormGroup>

              {/* <FormGroup >
                <legend>Status</legend>
                <FormGroup onClick={(e) => setStatus(e.target.value)}>
                  <Input type="select">
                    <option>{GENERIC_STATUS.NOT_STARTED}</option>
                    <option>{GENERIC_STATUS.UNDERWAY}</option>
                    <option disabled={true}>{GENERIC_STATUS.COMPLETED}</option>
                  </Input>
                </FormGroup>
              </FormGroup> */}

              <Button color="success" onClick={onEdit}
                disabled={taskName === '' ? true : false}
              >
                Edit
              </Button>
              {' '}
              <Button onClick={closeModal} color="danger">
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>

      </React.Fragment >
    )
  }

  function renderFunction() {
    if (props.modalOperation === MODAL_OPERATION.ADD_MODAL) return <AddModal />
    else if (props.modalOperation === MODAL_OPERATION.DELETE_MODAL) return <DeleteModal />
    else if (props.modalOperation === MODAL_OPERATION.EDIT_MODAL) return <EditModal />
  }

  console.log("Inside Modal Operations");
  console.log(props)

  return (
    <React.Fragment>
      {renderFunction()}
    </React.Fragment>
  )

}

export default GenericTaskOperationsModal