import React, { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header(props) {
  const [dropdown, setDropdown] = useState(false);
  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <div className={styles.header}>
      <div className={styles.body}>
        <div className={styles.menuTitleBar}>
          <div className={styles.menuBar}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className={styles.titleHeader}>COURSES</div>
        </div>
        <div className={styles.account}>
          <div className={styles.itemHeader}>
            <button className={styles.btnCreateNewCourse}>
              Create New Course
            </button>
          </div>
          <div className={styles.itemHeader}>
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className={styles.itemHeader}>
            <i className="fa-solid fa-bell"></i>
          </div>
          <div className={styles.itemHeader} onClick={handleDropdown}>
            <img
              alt="img_user"
              className={styles.imageUser}
              src="https://www.kindpng.com/picc/m/24-248442_female-user-avatar-woman-profile-member-user-profile.png"
            />
            {dropdown && (
              <div className={styles.dropdownContentClick}>
                <div className={styles.itemLogout}>LOGGED IN</div>
                <div className={styles.itemLogout}>
                  <Link to={"profile"} className={styles.link}>
                    <i className="fa-solid fa-user"></i>
                    Profile
                  </Link>
                </div>
                <div className={styles.itemLogout}>
                  <Link to={"profile"} className={styles.link}>
                    <i className="fa-solid fa-gear"></i>
                    Setting
                  </Link>
                </div>
                <div className={styles.itemLogout}>
                  <Link to={"login"} className={styles.linkLog}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Log out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
