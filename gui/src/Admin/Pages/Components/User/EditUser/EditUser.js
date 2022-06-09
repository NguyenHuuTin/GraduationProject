import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./EditUser.module.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function EditUser(props) {
  const {id} =  useParams();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleName = (even)=>{
    setName(even.target.value)
  }

  const handleRole = (even)=>{
    setRole(even.target.value)
  }

  useEffect(()=>{
      axios.get(`http://localhost:57678/Users/${id}`)
      .then((res)=>{
        setName(res.data.userName)
        setRole(res.data.roleName)
      })
      .catch(()=>{
        setName('')
        setRole('')
      })
  },[id])

  const handleUpdate = async ()=>{
      await axios.put(`http://localhost:57678/Users`,{
        id: id,
        userName: name,
        roleName: role
      })
      .then((res)=>{
        console.log(res);
        NotificationManager.success('Edit user successfully!');
        props.handleStatus()
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  return (
    <div className={styles.editUser}>
      <div className={styles.editUserTitle}>Edit User</div>
      <div className={styles.editUserInput}>
        <div className={styles.editUserInputGroup}>
          <div className={styles.editUserTitleInput}>Name:</div>
          <input className={styles.editUserStyleInput} value={name} onChange={handleName}/>
        </div>

        <div className={styles.editUserInputGroup}>
          <div className={styles.editUserTitleInput}>Role:</div>
          <select name="roleName" className={styles.editUserStyleInput} value={role} onChange={handleRole}>
                <option value={"Admin"}>Admin</option>
                <option value={"Instructor"}>Instructor</option>
                <option value={"Student"}>Student</option>
              </select>
        </div>
      </div>
      <div className={styles.editUserSubmit}>
        <button className={styles.editUserButton} onClick={handleUpdate}>Submit</button>
        <NotificationContainer/>
      </div>
    </div>
  );
}

export default EditUser;
