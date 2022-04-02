import React from 'react'
import { useContext, useEffect, useState, useRef } from 'react'
import APIaxios from '../../apiService/APIaxios';
import { InterviewbitTaskContext, INTERVIEWBIT_TASK_ACTIONS } from '../../App';
import { FaTrashAlt } from 'react-icons/fa'
import { FcAddRow } from 'react-icons/fc'
import { Switch, Link, Route } from 'react-router-dom'
import InterviewbitTaskOperationsModal from './InterviewbitTaskOperationsModal';
import { MODAL_OPERATION } from '../CustomTasks/GenericTaskOperationsModals';
import { Button, Table, Overlay, ToggleButton } from 'react-bootstrap';
import { BsFileEarmarkCode } from 'react-icons/bs'
import AuthenticationService from '../../apiService/AuthenticationService';
import AuthenticatedRoute from '../AuthenticatedRoute';
import { Redirect } from 'react-router-dom';

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
    <React.Fragment>



      <div className="table-responsive">
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Ques</th>
              <th>Difficulty</th>
              <th>Topic</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>

          </thead>
          <tbody>
            {renderInterviewbitTasks()}
            <tr>
              <td>
                <Link to="/interviewbit/add">
                  <Button variant="none">
                    <FcAddRow fontSize={42} />
                  </Button>
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <Switch>
        <AuthenticatedRoute path="/interviewbit/add" exact render={
          (props) => (
            <InterviewbitTaskOperationsModal
              {...props}
              modalOperation={MODAL_OPERATION.ADD_MODAL}
            />

          )
        } />

        <AuthenticatedRoute path="/interviewbit/delete/:id" exact render={
          (props) => (
            <InterviewbitTaskOperationsModal
              {...props}
              modalOperation={MODAL_OPERATION.DELETE_MODAL}
            />
          )
        } />
      </Switch>
    </React.Fragment >
  )
}

function InterviewbitTaskEntry(props) {

  const { id, question, difficulty, link, notes, completed, topic } = props.taskEntry
  const [completionBool, setCompletionBool] = useState(completed);

  const inputRef = useRef()

  function DoneButton() {


    const interviewbitTaskContext = useContext(InterviewbitTaskContext);
    function doneToggle() {

      if (!AuthenticationService.isLoggedIn()) {
        alert("Not logged in")
        return;
      }

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
        completed: !completionBool,
        topic: topic
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
        <ToggleButton variant='none' onClick={doneToggle}>
          <img src={completionBool ? 'logoArrow.png' : 'logoArrowIncomplete.png'} style={{ height: "30px" }} />
        </ToggleButton>
      </div>
    )
  }

  function Question() {
    return (
      <React.Fragment>
        <a href={link}>{question}</a>
      </React.Fragment>
    )
  }

  function Difficulty() {

    const [color, setColor] = useState()

    function fetchColor(passedDifficulty) {
      if (passedDifficulty == "Very Easy") setColor("success");
      else if (passedDifficulty == "Easy") setColor("success");
      else if (passedDifficulty === "Medium") setColor("warning");
      else setColor("danger");
    }

    useEffect(() => {
      fetchColor(difficulty);
    }, [])

    return (
      <Button variant={color}>
        {difficulty}
      </Button>
    )
  }

  function Notes() {

    // useEffect(() => {
    //   console.log("Called inside Notes");
    //   inputRef.current.focus();
    //   inputRef.current.selectionStart = inputRef.current.value.length;
    //   inputRef.current.selectionEnd = inputRef.current.value.length;
    // }, [])

    const interviewbitTaskContext = useContext(InterviewbitTaskContext);
    const [localNotes, setLocalNotes] = useState(notes)

    function updateNotes() {
      //event.persist()
      //console.log(inputRef.current)

      const entryChanged = {
        id: props.taskEntry.id,
        question: props.taskEntry.question,
        difficulty: props.taskEntry.difficulty,
        link: props.taskEntry.link,
        notes: localNotes,
        completed: props.taskEntry.completed,
        topic: props.taskEntry.topic
      }

      APIaxios.updateInterviewbitTask(entryChanged.id, entryChanged).then(
        interviewbitTaskContext.interviewbitTaskDispatch(
          {
            type: INTERVIEWBIT_TASK_ACTIONS.PUT,
            payload: entryChanged
          }
        )
      )

      //inputRef.current.focus();
      //event.preventDefault();
    }

    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
      <React.Fragment>

        <textarea disabled={!AuthenticationService.isLoggedIn()}
          ref={target} onClick={() => setShow(!show)}
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
          onBlur={updateNotes}
        ></textarea>

        <Overlay target={target.current} show={show} placement="bottom">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                position: 'absolute',
                backgroundColor: 'grey',
                padding: '2px 10px',
                color: 'white',
                marginTop: '3px',
                borderRadius: 3,
                ...props.style,
              }}
            >
              Changes made locally. Click out of textbox to save.
            </div>
          )}
        </Overlay>

        {/* <Overlay target={target.current} show={show} placement="bottom">
          <p>My Tooltip</p>
        </Overlay> */}

      </React.Fragment >
    )
  }

  function Topic() {
    return topic
  }

  function ActionButtons() {

    let topicUrl = topic.replaceAll(" ", "%20")
    let questionUrl = question.replaceAll(" ", "%20")
    let url = "https://github.com/Siraz22/interviewbit/blob/master/" + topicUrl + "/" + questionUrl + ".java"

    return (
      <React.Fragment>
        <Link to={{
          pathname: `interviewbit/delete/${id}`,
          taskEntry: { ...props.taskEntry }
        }}>
          <i><FaTrashAlt color="maroon" fontSize={20} /></i>
        </Link>
        {' '}
        <a href={url}>
          <i><BsFileEarmarkCode color="grey" fontSize={20} /></i>
        </a>
      </React.Fragment >
    )
  }

  return (
    <React.Fragment>
      <tr>
        <td className="align-middle"><DoneButton /></td>
        <td className="align-middle"><Question /></td>
        <td className="align-middle"><Difficulty /></td>
        <td className="align-middle"><Topic /></td>
        <td className="align-middle"><Notes /></td>
        <td className="align-middle"><ActionButtons /></td>
      </tr>
    </React.Fragment>
  )
}

export default InterviewbitTaskComponent