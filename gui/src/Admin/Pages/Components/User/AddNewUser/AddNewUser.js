import axios from "axios";
import React, {useState } from "react";
import "./AddNewUser.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function AddNewUser(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [role, setRole] = useState('Student');

  const handleName = (even)=>{
    setName(even.target.value)
  }

  const handleEmail = (even)=>{
    setEmail(even.target.value)
  }

  const handlePass = (even)=>{
    setPassWord(even.target.value)
  }

  const handleRole = (even)=>{
    setRole(even.target.value)
  }

  const handleSubmit = async (e)=>{
    //console.log(name, email, passWord, role)
    await axios.post(`http://localhost:57678/Users`,{
      userName: name,
      email: email,
      passWord: passWord,
      roleName: role
    }).then((res)=>{
      console.log(res)
      NotificationManager.success('Add user successfully!');
      props.handleStatus()
    })
    .catch((error)=>{
      console.log(error)
    });
  }
  return (
    <div className="add-new-user">
      <div className="add-user-title">Add New User</div>
      <div className="add-new-user-input">
        <div className="add-user-input-group">
          <div className="add-user-input">
            <div className="add-user-title-input">Name:</div>
            <input className="add-user-style-input" onChange={handleName}/>
          </div>
          <div className="add-user-input">
            <div className="add-user-title-input">Email:</div>
            <input className="add-user-style-input" onChange={handleEmail}/>
          </div>
        </div>

        <div className="add-user-input-group">
          <div className="add-user-input">
            <div className="add-user-title-input">Password:</div>
            <input type={"password"} className="add-user-style-input" onChange={handlePass} />
          </div>
          <div className="add-user-input">
            <div className="add-user-title-input">Role:</div>
              <select name="roleName" className="add-user-style-select" onChange={handleRole}>
                <option value={"Admin"}>Admin</option>
                <option value={"Instructor"}>Instructor</option>
                <option value={"Student"}>Student</option>
              </select>
          </div>
        </div>
      </div>
      <div className="add-new-user-submit">
        <button className="add-user-button" onClick={handleSubmit}>Submit</button>
        <NotificationContainer/>
      </div>
    </div>
  );
}

export default AddNewUser;
