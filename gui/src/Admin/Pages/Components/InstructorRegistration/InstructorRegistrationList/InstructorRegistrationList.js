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

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(instructorRegistrationList);

  useEffect(() => {
    if (search === "") {
      setFilter(instructorRegistrationList);
    } else {
      var filterList = instructorRegistrationList.filter((object) => {
        return (
          object.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          object.email.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      });
      setFilter(filterList);
    }
  }, [search, instructorRegistrationList]);

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
          {filter.slice(firstIndex, lastIndex)?.map((element, index) => {
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

export default InstructorRegistrationList;
