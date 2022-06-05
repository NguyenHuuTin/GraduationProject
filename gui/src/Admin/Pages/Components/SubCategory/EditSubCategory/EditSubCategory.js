import React, { useEffect, useState } from "react";
import styles from "./EditSubCategory.module.css";
import axios from "axios";

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
  return (
    <div className={styles.editCategory}>
      <div className={styles.editCategoryTitle}>Edit SubCategory</div>
      <div className={styles.editCategoryInput}>
        <div className={styles.editCategoryInputGroup}>
          <div className={styles.editCategoryTitleInput}>Name:</div>
          <input className={styles.editCategoryStyleInput} />
        </div>

        <div className={styles.editCategoryInputGroup}>
          <div className={styles.editCategoryTitleInput}>Category:</div>
          <input
            type={"text"}
            list="itemCategory"
            className={styles.editCategoryStyleInput}
          />
          <datalist id="itemCategory">
            {category?.map((element) => {
              return <option key={element.id} value={element.name} />;
            })}
          </datalist>
        </div>

        <div className={styles.editCategoryInputGroup}>
          <div className={styles.editCategoryTitleInput}>Status:</div>
          <input
            type={"text"}
            list="itemStatus"
            className={styles.editCategoryStyleInput}
          />
          <datalist id="itemStatus">
            <option value={"Active"} />
            <option value={"De-Active"} />
          </datalist>
        </div>
      </div>
      <div className={styles.editCategorySubmit}>
        <button className={styles.editCategoryButton}>Submit</button>
      </div>
    </div>
  );
}

export default EditSubCategory;
