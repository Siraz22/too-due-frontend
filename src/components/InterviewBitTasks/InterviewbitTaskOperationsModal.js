import React from 'react'
import { useContext, useState } from 'react';
import APIaxios from '../../apiService/APIaxios';
import { v4 as uuid } from 'uuid'
import { InterviewbitTaskContext, INTERVIEWBIT_TASK_ACTIONS } from '../../App';
import { MODAL_OPERATION } from '../CustomTasks/GenericTaskOperationsModals';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'

function InterviewbitTaskOperationsModal(props) {

  const interviewbitTaskContext = useContext(InterviewbitTaskContext);

  function closeModal() {
    props.history.push("/interviewbit");
  }

  function AddModal() {

    const [question, setQuestionName] = useState()
    const [difficulty, setDifficulty] = useState()
    const [link, setLink] = useState()
    const [completed, setCompletionBool] = useState(false)
    const [topic, setTopic] = useState()

    function onAdd() {
      const entry = {
        id: uuid(),
        question: question,
        difficulty: difficulty,
        link: link,
        notes: null,
        completed: completed,
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
        <Modal isOpen={true}>
          <ModalHeader toggle={closeModal}>Add a Question</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <legend>Task Name</legend>
                <Input placeholder='Question name on Interviewbit'
                  onChange={(e) => setQuestionName(e.target.value)}>
                </Input>
              </FormGroup>
              <FormGroup>
                <legend>Link</legend>
                <Input placeholder='Question Link'
                  onChange={(e) => setLink(e.target.value)}>
                </Input>
              </FormGroup>
              <FormGroup onClick={(e) => setDifficulty(e.target.id)}>
                <legend>Difficulty</legend>
                <Label> <Input id={"Very Easy"} type="radio" name="difficulty" /> Very Easy </Label>
                <br />
                <Label> <Input id={"Easy"} type="radio" name="difficulty" /> Easy </Label>
                <br />
                <Label> <Input id={"Medium"} type="radio" name="difficulty" /> Medium </Label>
                <br />
                <Label> <Input id={"Hard"} type="radio" name="difficulty" /> Hard </Label>
              </FormGroup>

              <FormGroup >
                <legend>Topic</legend>
                <FormGroup onClick={(e) => setTopic(e.target.value)}>
                  <Input type="select">
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
      <Modal isOpen={true}>
        <ModalHeader toggle={closeModal}>Delete Task?</ModalHeader>
        <ModalBody>
          <legend>Question Summary</legend>
          <ul>
            <li><p style={{ marginBottom: "0rem" }}>{taskToDelete.question}</p></li>
            <li><p style={{ marginBottom: "0rem" }}>{taskToDelete.difficulty}</p></li>
            <li><p style={{ marginBottom: "0rem" }}>Notes : {taskToDelete.notes}</p></li>
          </ul>
          <Button color="danger" onClick={onDelete}>Yes</Button>{' '}
          <Button color="secondary" onClick={closeModal}>No</Button>
        </ModalBody>
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