import React, { useEffect, useState } from "react";
import styles from "./UserList.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function UserList(props) {
  const [id, setId] = useState("");

  useEffect(() => {
    if (id !== "") {
      if (window.confirm("Do you want delete this user")) {
        axios
          .delete(`http://localhost:57678/Users/${id}`)
          .then((res) => {
            NotificationManager.success("Delete user successfully!");
            props.handleStatus();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [id]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(props.users);

  useEffect(() => {
    if (search === "") {
      setFilter(props.users);
    } else {
      var filterUser = props.users.filter((object) => {
        return object.userName.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setFilter(filterUser);
    }
  },[search, props.users]);

  const [currentPage, setCurrentPage] = useState(1)
  const [firstIndex, setFirstIndex]  = useState(1)
  const [lastIndex, setLastIndex] = useState(10)
  const [totalPage, setTotalPage] = useState(1)
  const count = 10;

  const handlePrev = ()=>{
    if(currentPage > 1){
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleNext = ()=>{
    if(currentPage < totalPage){
      setCurrentPage(prev => prev + 1)
    }
  }

  useEffect(()=>{
    var mod = filter.length % count;
    if(mod === 0){
      setTotalPage(filter.length / count)
    }
    else{
      setTotalPage(Math.floor(filter.length / count) +1)
    }
    setLastIndex(currentPage * count);
    setFirstIndex(lastIndex - count);
    
  }, [filter.length, currentPage, lastIndex])
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
            <div id="myInput" className={styles.userTitleSearch}>
              Search:
            </div>
            <div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

          {filter.slice(firstIndex, lastIndex).map((element, index) => {
            return (
              <div id="myList" className={styles.itemUserList} key={element.id}>
                <div className={styles.itemID}>{index + 1}</div>
                <div className={styles.itemName}>{element.userName}</div>
                <div className={styles.itemRole}>
                  <div className={styles.tagRole}>{element.roleName}</div>
                </div>
                <div className={styles.itemAction}>
                  <Link to={`edit/${element.id}`}>
                    <button className={styles.buttonActionEdit}>
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  </Link>
                  <button
                    className={styles.buttonActionDelete}
                    value={id}
                    onClick={() => {
                      setId(element.id);
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <NotificationContainer />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.userListPaging}>
        <div className={styles.showPage}>Showing page {currentPage} of {totalPage}</div>
        <div className={styles.btnPage}>
          <button disabled={currentPage === 1} className={styles.btnPrev} onClick={handlePrev}>Prev</button>
          <button disabled={currentPage === totalPage} className={styles.btnNext} onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default UserList;
