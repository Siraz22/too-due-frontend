import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { GenericTaskContext, GENERIC_TASK_ACTIONS } from '../App'
import { GENERIC_PRIORITY, GENERIC_STATUS } from './GenericTaskComponent'

export const MODAL_OPERATION = {
  ADD_MODAL: 'add_modal',
  EDIT_MODAL: 'edit_modal',
  DELETE_MODAL: 'delete_modal'
}

function GenericTaskOperationsModal(props) {

  const genericTaskContext = useContext(GenericTaskContext)

  function AddModal() {

    const [taskName, setTaskName] = useState()
    const [priority, setPriority] = useState()
    const [status, setStatus] = useState()

    function onAdd() {
      const entry = {
        id: '4',
        task: taskName,
        priority: priority,
        status: status
      }

      // console.log(entry)
      genericTaskContext.genericTaskDispatch(
        {
          type: GENERIC_TASK_ACTIONS.POST,
          payload: entry
        }
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
                  onChange={(e) => setTaskName(e.target.value)}>
                </Input>
              </FormGroup>
              <FormGroup onClick={(e) => setPriority(e.target.id)}>
                <legend>Priority</legend>
                <Label> <Input id={GENERIC_PRIORITY.LOW} type="radio" name="priority" /> {GENERIC_PRIORITY.LOW} </Label>
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
              <Button color="success" onClick={onAdd}>
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
    return (
      <React.Fragment>
        <Modal>
          delete modal
        </Modal>
      </React.Fragment>
    )
  }

  function EditModal() {
    return (
      <React.Fragment>
        edit modal
      </React.Fragment>
    )
  }


  function renderFunction() {
    if (props.modalOperation == MODAL_OPERATION.ADD_MODAL) return <AddModal />
  }

  return (
    <React.Fragment>
      {renderFunction()}
    </React.Fragment>
  )

}

export default GenericTaskOperationsModal