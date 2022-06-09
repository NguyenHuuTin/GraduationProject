import React, { useEffect, useState } from "react";
import styles from "./Instructor.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function Instructor(props) {
  const [status, setStatus] = useState(false);
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
  }, [status]);

  const handleChangeStatus = (id) => {
    axios
      .put(`http://localhost:57678/instructor/change-block/${id}`)
      .then(() => {
        setStatus((prev) => !prev);
        NotificationManager.success("Successfully!");
      })
      .catch(() => {
        NotificationManager.error("Failed!");
      });
  };

  // Hook action Search
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(instructorList);

  useEffect(() => {
    if (search === "") {
      setFilter(instructorList);
    } else {
      var filterList = instructorList.filter((object) => {
        return (
          object.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          object.email.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      });
      setFilter(filterList);
    }
  }, [search, instructorList]);

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
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
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
                {filter.slice(firstIndex, lastIndex)?.map((element, index) => {
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
                            <button
                              className={styles.buttonActionDelete}
                              onClick={() => {
                                handleChangeStatus(element.id);
                              }}
                            >
                              Block
                            </button>
                            <NotificationContainer />
                            <Link to={`${element.id}`}>
                              <button className={styles.buttonActionView}>
                                <i className="fa-solid fa-eye"/>
                              </button>
                            </Link>
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
                                handleChangeStatus(element.id);
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

          {/* Instructorlist */}
        </div>
      </div>
    </div>
  );
}

export default Instructor;
