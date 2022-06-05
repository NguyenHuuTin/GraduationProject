import React from "react";
import styles from  "./Content.module.css";
import Dashboard from "../../../Admin/Pages/Components/Dashboard/Dashboard";

function Content(props) {
  return (
    <div className={styles.content}>
      
        <Dashboard/>
      
    </div>
  );
}

export default Content;
