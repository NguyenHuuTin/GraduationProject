import React, { useEffect, useState } from "react";
import styles from "./Student.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function Student(props) {
  const [status, setStatus] = useState(false);
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
  }, [status]);

  const handleActive = (id) => {
    axios
      .put(`http://localhost:57678/Student`,{
        id: id,
        isStatus: true
      })
      .then(() => {
        setStatus((prev) => !prev);
        NotificationManager.success("Active student successfully!");
      })
      .catch(() => {
        NotificationManager.error("Active student failed!");
      });
  };

  const handleBlock = (id) => {
    axios
      .put(`http://localhost:57678/Student`,{
        id: id,
        isStatus: false
      })
      .then(() => {
        setStatus((prev) => !prev);
        NotificationManager.success("Block student successfully!");
      })
      .catch(() => {
        NotificationManager.error("Block student failed!");
      });
  };

  // Hook action Search
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(studentList);

  useEffect(() => {
    if (search === "") {
      setFilter(studentList);
    } else {
      var filterList = studentList.filter((object) => {
        return (object.userName.toLowerCase().indexOf(search.toLowerCase()) > -1) || (object.email.toLowerCase().indexOf(search.toLowerCase()) > -1);
      });
      setFilter(filterList);
    }
  }, [search, studentList]);

  // Paging
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const count = 10;
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Hook action paging
  useEffect(() => {
    var mod = filter.length % count;
    if (mod === 0) {
      setTotalPage(filter.length / count);
    } else {
      setTotalPage(Math.floor(filter.length / count) + 1);
    }
    setLastIndex(currentPage * count);
    setFirstIndex(lastIndex - count);
  }, [filter.length, currentPage, lastIndex]);
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
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
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
                {filter.slice(firstIndex, lastIndex)?.map((element, index) => {
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
                            <button
                              className={styles.buttonActionDelete}
                              onClick={() => {
                                handleBlock(element.id);
                              }}
                            >
                              Block
                            </button>
                            <NotificationContainer />
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
                            <button
                              className={styles.buttonActionActive}
                              onClick={() => {
                                handleActive(element.id);
                              }}
                            >
                              Un-Block
                            </button>
                            <NotificationContainer />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.listPaging}>
              <div className={styles.showPage}>
                Showing page {currentPage} of {totalPage}
              </div>
              <div className={styles.btnPage}>
                <button
                  disabled={currentPage === 1}
                  className={styles.btnPrev}
                  onClick={handlePrev}
                >
                  Prev
                </button>
                <button
                  disabled={currentPage === totalPage}
                  className={styles.btnNext}
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* studentlist */}
        </div>
      </div>
    </div>
  );
}

export default Student;
