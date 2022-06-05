import React from "react";
import styles from "./Category.module.css";
import CategoryList from "./CategoryList/CategoryList";
import { Link, Outlet } from "react-router-dom";

function Category(props) {
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
          <CategoryList />
        </div>
        <div className={styles.CategoryMainAddNewCategory}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Category;
