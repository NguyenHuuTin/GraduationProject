import React, { useEffect, useState } from "react";
import styles from "./Category.module.css";
import CategoryList from "./CategoryList/CategoryList";
import { Link, Route, Routes } from "react-router-dom";
import AddNewCategory from "./AddNewCategory/AddNewCategory";
import EditCategory from "./EditCategory/EditCategory";
import axios from "axios";

function Category(props) {
  const [categoryList, setCategoryList] = useState([]);
  const [status, setStatus] = useState(false);

  const handleStatus = () => {
    setStatus((prev) => !prev);
  };
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
  }, [status]);
  return (
    <div className={styles.cardContentCategory}>
      <div className={styles.cardHeaderCategory}>
        <h2 className={styles.headerTitleCategory}>Category</h2>
        <div className={styles.headerPathCategory}>
          <div className={styles.headerPathItemCategory}>
            <Link to={".."} className={styles.itemContentCategoryActive}>
              Home
            </Link>
          </div>
          /
          <div className={styles.headerPathItemCategory}>
            <Link to={"/category"} className={styles.itemContentCategory}>
              Category
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.CategoryMain}>
        <div className={styles.CategoryMainCategoryList}>
          <CategoryList handleStatus={handleStatus} list={categoryList}/>
        </div>
        <div className={styles.CategoryMainAddNewCategory}>
          <Routes>
            <Route index element={<AddNewCategory handleStatus={handleStatus} />} />
            <Route path="edit/:id" element={<EditCategory handleStatus={handleStatus}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Category;
