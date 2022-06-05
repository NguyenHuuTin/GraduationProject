import React, { useEffect, useState } from "react";
import styles from "./UserList.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList(props) {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/Users")
      .then((res) => {
        setUserList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setUserList([]);
      });
  }, []);
  return (
    <div className={styles.cardUserList}>
      <div className={styles.userListTitle}>Users List</div>
      <div className={styles.userList}>
        <div className={styles.userListButtonSearch}>
          <div className={styles.userListButton}>
            <button className={styles.userButton}>Copy</button>
            <button className={styles.userButton}>CSV</button>
            <button className={styles.userButton}>Excel</button>
            <button className={styles.userButton}>Print</button>
          </div>
          <div className={styles.userListSearch}>
            <div className={styles.userTitleSearch}>Search:</div>
            <div>
              <input
                className={styles.userInputSearch}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className={styles.userListAll}>
          <div className={styles.headerUserList}>
            <div className={styles.headerID}>#</div>
            <div className={styles.headerName}>Name</div>
            <div className={styles.headerRole}>Role</div>
            <div className={styles.headerAction}>Action</div>
          </div>
          {userList?.map((element, index) => {
            return (
              <div className={styles.itemUserList} key={element.id}>
                <div className={styles.itemID}>{index + 1}</div>
                <div className={styles.itemName}>{element.userName}</div>
                <div className={styles.itemRole}>
                  <div className={styles.tagRole}>{element.roleName}</div>
                </div>
                <div className={styles.itemAction}>
                  <Link to={"edit"}>
                      <button className={styles.buttonActionEdit}>
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                  </Link>
                  <button className={styles.buttonActionDelete}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.userListPaging}></div>
    </div>
  );
}

export default UserList;
