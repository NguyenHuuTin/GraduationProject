import React, { useEffect, useState } from "react";
import styles from "./AllCourse.module.css";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Link } from "react-router-dom";

function AllCourse(props) {
  const [status, setStatus] = useState(false);
  const [CourseList, setCourseList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/Course")
      .then((res) => {
        setCourseList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setCourseList([]);
      });
  }, [status]);

  const handleActive = (id) => {
    axios
      .put(`http://localhost:57678/Courses/Active/${id}`)
      .then(() => {
        setStatus((prev) => !prev);
        NotificationManager.success("Active course successfully!");
      })
      .catch(() => {
        NotificationManager.error("Active course failed!");
      });
  };

  const handleBlock = (id) => {
    axios
      .put(`http://localhost:57678/Courses/Block/${id}`)
      .then(() => {
        setStatus((prev) => !prev);
        NotificationManager.success("Block course successfully!");
      })
      .catch(() => {
        NotificationManager.error("Block course failed!");
      });
  };

  const handleReject = (id) => {
    axios
      .put(`http://localhost:57678/Courses/Reject/${id}`)
      .then(() => {
        setStatus((prev) => !prev);
        NotificationManager.success("Reject course successfully!");
      })
      .catch(() => {
        NotificationManager.error("Reject course failed!");
      });
  };

  // Hook action Search
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(CourseList);

  useEffect(() => {
    if (search === "") {
      setFilter(CourseList);
    } else {
      var filterList = CourseList.filter((object) => {
        return object.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setFilter(filterList);
    }
  }, [search, CourseList]);

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
    <div className={styles.cardCourseList}>
      <div className={styles.CourseListTitle}>Course List</div>
      <div className={styles.CourseList}>
        <div className={styles.CourseListButtonSearch}>
          <div className={styles.CourseListButton}>
            <button className={styles.CourseButton}>Copy</button>
            <button className={styles.CourseButton}>CSV</button>
            <button className={styles.CourseButton}>Excel</button>
            <button className={styles.CourseButton}>Print</button>
          </div>
          <div className={styles.CourseListSearch}>
            <div className={styles.CourseTitleSearch}>Search:</div>
            <div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.CourseInputSearch}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className={styles.CourseListAll}>
          <div className={styles.headerCourseList}>
            <div className={styles.headerID}>#</div>
            <div className={styles.headerTitle}>Title</div>
            <div className={styles.headerCategory}>Category</div>
            <div className={styles.headerPrice}>Price</div>
            <div className={styles.headerStatus}>Status</div>
            <div className={styles.headerUpdate}>Last Update</div>
            <div className={styles.headerAction}>Action</div>
          </div>
          {filter.slice(firstIndex, lastIndex)?.map((element, index) => {
            return (
              <div className={styles.itemCourseList} key={element.id}>
                <div className={styles.itemID}>{index + 1}</div>
                <div className={styles.itemTitle}>{element.title}</div>
                <div className={styles.itemCategory}>{element.category}</div>
                <div className={styles.itemPrice}>{element.price}</div>
                <div className={styles.itemStatus}>{element.status}</div>
                <div className={styles.itemUpdate}>{element.updateAt}</div>
                {element.status === "Waiting for approved" ? (
                  <div className={styles.itemAction}>
                    <Link to={`${element.id}`}>
                      <button className={styles.buttonActionView}>View</button>
                    </Link>

                    <button
                      className={styles.buttonActionActive}
                      onClick={() => {
                        handleActive(element.id);
                      }}
                    >
                      Active
                    </button>
                    <NotificationContainer />
                    <button
                      className={styles.buttonActionReject}
                      onClick={() => {
                        handleReject(element.id);
                      }}
                    >
                      Reject
                    </button>
                    <NotificationContainer />
                  </div>
                ) : element.status === "Active" ? (
                  <div className={styles.itemAction}>
                    <Link to={`${element.id}`}>
                      <button className={styles.buttonActionView}>View</button>
                    </Link>
                    <button
                      className={styles.buttonActionBlock}
                      onClick={() => {
                        handleBlock(element.id);
                      }}
                    >
                      Block
                    </button>
                    <NotificationContainer />
                  </div>
                ) : element.status === "Block" ? (
                  <div className={styles.itemAction}>
                    <Link to={`${element.id}`}>
                      <button className={styles.buttonActionView}>View</button>
                    </Link>
                    <button
                      className={styles.buttonActionBlock}
                      onClick={() => {
                        handleActive(element.id);
                      }}
                    >
                      UnBlock/Active
                    </button>
                    <NotificationContainer />
                  </div>
                ) : element.status === "Reject" ? (
                  <div className={styles.itemAction}>
                    <Link to={`${element.id}`}>
                      <button className={styles.buttonActionView}>View</button>
                    </Link>
                    <button
                      className={styles.buttonActionActive}
                      onClick={() => {
                        handleActive(element.id);
                      }}
                    >
                      Active
                    </button>
                    <NotificationContainer />
                  </div>
                ) : (
                  <div className={styles.itemAction}></div>
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
  );
}

export default AllCourse;
