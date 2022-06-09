import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./EditLanguage.module.css";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function EditLanguage(props) {
  const {id} =  useParams();
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const handleName = (even)=>{
    setName(even.target.value)
  }

  const handleStatus = (even)=>{
    setStatus(even.target.value)
  }

  useEffect(()=>{
      axios.get(`http://localhost:57678/Languages/${id}`)
      .then((res)=>{
        setName(res.data.name)
        setStatus(res.data.status)
      })
      .catch(()=>{
        setName('')
        setStatus('')
      })
  },[id])

  const handleUpdate = async ()=>{
      await axios.put(`http://localhost:57678/Languages`,{
        id: id,
        name: name,
        status: status
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
    <div className={styles.editLanguage}>
      <div className={styles.editLanguageTitle}>Edit Language</div>
      <div className={styles.editLanguageInput}>
        <div className={styles.editLanguageInputGroup}>
          <div className={styles.editLanguageTitleInput}>Name:</div>
          <input className={styles.editLanguageStyleInput} value={name} onChange={handleName} />
        </div>

        <div className={styles.editLanguageInputGroup}>
          <div className={styles.editLanguageTitleInput}>Status:</div>
          <select className={styles.editLanguageStyleInput} value={status} onChange={handleStatus}>
            <option value={"Active"}>Active</option>
            <option value={"De-Active"}>De-Active</option>
          </select>  
        </div>
      </div>
      <div className={styles.editLanguageSubmit}>
        <button className={styles.editLanguageButton} onClick={handleUpdate}>Submit</button>
        <NotificationContainer/>
      </div>
    </div>
  );
}

export default EditLanguage;
