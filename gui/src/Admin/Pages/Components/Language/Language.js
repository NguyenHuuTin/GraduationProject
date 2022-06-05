import React from "react";
import styles from "./Language.module.css";
import LanguageList from "./LanguageList/LanguageList";
import { Link, Outlet } from "react-router-dom";

function Language(props) {
  return (
    <div className={styles.cardContentLanguage}>
      <div className={styles.cardHeaderLanguage}>
        <h2 className={styles.headerTitleLanguage}>Language</h2>
        <div className={styles.headerPathLanguage}>
          <div className={styles.headerPathItemLanguage}>
            <Link to={".."} className={styles.itemContentLanguageActive}>
              Home
            </Link>
          </div>
          /
          <div className={styles.headerPathItemLanguage}>
            <Link to={"/Language"} className={styles.itemContentLanguage}>
              Language
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.LanguageMain}>
        <div className={styles.LanguageMainLanguageList}>
          <LanguageList />
        </div>
        <div className={styles.LanguageMainAddNewLanguage}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Language;
