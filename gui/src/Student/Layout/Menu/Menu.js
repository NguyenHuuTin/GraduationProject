import React from "react";
import styles from "./Menu.module.css";
import { Link } from "react-router-dom";

function Menu(props) {
  return (
    <div className={styles.wrapperMain} tabIndex={1}>
      <aside className={styles.asideMenu}>
        <div className={styles.menu}>
          <div >
            <Link to={"."} className={styles.itemMenu}>
              <i className="fa-solid fa-home"></i>
              <p className={styles.contentItem}>Home</p>
            </Link>
          </div>
          <div >
            <Link to={"instructorList"} className={styles.itemMenu}>
              <i className="fa-solid fa-chalkboard-user"></i>
              <p className={styles.contentItem}>Instructor</p>
            </Link>
          </div>
          <div>
            <Link to={"topic"} className={styles.itemMenu}>
              <i className="fa-solid fa-layer-group"></i>
              <p className={styles.contentItem}>Topic</p>
            </Link>
          </div>
          
        </div>
      </aside>
    </div>
  );
}

export default Menu;
