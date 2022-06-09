import React, { useEffect, useState } from "react";
import styles from "./CategoryList.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function CategoryList(props) {
  const [id, setId] = useState("");

  //Hook action Delete
  useEffect(() => {
    if (id !== "") {
      if (window.confirm("Do you want delete this user")) {
        axios
          .delete(`http://localhost:57678/DeleteCategory/${id}`)
          .then((res) => {
            NotificationManager.success("Delete user successfully!");
            props.handleStatus();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [id]);

  // Hook action Search
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(props.list);
  console.log("this is languageList", filter);
  useEffect(() => {
    if (search === "") {
      setFilter(props.list);
    } else {
      var filterList = props.list.filter((object) => {
        return object.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setFilter(filterList);
    }
  },[search, props.list]);

  // Paging
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const count = 6;
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
  },[filter.length, currentPage, lastIndex]);
  return (
    <div className={styles.cardCategoryList}>
      <div className={styles.categoryListTitle}>Categories List</div>
      <div className={styles.categoryList}>
        <div className={styles.categoryListButtonSearch}>
          <div className={styles.categoryListButton}>
            <button className={styles.categoryButton}>Copy</button>
            <button className={styles.categoryButton}>CSV</button>
            <button className={styles.categoryButton}>Excel</button>
            <button className={styles.categoryButton}>Print</button>
          </div>
          <div className={styles.categoryListSearch}>
            <div className={styles.categoryTitleSearch}>Search:</div>
            <div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.categoryInputSearch}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className={styles.categoryListAll}>
          <div className={styles.headerCategoryList}>
            <div className={styles.headerID}>#</div>
            <div className={styles.headerName}>Name</div>
            <div className={styles.headerStatus}>Status</div>
            <div className={styles.headerAction}>Action</div>
          </div>
          {filter.slice(firstIndex, lastIndex)?.map((element, index) => {
            return (
              <div className={styles.itemCategoryList} key={element.id}>
                <div className={styles.itemID}>{index + 1}</div>
                <div className={styles.itemName}>{element.name}</div>
                <div className={styles.itemStatus}>
                  {element.status ? (
                    <div className={styles.tagStatusActive}>Active</div>
                  ) : (
                    <div className={styles.tagStatusDeActive}>De-Active</div>
                  )}
                </div>
                <div className={styles.itemAction}>
                  <Link to={`edit/${element.id}`}>
                    <button className={styles.buttonActionEdit}>
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  </Link>
                  <button
                    className={styles.buttonActionDelete}
                    value={id}
                    onClick={() => {
                      setId(element.id);
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <NotificationContainer />
                </div>
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

export default CategoryList;
