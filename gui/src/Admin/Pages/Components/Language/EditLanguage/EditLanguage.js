import React from "react";
import styles from "./EditLanguage.module.css";

function EditLanguage(props) {
  return (
    <div className={styles.editLanguage}>
      <div className={styles.editLanguageTitle}>Edit Language</div>
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
      <div className={styles.editLanguageSubmit}>
        <button className={styles.editLanguageButton}>Submit</button>
      </div>
    </div>
  );
}

export default EditLanguage;
