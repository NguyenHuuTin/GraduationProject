import React, { useEffect, useState } from "react";
import styles from "./Instructor.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Instructor(props) {
  const [instructorList, setInstructorList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/Instructor")
      .then((res) => {
        setInstructorList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setInstructorList([]);
      });
  }, []);
  return (
    <div className={styles.cardContentInstructor}>
      <div className={styles.cardHeaderInstructor}>
        <h2 className={styles.headerTitleInstructor}>Instructor</h2>
        <div className={styles.headerPathInstructor}>
          <div className={styles.headerPathItemInstructor}>
            <Link to={".."} className={styles.itemContentInstructorActive}>
              Home
            </Link>
          </div>
          /
          <div className={styles.headerPathItemInstructor}>
            <Link to={"/Instructor"} className={styles.itemContentInstructor}>
              Instructor
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.InstructorMain}>
        <div className={styles.InstructorMainInstructorList}>
          {/* Instructorlist */}
          <div className={styles.cardInstructorList}>
            <div className={styles.InstructorListTitle}>Instructor List</div>
            <div className={styles.InstructorList}>
              <div className={styles.InstructorListButtonSearch}>
                <div className={styles.InstructorListButton}>
                  <button className={styles.InstructorButton}>Copy</button>
                  <button className={styles.InstructorButton}>CSV</button>
                  <button className={styles.InstructorButton}>Excel</button>
                  <button className={styles.InstructorButton}>Print</button>
                </div>
                <div className={styles.InstructorListSearch}>
                  <div className={styles.InstructorTitleSearch}>Search:</div>
                  <div>
                    <input
                      className={styles.InstructorInputSearch}
                      placeholder="Search..."
                    />
                  </div>
                </div>
              </div>
              <div className={styles.InstructorListAll}>
                <div className={styles.headerInstructorList}>
                  <div className={styles.headerID}>#</div>
                  <div className={styles.headerName}>Name</div>
                  <div className={styles.headerEmail}>Email</div>
                  <div className={styles.headerStatus}>Status</div>
                  <div className={styles.headerAction}>Action</div>
                </div>
                {instructorList?.map((element, index) => {
                  return (
                    <div className={styles.itemInstructorList} key={element.id}>
                      <div className={styles.itemID}>{index + 1}</div>
                      <div className={styles.itemName}>{element.name}</div>
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
                            <button className={styles.buttonActionView}>
                              <i className="fa-solid fa-eye"/>
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
            <div className={styles.InstructorListPaging}></div>
          </div>

          {/* Instructorlist */}
        </div>
      </div>
    </div>
  );
}

export default Instructor;
