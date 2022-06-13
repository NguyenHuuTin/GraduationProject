import React, {useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header(props) {
  const [dropdown, setDropdown] = useState(false);
  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };
  var token = localStorage.token
  return (
    <div className={styles.header}>
      <div className={styles.body}>
        <i className="fa-solid fa-bars"></i>
        <div className={styles.account}>
          <div className={styles.itemHeader}>
            <i className="fa-solid fa-language"></i>
          </div>
          <div className={styles.itemHeader}>
            <img
              alt="img_user"
              className={styles.imageUser}
              src="https://www.kindpng.com/picc/m/24-248442_female-user-avatar-woman-profile-member-user-profile.png"
            />
            <p className={styles.user}>Hi, Admin</p>
          </div>
          <div className={styles.itemHeader} onClick={handleDropdown}>
            <i className="fa-solid fa-caret-down"></i>
            {dropdown && (
              <div className={styles.dropdownContentClick}>
                <div className={styles.itemLogout}>
                    LOGGED IN
                </div>
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
                  <Link to={"/login/signin"} className={styles.linkLog}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    {token ? "Log out" : "Log in"}
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
