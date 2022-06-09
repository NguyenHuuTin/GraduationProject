import React, { useState } from "react";
import styles from "./AddNewLanguage.module.css";
import axios from "axios";
import {NotificationContainer, NotificationManager,} from "react-notifications";
import "react-notifications/lib/notifications.css";

function AddNewLanguage(props) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Active');


  const handleName = (even)=>{
    setName(even.target.value)
  }

  const handleStatus = (even)=>{
    setStatus(even.target.value)
  }


  const handleSubmit = async (e)=>{
    //console.log(name, email, passWord, role)
    await axios.post(`http://localhost:57678/Languages`,{
      name: name,
      status: status
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
    <div className={styles.addNewLanguage}>
      <div className={styles.addLanguageTitle}>Add New Language</div>
      <div className={styles.editLanguageInput}>
        <div className={styles.editLanguageInputGroup}>
          <div className={styles.editLanguageTitleInput}>Name:</div>
          <input className={styles.editLanguageStyleInput} onChange={handleName}/>
        </div>

        <div className={styles.editLanguageInputGroup}>
          <div className={styles.editLanguageTitleInput}>Status:</div>
          <select className={styles.editLanguageStyleInput} onChange={handleStatus}>
            <option value={"Active"}>Active</option>
            <option value={"De-Active"}>De-Active</option>
          </select>
        </div>
      </div>
      <div className={styles.addNewLanguageSubmit}>
        <button className={styles.addLanguageButton} onClick={handleSubmit}>Submit</button>
        <NotificationContainer/>
        
      </div>
    </div>
  );
}

export default AddNewLanguage;
