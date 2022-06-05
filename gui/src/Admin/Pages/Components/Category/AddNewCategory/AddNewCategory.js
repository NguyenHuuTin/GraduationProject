import React from "react";
import styles from "./AddNewCategory.module.css";

function AddNewCategory(props) {
  return (
    <div className={styles.addNewCategory}>
      <div className={styles.addCategoryTitle}>Add New Category</div>
      <div className={styles.editCategoryInput}>
        <div className={styles.editCategoryInputGroup}>
          <div className={styles.editCategoryTitleInput}>Name:</div>
          <input className={styles.editCategoryStyleInput} />
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
      <div className={styles.addNewCategorySubmit}>
        <button className={styles.addCategoryButton}>Submit</button>
      </div>
    </div>
  );
}

export default AddNewCategory;
