import react from 'react'
import React from 'react'
import { useContext, useEffect, useState, useRef } from 'react'
import { ButtonToggle, Button, Table } from 'reactstrap'
import APIaxios from '../../apiService/APIaxios';
import { InterviewbitTaskContext, INTERVIEWBIT_TASK_ACTIONS } from '../../App';
import { FaTrashAlt } from 'react-icons/fa'
import { FcAddRow } from 'react-icons/fc'
import { BrowserRouter as Switch, Link, Route } from 'react-router-dom'
import InterviewbitTaskOperationsModal from './InterviewbitTaskOperationsModal';
import { MODAL_OPERATION } from '../CustomTasks/GenericTaskOperationsModals';

function InterviewbitTaskComponent() {

  const interviewbitTaskContext = useContext(InterviewbitTaskContext);

  useEffect(() => {
    //use this to call the Get API call and update the state
    APIaxios.getInterviewbitTasks().then((response) =>
      interviewbitTaskContext.interviewbitTaskDispatch({
        type: INTERVIEWBIT_TASK_ACTIONS.GET,
        payload: response.data
      })
    )
  }, [])

  function renderInterviewbitTasks() {
    let tempTaskList = [];
    if (interviewbitTaskContext.interviewbitTaskState.length > 0) {
      tempTaskList = interviewbitTaskContext.interviewbitTaskState.map((interviewbitTask) => {
        return (
          <React.Fragment key={interviewbitTask.id}>
            <InterviewbitTaskEntry taskEntry={interviewbitTask} />
          </React.Fragment>
        )
      })
    }
    //console.log(tempTaskList);
    return tempTaskList;
  }

  return (
    <react.Fragment>

      <Switch>

        <div className="table-responsive">
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Ques</th>
                <th>Difficulty</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>

            </thead>
            <tbody>
              {renderInterviewbitTasks()}
              <tr>
                <td>
                  <Link to="/interviewbit/add">
                    <Button color="none">
                      <FcAddRow fontSize={42} />
                    </Button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <Route path="/interviewbit/add" exact render={
          (props) => (
            <InterviewbitTaskOperationsModal
              {...props}
              modalOperation={MODAL_OPERATION.ADD_MODAL}
            />

          )
        } />
        <Route path="/interviewbit/delete/:id" exact render={
          (props) => (
            <InterviewbitTaskOperationsModal
              {...props}
              modalOperation={MODAL_OPERATION.DELETE_MODAL}
            />
          )
        } />

      </Switch>
    </react.Fragment >
  )
}

function InterviewbitTaskEntry(props) {

  const { id, question, difficulty, link, notes, completed } = props.taskEntry
  const [completionBool, setCompletionBool] = useState(completed);
  // const [entryNotes, setNotes] = useState(notes);
  const inputRef = useRef()

  function DoneButton() {

    const interviewbitTaskContext = useContext(InterviewbitTaskContext);
    function doneToggle() {

      //NOTE : Ask someone why this is not working. for now it's solved with direct updation
      console.log(completionBool)
      setCompletionBool(prevState => !prevState);
      console.log(completionBool)

      const questionToggled = {
        id: props.taskEntry.id,
        question: props.taskEntry.question,
        difficulty: props.taskEntry.difficulty,
        link: props.taskEntry.link,
        notes: props.taskEntry.notes,
        completed: !completionBool
      }

      APIaxios.updateInterviewbitTask(questionToggled.id, questionToggled).then(
        interviewbitTaskContext.interviewbitTaskDispatch(
          {
            type: INTERVIEWBIT_TASK_ACTIONS.PUT,
            payload: questionToggled
          }
        )
      )
    }

    return (
      <div>
        <ButtonToggle color='none' onClick={doneToggle}>
          <img src={completionBool ? 'logoArrow.png' : 'logoArrowIncomplete.png'} style={{ height: "30px" }} />
        </ButtonToggle>
      </div>
    )
  }

  function Question() {
    return (
      <React.Fragment>
        <a href={"http://" + link}>{question}</a>
      </React.Fragment>
    )
  }

  function Difficulty() {
    return difficulty
  }

  function Notes() {

    const interviewbitTaskContext = useContext(InterviewbitTaskContext);

    function onTextAreaChange(event) {
      //event.persist()
      //setNotes(event.target.value)

      //focus on ref
      //console.log(inputRef.current)

      // const entryChanged = {
      //   id: props.taskEntry.id,
      //   question: props.taskEntry.question,
      //   difficulty: props.taskEntry.difficulty,
      //   link: props.taskEntry.link,
      //   notes: event.target.value,
      //   completed: props.taskEntry.completed
      // }

      // APIaxios.updateInterviewbitTask(entryChanged.id, entryChanged).then(
      //   interviewbitTaskContext.interviewbitTaskDispatch(
      //     {
      //       type: INTERVIEWBIT_TASK_ACTIONS.PUT,
      //       payload: entryChanged
      //     }
      //   )
      // )

      // inputRef.current.focus();
      // event.preventDefault();
    }

    return (
      <React.Fragment>
        <textarea ref={inputRef} value={"Under Development (refs and mouse events to be done)"} onChange={e => onTextAreaChange(e)}></textarea>
      </React.Fragment >
    )
  }

  function ActionButtons() {
    return (
      <React.Fragment>
        <Link to={{
          pathname: `interviewbit/delete/${id}`,
          taskEntry: { ...props.taskEntry }
        }}>
          <i><FaTrashAlt color="maroon" fontSize={20} /></i>
        </Link>
      </React.Fragment >
    )
  }

  return (
    <React.Fragment>
      <tr>
        <td className="align-middle"><DoneButton /></td>
        <td className="align-middle"><Question /></td>
        <td className="align-middle"><Difficulty /></td>
        <td className="align-middle"><Notes /></td>
        <td className="align-middle"><ActionButtons /></td>
      </tr>
    </React.Fragment>
  )
}

export default InterviewbitTaskComponent