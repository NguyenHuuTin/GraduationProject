import React, { useEffect, useState } from "react";
import styles from "./SubscriptionList.module.css";
import axios from "axios";

function SubscriptionList(props) {
  const [SubscriptionList, setSubscriptionList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/Subscription")
      .then((res) => {
        setSubscriptionList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setSubscriptionList([]);
      });
  }, []);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(SubscriptionList);

  useEffect(() => {
    if (search === "") {
      setFilter(SubscriptionList);
    } else {
      var filterList = SubscriptionList.filter((object) => {
        return (
          object.studentName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          object.instructorName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          object.dateTime.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      });
      setFilter(filterList);
    }
  }, [search, SubscriptionList]);

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
    <div className={styles.cardSubscriptionList}>
      <div className={styles.SubscriptionListTitle}>Subscription List</div>
      <div className={styles.SubscriptionList}>
        <div className={styles.SubscriptionListButtonSearch}>
          <div className={styles.SubscriptionListButton}>
            <button className={styles.SubscriptionButton}>Copy</button>
            <button className={styles.SubscriptionButton}>CSV</button>
            <button className={styles.SubscriptionButton}>Excel</button>
            <button className={styles.SubscriptionButton}>Print</button>
          </div>
          <div className={styles.SubscriptionListSearch}>
            <div className={styles.SubscriptionTitleSearch}>Search:</div>
            <div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.SubscriptionInputSearch}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className={styles.SubscriptionListAll}>
          <div className={styles.headerSubscriptionList}>
            <div className={styles.headerID}>#</div>
            <div className={styles.headerName}>Student Name</div>
            <div className={styles.headerInstructorName}>Instructor Name</div>
            <div className={styles.headerDate}>Date</div>
          </div>
          {filter.slice(firstIndex, lastIndex)?.map((element, index) => {
            return (
              <div className={styles.itemSubscriptionList} key={element.id}>
                <div className={styles.itemID}>{index + 1}</div>
                <div className={styles.itemName}>{element.studentName}</div>
                <div className={styles.itemInstructorName}>
                  {element.instructorName}
                </div>
                <div className={styles.itemDate}>{element.dateTime}</div>
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

export default SubscriptionList;
