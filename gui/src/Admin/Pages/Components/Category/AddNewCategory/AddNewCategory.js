import React, { useState } from "react";
import styles from "./AddNewCategory.module.css";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function AddNewCategory(props) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);

  const handleName = (even) => {
    setName(even.target.value);
  };

  const handleStatus = (even) => {
    if(even.target.value === "Active"){
      setStatus(true)
    }
    else{
      setStatus(false)
    }
  };

  const handleSubmit = async (e) => {
    //console.log(name, email, passWord, role)
    await axios
      .post(`http://localhost:57678/AddCategory`, {
        name: name,
        status: status,
      })
      .then((res) => {
        console.log(res);
        NotificationManager.success("Add user successfully!");
        props.handleStatus();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={styles.addNewCategory}>
      <div className={styles.addCategoryTitle}>Add New Category</div>
      <div className={styles.editCategoryInput}>
        <div className={styles.editCategoryInputGroup}>
          <div className={styles.editCategoryTitleInput}>Name:</div>
          <input
            className={styles.editCategoryStyleInput}
            onChange={handleName}
          />
        </div>

        <div className={styles.editCategoryInputGroup}>
          <div className={styles.editCategoryTitleInput}>Status:</div>
          <select
            className={styles.editCategoryStyleInput}
            onChange={handleStatus}
          >
            <option value={"Active"}>Active</option>
            <option value={"De-Active"}>De-Active</option>
          </select>
        </div>
      </div>
      <div className={styles.addNewCategorySubmit}>
        <button className={styles.addCategoryButton} onClick={handleSubmit}>Submit</button>
        <NotificationContainer/>
      </div>
    </div>
  );
}

export default AddNewCategory;
