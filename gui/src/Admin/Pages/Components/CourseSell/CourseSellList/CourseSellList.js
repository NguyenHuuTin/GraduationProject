import React, { useEffect, useState } from "react";
import styles from "./CourseSellList.module.css";
import axios from "axios";

function CourseSellList(props) {
  const [courseSellList, setCourseSellList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/CourseSeller")
      .then((res) => {
        setCourseSellList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setCourseSellList([]);
      });
  }, []);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(courseSellList);

  useEffect(() => {
    if (search === "") {
      setFilter(courseSellList);
    } else {
      var filterList = courseSellList.filter((object) => {
        return (
          object.studentName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          object.courseTitle.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          object.dateTime.toLowerCase().indexOf(search.toLowerCase()) > -1 
        );
      });
      setFilter(filterList);
    }
  }, [search, courseSellList]);

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
    <div className={styles.cardCourseSellList}>
      <div className={styles.CourseSellListTitle}>CourseSell List</div>
      <div className={styles.CourseSellList}>
        <div className={styles.CourseSellListButtonSearch}>
          <div className={styles.CourseSellListButton}>
            <button className={styles.CourseSellButton}>Copy</button>
            <button className={styles.CourseSellButton}>CSV</button>
            <button className={styles.CourseSellButton}>Excel</button>
            <button className={styles.CourseSellButton}>Print</button>
          </div>
          <div className={styles.CourseSellListSearch}>
            <div className={styles.CourseSellTitleSearch}>Search:</div>
            <div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.CourseSellInputSearch}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className={styles.CourseSellListAll}>
          <div className={styles.headerCourseSellList}>
            <div className={styles.headerID}>#</div>
            <div className={styles.headerName}>Student Name</div>
            <div className={styles.headerTitle}>Course Title</div>
            <div className={styles.headerDate}>Date</div>
            <div className={styles.headerPrice}>Price</div>
          </div>
          {filter.slice(firstIndex, lastIndex)?.map((element, index) => {
            return (
              <div className={styles.itemCourseSellList} key={element.id}>
                <div className={styles.itemID}>{index + 1}</div>
                <div className={styles.itemName}>{element.studentName}</div>
                <div className={styles.itemTitle}>{element.courseTitle}</div>
                <div className={styles.itemDate}>{element.dateTime}</div>
                <div className={styles.itemPrice}>{element.price}</div>
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

export default CourseSellList;
