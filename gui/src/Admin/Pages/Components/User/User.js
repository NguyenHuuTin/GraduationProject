import React, { useEffect, useState } from "react";
import "./User.css";
import UserList from "./UserList/UserList";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import AddNewUser from "./AddNewUser/AddNewUser";
import EditUser from "./EditUser/EditUser";

function User(props) {
  const [userList, setUserList] = useState([]);
  const [status, setStatus] = useState(false);

  const handleStatus = () => {
    setStatus((prev) => !prev);
  };
  
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
  }, [status]);

  return (
    <>
      <div className="card-content-user">
        <div className="card-header-user">
          <h2 className="header-title-user">Users</h2>
          <div className="header-path-user">
            <div className="header-path-item-user active">
              <Link to={".."} className="item-content-user active">
                Home
              </Link>
            </div>
            /
            <div className="header-path-item-user">
              <Link to={"/user"} className="item-content-user">
                User
              </Link>
            </div>
          </div>
        </div>
        <div className="user-main">
          <div className="user-main-user-list">
            <UserList handleStatus={handleStatus} users={userList} />
          </div>
          <div className="user-main-add-new-user">
            {/* <Outlet handleStatus={handleStatus}/> */}
            <Routes>
              <Route index element={<AddNewUser handleStatus={handleStatus}  />} />
              <Route path="edit/:id" element={<EditUser handleStatus={handleStatus} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
