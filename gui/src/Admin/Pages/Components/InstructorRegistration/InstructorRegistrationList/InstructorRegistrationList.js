import React, { useEffect, useState } from "react";
import styles from "./InstructorRegistrationList.module.css";
import axios from "axios";

function InstructorRegistrationList(props) {
  const [instructorRegistrationList, setInstructorRegistrationList] = useState(
    []
  );
  useEffect(() => {
    axios
      .get("http://localhost:57678/Instructor")
      .then((res) => {
        setInstructorRegistrationList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setInstructorRegistrationList([]);
      });
  }, []);
  return (
    <div className={styles.cardInstructorRegistrationList}>
      <div className={styles.InstructorRegistrationListTitle}>
        Instructor Registration List
      </div>
      <div className={styles.InstructorRegistrationList}>
        <div className={styles.InstructorRegistrationListButtonSearch}>
          <div className={styles.InstructorRegistrationListButton}>
            <button className={styles.InstructorRegistrationButton}>
              Copy
            </button>
            <button className={styles.InstructorRegistrationButton}>CSV</button>
            <button className={styles.InstructorRegistrationButton}>
              Excel
            </button>
            <button className={styles.InstructorRegistrationButton}>
              Print
            </button>
          </div>
          <div className={styles.InstructorRegistrationListSearch}>
            <div className={styles.InstructorRegistrationTitleSearch}>
              Search:
            </div>
            <div>
              <input
                className={styles.InstructorRegistrationInputSearch}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className={styles.InstructorRegistrationListAll}>
          <div className={styles.headerInstructorRegistrationList}>
            <div className={styles.headerID}>#</div>
            <div className={styles.headerName}>Name</div>
            <div className={styles.headerEmail}>Email</div>
            <div className={styles.headerDate}>Register Date</div>
            <div className={styles.headerStatus}>Status</div>
          </div>
          {instructorRegistrationList?.map((element, index) => {
            return (
              <div
                className={styles.itemInstructorRegistrationList}
                key={element.id}
              >
                <div className={styles.itemID}>{index + 1}</div>
                <div className={styles.itemName}>{element.name}</div>
                <div className={styles.itemEmail}>{element.email}</div>
                <div className={styles.itemDate}>{element.registerDate}</div>
                {element.isStatus ? (
                  <div className={styles.itemStatus}>
                    <div className={styles.tagStatusActive}>Active</div>
                  </div>
                ) : (
                  <div className={styles.itemStatus}>
                    <div className={styles.tagStatusDeActive}>De-Active</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.InstructorRegistrationListPaging}></div>
    </div>
  );
}

export default InstructorRegistrationList;
