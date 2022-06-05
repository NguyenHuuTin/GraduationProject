import React, { useEffect, useState } from "react";
import styles from "./StudentRegistrationList.module.css";
import axios from "axios";

function StudentRegistrationList(props) {
  const [studentRegistrationList, setStudentRegistrationList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/Student")
      .then((res) => {
        setStudentRegistrationList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setStudentRegistrationList([]);
      });
  }, []);
  return (
    <div className={styles.cardStudentRegistrationList}>
      <div className={styles.StudentRegistrationListTitle}>
        Student Registration List
      </div>
      <div className={styles.StudentRegistrationList}>
        <div className={styles.StudentRegistrationListButtonSearch}>
          <div className={styles.StudentRegistrationListButton}>
            <button className={styles.StudentRegistrationButton}>Copy</button>
            <button className={styles.StudentRegistrationButton}>CSV</button>
            <button className={styles.StudentRegistrationButton}>Excel</button>
            <button className={styles.StudentRegistrationButton}>Print</button>
          </div>
          <div className={styles.StudentRegistrationListSearch}>
            <div className={styles.StudentRegistrationTitleSearch}>Search:</div>
            <div>
              <input
                className={styles.StudentRegistrationInputSearch}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className={styles.StudentRegistrationListAll}>
          <div className={styles.headerStudentRegistrationList}>
            <div className={styles.headerID}>#</div>
            <div className={styles.headerName}>Name</div>
            <div className={styles.headerEmail}>Email</div>
            <div className={styles.headerStatus}>Status</div>
            <div className={styles.headerAction}>Action</div>
          </div>
          {studentRegistrationList?.map((element, index) => {
                  return (
                    <div className={styles.itemStudentRegistrationList} key={element.id}>
                      <div className={styles.itemID}>{index + 1}</div>
                      <div className={styles.itemName}>{element.userName}</div>
                      <div className={styles.itemEmail}>{element.email}</div>
                      {element.isStatus ? (
                        <div className={styles.itemStatusAndAction}>
                          <div className={styles.itemStatus}>
                            <div className={styles.tagStatusActive}>Active</div>
                          </div>
                          <div className={styles.itemAction}>
                            <button className={styles.buttonActionDelete}>
                              Block
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.itemStatusAndAction}>
                          <div className={styles.itemStatus}>
                            <div className={styles.tagStatusDeActive}>
                              De-Active
                            </div>
                          </div>
                          <div className={styles.itemAction}>
                            <button className={styles.buttonActionDelete}>
                              Un-Block
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
        </div>
      </div>
      <div className={styles.StudentRegistrationListPaging}></div>
    </div>
  );
}

export default StudentRegistrationList;
