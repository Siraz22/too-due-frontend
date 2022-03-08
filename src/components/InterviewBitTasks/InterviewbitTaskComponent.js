import react from 'react'
import React from 'react'
import { useContext, useEffect } from 'react'
import { Table } from 'reactstrap'
import APIaxios from '../../apiService/APIaxios';
import { InterviewbitTaskContext, INTERVIEWBIT_TASK_ACTIONS } from '../../App';


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
    console.log(tempTaskList);
    return tempTaskList;

    console.log(interviewbitTaskContext.interviewbitTaskState);
  }

  return (
    <react.Fragment>
      <div className="table-responsive">
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Ques</th>
              <th>Difficulty</th>
              <th>Link</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>

          </thead>
          <tbody>
            <tr>
              <td>Sample</td>
              <td>Sample Ques</td>
              <td>Medium</td>
              <td><a href="https://interviewbit.com">www.interviewbit.com</a></td>
              <td>Sample Note</td>
              <td>Buttons</td>
            </tr>
            {renderInterviewbitTasks()}
          </tbody>
        </Table>
      </div>
    </react.Fragment >
  )

  function InterviewbitTaskEntry(props) {
    console.log(props)
    const { id, question, difficulty, link, notes } = props.taskEntry

    function DoneButton() {
      return "Done Button"
    }

    function Question() {
      return question
    }

    function Difficulty() {
      return difficulty
    }

    function Link() {
      return <a href={"http://" + link}>Sample link to Google</a>
    }

    function Notes() {
      return notes
    }

    return (
      <React.Fragment>
        <tr>
          <td className="align-middle"><DoneButton /></td>
          <td className="align-middle"><Question /></td>
          <td className="align-middle"><Difficulty /></td>
          <td className="align-middle"><Link /></td>
          <td className="align-middle"><Notes /></td>
        </tr>
      </React.Fragment>
    )
  }

}

export default InterviewbitTaskComponent