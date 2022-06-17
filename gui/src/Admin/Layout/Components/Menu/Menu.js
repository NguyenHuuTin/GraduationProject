import React, { useState } from "react";
import styles from "./Menu.module.css";
import { Link } from "react-router-dom";

function Menu(props) {
  // click item report
  const [clickReport, setClickReport] = useState(false);
  // const [styleItemReport, setStyleItemReport] = useState("itemMenu");

  const handleReport = () => {
    setClickReport((prev) => !prev);
  };

  // useEffect(() => {
  //   if (clickReport) {
  //     setStyleItemReport("itemMenuClick");

  //   } else {
  //     setStyleItemReport("itemMenu");

  //   }
  // }, [clickReport]);

  // click item course
  const [clickCourse, setClickCourse] = useState(false);
  // const [styleItemCourse, setStyleItemCourse] = useState("itemMenu");


  const handleCourse = () => {
    setClickCourse((prev) => !prev);
  };

  // useEffect(() => {
  //   if (clickCourse) {
  //     setStyleItemCourse("itemMenuClick");

  //   } else {
  //     setStyleItemCourse("itemMenu");

  //   }
  // }, [clickCourse]);
  return (
    <div className={styles.wrapperMain} tabIndex={1}>
      <aside className={styles.asideMenu}>
        <div className={styles.sidebarBrand}>
          <Link to="/" className={styles.logo}>
            CURSES
          </Link>
        </div>
        <div className={styles.menu}>
          <div className={styles.itemMenu}>
            <Link to={"/admin"}>
              <i className="fa-solid fa-gauge-high"></i>
              <p className={styles.contentItem}>Dashboard</p>
            </Link>
          </div>
          <div className={styles.menuTitle}>STARTER</div>
          <div className={styles.itemMenu}>
            <Link to={"user"}>
              <i className="fa-solid fa-users"></i>
              <p className={styles.contentItem}>User</p>
            </Link>
          </div>
          <div className={styles.itemMenu}>
            <Link to={"language"}>
              <i className="fa-solid fa-language"></i>
              <p className={styles.contentItem}>Languages</p>
            </Link>
          </div>
          <div className={styles.itemMenu}>
            <Link to={"category"}>
              <i className="fa-solid fa-list"></i>
              <p className={styles.contentItem}>Categories</p>
            </Link>
          </div>
          <div className={styles.itemMenu}>
            <Link to={"subcategory"}>
              <i className="fa-solid fa-boxes-stacked"></i>
              <p className={styles.contentItem}>Sub Categories</p>
            </Link>
          </div>
          <div className={styles.menuTitle}>STUDENT</div>
          <div className={styles.itemMenu}>
            <Link to={"student"}>
              <i className="fa-solid fa-user"></i>
              <p className={styles.contentItem}>Student</p>
            </Link>
          </div>
          <div className={styles.menuTitle}>INSTRUCTOR</div>
          <div className={styles.itemMenu}>
            <Link to={"instructor"}>
              <i className="fa-solid fa-chalkboard-user"></i>
              <p className={styles.contentItem}>Instructor</p>
            </Link>
          </div>
          <div className={styles.itemMenu}>
            <Link to={"payout"}>
              <i className="fa-solid fa-hand-holding-dollar"></i>
              <p className={styles.contentItem}>Payout</p>
            </Link>
          </div>
          <div className={styles.itemMenu}>
            <div onClick={handleCourse} className={styles.itemReport}>
              <div className={styles.iconReport}>
                <i className="fa-solid fa-book"></i>
              </div>
              <div className={styles.contentItem}>Course</div>
              {/* <i className={itemDropdownCourse}></i> */}
            </div>
            {clickCourse && (
              <div className={styles.dropdownReport}>
                <Link
                  to={"course"}
                  onClick={handleCourse}
                  className={styles.dropdownItem}
                >
                  All Course
                </Link>
                <Link
                  to={"course/wait"}
                  onClick={handleCourse}
                  className={styles.dropdownItem}
                >
                  Waiting for Approve
                </Link>
                <Link
                  to={"course/active"}
                  onClick={handleCourse}
                  className={styles.dropdownItem}
                >
                  Active course
                </Link>
                <Link
                  to={"course/block"}
                  onClick={handleCourse}
                  className={styles.dropdownItem}
                >
                  Block course
                </Link>
                <Link
                  to={"course/reject"}
                  onClick={handleCourse}
                  className={styles.dropdownItem}
                >
                  Reject course
                </Link>
              </div>
            )}
          </div>
          <div className={styles.menuTitle}>EXTRA</div>
          <div className={styles.itemMenu}>
            <a href=".">
              <i className="fa-solid fa-gear"></i>
              <p className={styles.contentItem}>Settings</p>
            </a>
          </div>
          <div className={styles.itemMenu}>
            <div onClick={handleReport} className={styles.itemReport}>
              <div className={styles.iconReport}>
                <i className="fa-solid fa-file-word"></i>
              </div>
              <div className={styles.contentItem}>Report</div>
              {/* <i className={itemDropdown}></i> */}
            </div>
            {clickReport && (
              <div className={styles.dropdownReport}>
                <Link
                  to={"courseSelling"}
                  onClick={handleReport}
                  className={styles.dropdownItem}
                >
                  Course Selling
                </Link>
                <Link
                  to={"subscription"}
                  onClick={handleReport}
                  className={styles.dropdownItem}
                >
                  Subscription
                </Link>
                <Link
                  to={"instructorRegistration"}
                  onClick={handleReport}
                  className={styles.dropdownItem}
                >
                  Instructor Registration
                </Link>
                <Link
                  to={"studentRegistration"}
                  onClick={handleReport}
                  className={styles.dropdownItem}
                >
                  Student Registration
                </Link>
              </div>
            )}
          </div>
          <div className={styles.itemMenu}>
            <a href="./">
              <i className="fa-solid fa-comment"></i>
              <p className={styles.contentItem}>Feedback</p>
            </a>
          </div>
          <div className={styles.itemMenu}>
            <a href="./">
              <i className="fa-solid fa-bell"></i>
              <p className={styles.contentItem}>Notification Template</p>
            </a>
          </div>
          <div className={styles.itemMenu}>
            <a href="./">
              <i className="fa-solid fa-circle-question"></i>
              <p className={styles.contentItem}>FAQ</p>
            </a>
          </div>
        </div>
        <div className={styles.forceOverflow}></div>
      </aside>
    </div>
  );
}

export default Menu;
