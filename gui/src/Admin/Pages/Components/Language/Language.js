import React, { useState, useEffect } from "react";
import styles from "./Language.module.css";
import LanguageList from "./LanguageList/LanguageList";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import AddNewLanguage from "./AddNewLanguage/AddNewLanguage";
import EditLanguage from "./EditLanguage/EditLanguage";

function Language(props) {
  const [languageList, setLanguageList] = useState([]);
  const [status, setStatus] = useState(false);

  const handleStatus = () => {
    setStatus((prev) => !prev);
  };
  useEffect( () => {
     axios
      .get("http://localhost:57678/Languages")
      .then((res) => {
        setLanguageList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setLanguageList([]);
      });
  },[status]);
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
          <LanguageList handleStatus={handleStatus} languages={languageList} />
        </div>
        <div className={styles.LanguageMainAddNewLanguage}>
          <Routes>
            <Route index element={<AddNewLanguage handleStatus={handleStatus} />} />
            <Route path="edit/:id" element={<EditLanguage handleStatus={handleStatus} />} />F
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Language;
