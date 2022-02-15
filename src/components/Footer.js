import React from 'react'
import { Button } from 'reactstrap'
import '../css/misc.css'

function Footer() {
  return (
    <div className="fixed-bottom footer">
      <div className="container">
        <div className="row-grid align-items-center mb-5 row">
          <div className="col-sm-7">
            <h3 className="text-primary mb-2">Welcome to the personalized To Do List!</h3>
            <h6 className="mb-0 font-weight-light">Want your username to be set up? Let's get in touch!</h6>
          </div>
          <div className="col-sm-5">
            <Button color="primary" className="rounded-circle btn-circle"></Button>
            <Button color="danger" className="rounded-circle btn-circle"></Button>
            <Button color="success" className="rounded-circle btn-circle"></Button>
          </div>
        </div>
        <hr />
        <div className="align-items-center justify-content-md-between row">
          <div className="col-sm-6">
            <b>Too-Due List</b>
            <p style={{ fontSize: "0.85rem", }}>© 2022 क्या ही कॉपीराइट?</p>
          </div>
          <div className="col-sm-6">
            <ul className="nav-footer justify-content-end nav">
              <li className="nav-item">
                <a className="nav-link" href="/">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Want to copy?</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Footer