import React, { useContext, useState } from 'react';
import APIaxios from '../../apiService/APIaxios';
import { v4 as uuid } from 'uuid'
import { InterviewbitTaskContext, INTERVIEWBIT_TASK_ACTIONS } from '../../App';
import { MODAL_OPERATION } from '../CustomTasks/GenericTaskOperationsModals';
import { Button, Form, InputGroup, Modal, ModalBody, ModalHeader } from 'react-bootstrap'

function InterviewbitTaskOperationsModal(props) {

  const interviewbitTaskContext = useContext(InterviewbitTaskContext);

  function closeModal() {
    props.history.push("/interviewbit");
  }

  function AddModal() {

    const [question, setQuestionName] = useState('')
    const [difficulty, setDifficulty] = useState('Easy')
    const [link, setLink] = useState('')
    //const [completed, setCompletionBool] = useState(false)
    const [topic, setTopic] = useState('Arrays')

    function onAdd() {
      const entry = {
        id: uuid(),
        question: question,
        difficulty: difficulty,
        link: link,
        notes: '',
        completed: false,
        topic: topic
      }

      APIaxios.addInterviewbitTask(entry).then(
        interviewbitTaskContext.interviewbitTaskDispatch(
          {
            type: INTERVIEWBIT_TASK_ACTIONS.POST,
            payload: entry
          }
        )
      )
      closeModal();
    }

    return (
      <React.Fragment>
        <Modal show={true}>
          <ModalHeader toggle={closeModal}>Add a Question</ModalHeader>
          <ModalBody>
            <Form>

              <Form.Group className="mb-3">
                <legend>Task Name</legend>
                <InputGroup hasValidation>
                  <Form.Control placeholder='Question name on Interviewbit'
                    isValid={question === '' ? false : true}
                    isInvalid={question === '' ? true : false}
                    onChange={(e) => setQuestionName(e.target.value)}>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">Question name is empty</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>


              <Form.Group className="mb-3">
                <legend>Link</legend>
                <InputGroup hasValidation>
                  <Form.Control placeholder='Question Link'
                    isValid={link === '' ? false : true}
                    isInvalid={link === '' ? true : false}
                    onChange={(e) => setLink(e.target.value)}>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">Link is empty</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" onClick={(e) => setDifficulty(e.target.id)}>
                <legend>Difficulty</legend>
                <Form.Check id={"Very Easy"} defaultChecked={true} type="radio" name="difficulty" label="Very Easy" />
                <Form.Check id={"Easy"} type="radio" name="difficulty" label="Easy" />
                <Form.Check id={"Medium"} type="radio" name="difficulty" label="Medium" />
                <Form.Check id={"Hard"} type="radio" name="difficulty" label="Hard" />
              </Form.Group>


              <Form.Group className="mb-3" >
                <legend>Topic</legend>
                <Form.Group onClick={(e) => setTopic(e.target.value)}>
                  <Form.Select type="select">
                    <option>Arrays</option>
                    <option>Math</option>
                    <option>Binary Search</option>
                    <option>Strings</option>
                    <option>Bit Manipulation</option>
                    <option>Two Pointers</option>
                    <option>Linked Lists</option>
                    <option>Stacks and Queues</option>
                    <option>Backtracking</option>
                    <option>Heaps and Maps</option>
                    <option>Tree Data Structure</option>
                    <option>Dynamic Programming</option>
                    <option>Greedy Algorithm</option>
                    <option>Graph Data Structure</option>
                  </Form.Select>
                </Form.Group>
              </Form.Group>

              <Button variant="success" disabled={question === '' || link === ''} onClick={onAdd}>
                Add
              </Button>
              {' '}
              <Button onClick={closeModal} variant="danger">
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }

  function DeleteModal() {

    const taskToDelete = props.location.taskEntry;

    function onDelete() {
      APIaxios.deleteInterviewbitTask(taskToDelete.id).then(
        interviewbitTaskContext.interviewbitTaskDispatch(
          {
            type: INTERVIEWBIT_TASK_ACTIONS.DELETE,
            payload: taskToDelete.id
          }
        )
      )
      closeModal();
    }

    return (
      <Modal show={true}>
        <Modal.Header toggle={closeModal}>Delete Task?</Modal.Header>
        <Modal.Body>
          <legend>Question Summary</legend>
          <ul>
            <li><p style={{ marginBottom: "0rem" }}>{taskToDelete.question}</p></li>
            <li><p style={{ marginBottom: "0rem" }}>{taskToDelete.difficulty}</p></li>
            <li><p style={{ marginBottom: "0rem" }}>Notes : {taskToDelete.notes}</p></li>
          </ul>
          <Button variant="danger" onClick={onDelete}>Yes</Button>{' '}
          <Button variant="secondary" onClick={closeModal}>No</Button>
        </Modal.Body>
      </Modal>
    )

  }

  function renderFunction() {
    if (props.modalOperation === MODAL_OPERATION.DELETE_MODAL) return <DeleteModal />
    else if (props.modalOperation === MODAL_OPERATION.ADD_MODAL) return <AddModal />
  }

  return (
    <React.Fragment>
      {renderFunction()}
    </React.Fragment>
  )
}

export default InterviewbitTaskOperationsModal