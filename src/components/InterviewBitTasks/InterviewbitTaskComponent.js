import react from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

function InterviewbitTaskComponent() {
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
}

export default InterviewbitTaskComponent