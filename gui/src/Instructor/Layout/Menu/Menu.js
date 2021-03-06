import React from "react";
import styles from "./Menu.module.css";
import { Link } from "react-router-dom";

function Menu(props) {
  return (
    <div className={styles.wrapperMain} tabIndex={1}>
      <aside className={styles.asideMenu}>
        <div className={styles.menu}>
          <div className={styles.itemMenu}>
            <Link to={"."} className={styles.linkItem}>
              <i className="fa-solid fa-gauge-high"></i>
              <p className={styles.contentItem}>Dashboard</p>
            </Link>
          </div>
          <div className={styles.itemMenu}>
            <Link to={"course"} className={styles.linkItem}>
              <i className="fa-solid fa-book"></i>
              <p className={styles.contentItem}>Courses</p>
            </Link>
          </div>
          <div className={styles.itemMenu}>
            <Link to={"createNewCourse"} className={styles.linkItem}>
              <i className="fa-solid fa-circle-plus"></i>
              <p className={styles.contentItem}>Create Course</p>
            </Link>
          </div>
          <div className={styles.itemMenu}>
            <Link to={"comment"} className={styles.linkItem}>
              <i className="fa-brands fa-facebook-messenger"></i>
              <p className={styles.contentItem}>Comment</p>
            </Link>
          </div>
          <div className={styles.itemMenu}>
            <Link to={"students"} className={styles.linkItem}>
              <i className="fa-solid fa-message"></i>
              <p className={styles.contentItem}>Students</p>
            </Link>
          </div>
          {/* <div className={styles.itemMenu}>
            <Link to={"."}>
              <i className="fa-solid fa-bell"></i>
              <p className={styles.contentItem}>Notification</p>
            </Link>
          </div>
          <div className={styles.itemMenu}>
            <Link to={"."}>
              <i className="fa-solid fa-photo-film"></i>
              <p className={styles.contentItem}>Live</p>
            </Link>
          </div>
          <div className={styles.itemMenu}>
            <Link to={"."}>
              <i className="fa-solid fa-star"></i>
              <p className={styles.contentItem}>Reviews</p>
            </Link>
          </div> */}
          <div className={styles.itemMenu}>
            <Link to={"earning"} className={styles.linkItem}>
              <i className="fa-solid fa-dollar-sign"></i>
              <p className={styles.contentItem}>Earnings</p>
            </Link>
          </div>
          <div className={styles.itemMenu}>
            <Link to={"payout"} className={styles.linkItem}>
              <i className="fa-solid fa-hand-holding-dollar"></i>
              <p className={styles.contentItem}>Payout</p>
            </Link>
          </div>
          {/* <div className={styles.itemMenu}>
            <a href=".">
              <i className="fa-solid fa-gear"></i>
              <p className={styles.contentItem}>Setting</p>
            </a>
          </div>
          <div className={styles.itemMenu}>
            <a href=".">
              <i className="fa-solid fa-circle-question"></i>
              <p className={styles.contentItem}>Help</p>
            </a>
          </div> */}
          
          
        </div>
        <div className={styles.forceOverflow}></div>
      </aside>
    </div>
  );
}

export default Menu;
