import React, { useEffect, useState } from "react";
import styles from "./CategoryList.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function CategoryList(props) {
  const [CategoryList, setCategoryList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/Category")
      .then((res) => {
        setCategoryList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setCategoryList([]);
      });
  }, []);
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
          {CategoryList?.map((element, index) => {
            return (
              <div className={styles.itemCategoryList} key={element.id}>
                <div className={styles.itemID}>{index + 1}</div>
                <div className={styles.itemName}>{element.name}</div>
                <div className={styles.itemStatus}>
                  {element.status ? 
                  <div className={styles.tagStatusActive}>
                    Active
                  </div>
                  :
                  <div className={styles.tagStatusDeActive}>
                    De-Active
                  </div>
                  }
                  
                </div>
                <div className={styles.itemAction}>
                  <Link to={"edit"}>
                      <button className={styles.buttonActionEdit}>
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                  </Link>
                  <button className={styles.buttonActionDelete}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.categoryListPaging}></div>
    </div>
  );
}

export default CategoryList;
