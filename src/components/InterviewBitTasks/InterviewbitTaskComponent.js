import react from 'react'
import React from 'react'
import { useContext, useEffect } from 'react'
import { Table } from 'reactstrap'
import { InterviewbitTaskContext } from '../../App';

function InterviewbitTaskComponent() {

  const interviewbitTaskContext = useContext(InterviewbitTaskContext);

  useEffect(() => {
    //use this to call the Get API call and update the state
    // APIaxios.getGenericTasks().then((response) =>
    //   genericTaskContext.genericTaskDispatch({
    //     type: GENERIC_TASK_ACTIONS.GET,
    //     payload: response.data
    //   })
    // )
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

    return tempTaskList;
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
            <tr>
              <td>Sample</td>
              <td>Sample Ques</td>
              <td>Medium</td>
              <td><a href="https://interviewbit.com">www.interviewbit.com</a></td>
              <td>Sample Note</td>
              <td>Buttons</td>
            </tr>
          </thead>
        </Table>
      </div>
    </react.Fragment >
  )

  function InterviewbitTaskEntry(props) {
    const [id, question, difficulty, link, notes] = props.taskEntry

    function DoneButton() {

    }

    function Question() {

    }

    function Difficulty() {

    }

    function Link() {

    }

    function Notes() {

    }

    return (
      <React.Fragment>
        <tr>
          <th className="align-middle"></th>
        </tr>
      </React.Fragment>
    )

  }

}

export default InterviewbitTaskComponent