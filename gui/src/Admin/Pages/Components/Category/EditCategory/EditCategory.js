import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./EditCategory.module.css";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function EditCategory(props) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

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
      .get(`http://localhost:57678/category/${id}`)
      .then((res) => {
        setName(res.data.name);
        setStatus(res.data.status);
      })
      .catch(() => {
        setName("");
        setStatus("");
      });
  }, [id]);

  const handleUpdate = async () => {
    await axios
      .put(`http://localhost:57678/updatecategory`, {
        id: id,
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
      <div className={styles.editCategoryTitle}>Edit Category</div>
      <div className={styles.editCategoryInput}>
        <div className={styles.editCategoryInputGroup}>
          <div className={styles.editCategoryTitleInput}>Name:</div>
          <input
            className={styles.editCategoryStyleInput}
            value={name}
            onChange={handleName}
          />
        </div>

        <div className={styles.editCategoryInputGroup}>
          <div className={styles.editCategoryTitleInput}>Status:</div>
          <select
            className={styles.editCategoryStyleInput}
            value={status}
            onChange={handleStatus}
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

export default EditCategory;
