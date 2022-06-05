import React from "react";
import styles from "./AddNewLanguage.module.css";

function AddNewLanguage(props) {
  return (
    <div className={styles.addNewLanguage}>
      <div className={styles.addLanguageTitle}>Add New Language</div>
      <div className={styles.editLanguageInput}>
        <div className={styles.editLanguageInputGroup}>
          <div className={styles.editLanguageTitleInput}>Name:</div>
          <input className={styles.editLanguageStyleInput} />
        </div>

        <div className={styles.editLanguageInputGroup}>
          <div className={styles.editLanguageTitleInput}>Status:</div>
          <input
            type={"text"}
            list="itemStatus"
            className={styles.editLanguageStyleInput}
          />
          <datalist id="itemStatus">
            <option value={"Active"} />
            <option value={"De-Active"} />
          </datalist>
        </div>
      </div>
      <div className={styles.addNewLanguageSubmit}>
        <button className={styles.addLanguageButton}>Submit</button>
      </div>
    </div>
  );
}

export default AddNewLanguage;
