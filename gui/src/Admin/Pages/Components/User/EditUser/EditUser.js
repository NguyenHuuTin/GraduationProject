import React from "react";
import "./EditUser.css";

function EditUser(props) {
  return (
    <div className="edit-user">
      <div className="edit-user-title">Edit User</div>
      <div className="edit-user-input">
        <div className="edit-user-input-group">
          <div className="edit-user-title-input">Name:</div>
          <input className="edit-user-style-input" />
        </div>

        <div className="edit-user-input-group">
          <div className="edit-user-title-input">Role:</div>
          <input
            type={"text"}
            list="itemRole"
            className="edit-user-style-input"
          />
          <datalist id="itemRole">
            <option value={"Admin"} />
            <option value={"Instructor"} />
            <option value={"Student"} />
          </datalist>
        </div>
      </div>
      <div className="edit-user-submit">
        <button className="edit-user-button">Submit</button>
      </div>
    </div>
  );
}

export default EditUser;
