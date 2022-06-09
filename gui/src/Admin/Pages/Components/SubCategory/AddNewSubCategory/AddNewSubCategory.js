import React, { useEffect, useState } from "react";
import styles from "./AddNewSubCategory.module.css";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function AddNewSubCategory(props) {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [status, setStatus] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:57678/Category")
      .then((res) => {
        setCategory(res.data);
        setInputCategory(res.data[0].id)
      })
      .catch(() => {
        setCategory([]);
      });
  }, []);
 

  const handleName = (even) => {
    setName(even.target.value);
  };

  const handleCategory = (even) => {
    setInputCategory(even.target.value);
    console.log(even.target.value);
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
      .post(`http://localhost:57678/AddSubCategory`, {
        name: name,
        categoryId: inputCategory,
        status: status,
      })
      .then((res) => {
        console.log(res);
        NotificationManager.success("Add user successfully!");
        props.handleStatus();
      })
      .catch((error) => {
        console.log(inputCategory);
      });
  };
  return (
    <div className={styles.addNewCategory}>
      <div className={styles.addCategoryTitle}>Add New Category</div>
      <div className={styles.editCategoryInput}>
        <div className={styles.editCategoryInputGroup}>
          <div className={styles.editCategoryTitleInput}>Name:</div>
          <input className={styles.editCategoryStyleInput} onChange={handleName}/>
        </div>

        <div className={styles.editCategoryInputGroup}>
          <div className={styles.editCategoryTitleInput}>Category:</div>
          <select
            onChange={handleCategory}
            className={styles.editCategoryStyleInput}
          >
            {category?.map((element) => {
              return <option key={element.id} value={element.id}>{element.name}</option>;
            })}
          </select>
        </div>

        <div className={styles.editCategoryInputGroup}>
          <div className={styles.editCategoryTitleInput}>Status:</div>
          <select
            onChange={handleStatus}
            className={styles.editCategoryStyleInput}
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

export default AddNewSubCategory;
