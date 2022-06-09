import React from "react";
import styles from "./Admin.module.css";
import Menu from "./Layout/Components/Menu/Menu";
import Header from "./Layout/Components/Header/Header";
import Content from "./Layout/Components/Content/Content";
import { Outlet } from "react-router-dom";

function Admin(props) {
  return (
    <div className={styles.app}>
      <div className={styles.appMenu}>
        <Menu />
      </div>
      <div className={styles.AppBody}>
        <Header />
        <Content>
        </Content>
      </div>
    </div>
  );
}

export default Admin;
