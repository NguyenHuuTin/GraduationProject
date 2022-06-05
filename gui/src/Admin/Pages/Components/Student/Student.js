import React, { useEffect, useState } from "react";
import styles from "./Student.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Student(props) {
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/Student")
      .then((res) => {
        setStudentList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setStudentList([]);
      });
  }, []);
  return (
    <div className={styles.cardContentStudent}>
      <div className={styles.cardHeaderStudent}>
        <h2 className={styles.headerTitleStudent}>Student</h2>
        <div className={styles.headerPathStudent}>
          <div className={styles.headerPathItemStudent}>
            <Link to={".."} className={styles.itemContentStudentActive}>
              Home
            </Link>
          </div>
          /
          <div className={styles.headerPathItemStudent}>
            <Link to={"/student"} className={styles.itemContentStudent}>
              Student
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.StudentMain}>
        <div className={styles.StudentMainStudentList}>
          {/* studentlist */}
          <div className={styles.cardStudentList}>
            <div className={styles.StudentListTitle}>Student List</div>
            <div className={styles.StudentList}>
              <div className={styles.StudentListButtonSearch}>
                <div className={styles.StudentListButton}>
                  <button className={styles.StudentButton}>Copy</button>
                  <button className={styles.StudentButton}>CSV</button>
                  <button className={styles.StudentButton}>Excel</button>
                  <button className={styles.StudentButton}>Print</button>
                </div>
                <div className={styles.StudentListSearch}>
                  <div className={styles.StudentTitleSearch}>Search:</div>
                  <div>
                    <input
                      className={styles.StudentInputSearch}
                      placeholder="Search..."
                    />
                  </div>
                </div>
              </div>
              <div className={styles.StudentListAll}>
                <div className={styles.headerStudentList}>
                  <div className={styles.headerID}>#</div>
                  <div className={styles.headerName}>Name</div>
                  <div className={styles.headerEmail}>Email</div>
                  <div className={styles.headerStatus}>Status</div>
                  <div className={styles.headerAction}>Action</div>
                </div>
                {studentList?.map((element, index) => {
                  return (
                    <div className={styles.itemStudentList} key={element.id}>
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
            <div className={styles.StudentListPaging}></div>
          </div>

          {/* studentlist */}
        </div>
      </div>
    </div>
  );
}

export default Student;
