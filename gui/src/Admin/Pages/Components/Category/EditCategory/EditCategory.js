import React from "react";
import styles from "./EditCategory.module.css";

function EditCategory(props) {
  return (
    <div className={styles.editCategory}>
      <div className={styles.editCategoryTitle}>Edit Category</div>
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
      <div className={styles.editCategorySubmit}>
        <button className={styles.editCategoryButton}>Submit</button>
      </div>
    </div>
  );
}

export default EditCategory;
