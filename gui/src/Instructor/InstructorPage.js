import React from "react";
import styles from "./InstructorPage.module.css";
import Menu from "./Layout/Menu/Menu";
import Header from "./Layout/Header/Header";
import Content from "./Layout/Content/Content";

function InstructorPage(props) {
  return (
    <div className={styles.app}>
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <Header />
        </div>
        <div className={styles.AppBody}>
          <Menu />
          <Content />
        </div>
      </div>
    </div>
  );
}

export default InstructorPage;
