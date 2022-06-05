import React from "react";
import "./AddNewUser.css";

function AddNewUser(props) {
  return (
    <div className="add-new-user">
      <div className="add-user-title">Add New User</div>
      <div className="add-new-user-input">
        <div className="add-user-input-group">
          <div className="add-user-input">
            <div className="add-user-title-input">Name:</div>
            <input className="add-user-style-input" />
          </div>
          <div className="add-user-input">
            <div className="add-user-title-input">Email:</div>
            <input className="add-user-style-input" />
          </div>
        </div>

        <div className="add-user-input-group">
          <div className="add-user-input">
            <div className="add-user-title-input">Password:</div>
            <input className="add-user-style-input" />
          </div>
          <div className="add-user-input">
            <div className="add-user-title-input">Role:</div>
            <input
              type={"text"}
              list="itemRole"
              className="add-user-style-input"
            />
            <datalist id="itemRole">
              <option value={"Admin"} />
              <option value={"Instructor"} />
              <option value={"Student"} />
            </datalist>
          </div>
        </div>
      </div>
      <div className="add-new-user-submit">
        <button className="add-user-button">Submit</button>
      </div>
    </div>
  );
}

export default AddNewUser;
