import React, { useEffect, useState } from "react";
import styles from "./EditSubCategory.module.css";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useParams } from "react-router-dom";

function EditSubCategory(props) {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/Category")
      .then((res) => {
        setCategory(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setCategory([]);
      });
  }, []);

  const { id } = useParams();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [inputCategory, setInputCategory] = useState("");

  const handleCategory = (even) => {
    setInputCategory(even.target.value);
  };

  const handleName = (even) => {
    setName(even.target.value);
  };

  const handleStatus = (even) => {
    if (even.target.value === "Active") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:57678/subcategory/${id}`)
      .then((res) => {
        setName(res.data.name);
        setStatus(res.data.status);
        setInputCategory(res.data.categoryId);
      })
      .catch(() => {
        setName("");
        setStatus("");
        setInputCategory("");
      });
  }, [id]);

  const handleUpdate = async () => {
    await axios
      .put(`http://localhost:57678/updatesubcategory`, {
        id: id,
        categoryId: inputCategory,
        name: name,
        status: status,
      })
      .then((res) => {
        console.log(res);
        NotificationManager.success("Edit user successfully!");
        props.handleStatus();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={styles.editCategory}>
      <div className={styles.editCategoryTitle}>Edit SubCategory</div>
      <div className={styles.editCategoryInput}>
        <div className={styles.editCategoryInputGroup}>
          <div className={styles.editCategoryTitleInput}>Name:</div>
          <input className={styles.editCategoryStyleInput} value={name}
            onChange={handleName}/>
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
      <div className={styles.editCategorySubmit}>
        <button className={styles.editCategoryButton} onClick={handleUpdate}>Submit</button>
        <NotificationContainer/>
      </div> 
    </div>
  );
}

export default EditSubCategory;
