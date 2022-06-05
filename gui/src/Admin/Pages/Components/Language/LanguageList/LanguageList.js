import React, { useEffect, useState } from "react";
import styles from "./LanguageList.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function LanguageList(props) {
  const [languageList, setLanguageList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/Languages")
      .then((res) => {
        setLanguageList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setLanguageList([]);
      });
  }, []);
  return (
    <div className={styles.cardLanguageList}>
      <div className={styles.LanguageListTitle}>Language List</div>
      <div className={styles.LanguageList}>
        <div className={styles.LanguageListButtonSearch}>
          <div className={styles.LanguageListButton}>
            <button className={styles.LanguageButton}>Copy</button>
            <button className={styles.LanguageButton}>CSV</button>
            <button className={styles.LanguageButton}>Excel</button>
            <button className={styles.LanguageButton}>Print</button>
          </div>
          <div className={styles.LanguageListSearch}>
            <div className={styles.LanguageTitleSearch}>Search:</div>
            <div>
              <input
                className={styles.LanguageInputSearch}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className={styles.LanguageListAll}>
          <div className={styles.headerLanguageList}>
            <div className={styles.headerID}>#</div>
            <div className={styles.headerName}>Name</div>
            <div className={styles.headerStatus}>Status</div>
            <div className={styles.headerAction}>Action</div>
          </div>
          {languageList?.map((element, index) => {
            return (
              <div className={styles.itemLanguageList} key={element.id}>
                <div className={styles.itemID}>{index + 1}</div>
                <div className={styles.itemName}>{element.name}</div>
                <div className={styles.itemStatus}>
                  {element.status === "Active" ? 
                  <div className={styles.tagStatusActive}>
                    Active
                  </div>
                  :
                  <div className={styles.tagStatusDeActive}>
                    De-Active
                  </div>
                  }
                  
                </div>
                <div className={styles.itemAction}>
                  <Link to={"edit"}>
                      <button className={styles.buttonActionEdit}>
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                  </Link>
                  <button className={styles.buttonActionDelete}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.LanguageListPaging}></div>
    </div>
  );
}

export default LanguageList;
