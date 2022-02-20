import React, { useState } from 'react'
import { Button } from 'reactstrap'
import '../css/misc.css'
import { FcAbout, FcQuestions } from 'react-icons/fc'

function Footer() {

  const [height, setHeight] = useState(290)
  const footerStyle = {
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: `${height}px`,
    width: "100%"
  };

  const phantomStyle = {
    display: "block",
    padding: "20px",
    height: `${height}px`,
    width: "100%"
  };

  return (

    <React.Fragment>

      <div style={phantomStyle}></div>
      <div style={footerStyle} className="footer">
        <div className="container">
          <div className="row-grid align-items-center mb-3 row">
            <div className="col-sm-7">
              <h2 className="text-primary mb-2">Welcome to the personalized </h2>
              <h3 className="text-primary mb-2">To Do list!</h3>
              <h6 className="mb-0 font-weight-light">Want your username to be set up? Let's get in touch!</h6>
            </div>
            <div className="col-sm-5">
              <Button color="primary" className="rounded-circle btn-circle"></Button>
              <Button color="danger" className="rounded-circle btn-circle"></Button>
              <Button color="success" className="rounded-circle btn-circle"></Button>
            </div>
          </div>
          <hr style={{ marginBottom: "5px" }} />
          <div className="align-items-center justify-content-md-between row">
            <div className="col-sm-6">
              <b>Too-Due List</b>
              <p style={{ fontSize: "0.85rem", marginBottom: 0 }}>© 2022 क्या ही कॉपीराइट?</p>
            </div>
            <div className="col-sm-6">
              <ul className="nav-footer justify-content-center nav">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    < FcAbout fontSize={22} />About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <FcQuestions fontSize={22} /> Want to copy?</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://too-due-backend.herokuapp.com/react-api/genericTask/getTasks">
                    <FcQuestions fontSize={22} /> API calls</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


    </React.Fragment>
  )
}

export default Footer