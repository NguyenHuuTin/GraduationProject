import React, { useEffect, useState } from "react";
import "./Total.css";
import axios from "axios";

function Total(props) {
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalInstructor, setTotalInstructor] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:57678/Student")
      .then((res) => {
        setTotalStudent(res.data.length);
      })
      .catch(() => {
        setTotalStudent(0);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:57678/Instructor")
      .then((res) => {
        setTotalInstructor(res.data.length);
      })
      .catch(() => {
        setTotalInstructor(0);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:57678/Admin")
      .then((res) => {
        setTotalAdmin(res.data.length);
      })
      .catch(() => {
        setTotalAdmin([]);
      });
  }, []);
  return (
    <div className="card-body">
      <div className="card-statistical">
        <div className="card-statistical-item">
          <div className="item-icon1">
            <i className="fa-regular fa-user icon"></i>
          </div>
          <div className="statistical-item-content">
            <div>Total Admin</div>
            <div className="count">{totalAdmin}</div>
          </div>
        </div>
        <div className="card-statistical-item">
          <div className="item-icon2">
            <i className="fa-solid fa-chalkboard-user icon"></i>
          </div>
          <div className="statistical-item-content">
            <div>Total Instructor</div>
            <div className="count">{totalInstructor}</div>
          </div>
        </div>
        <div className="card-statistical-item">
          <div className="item-icon3">
            <i className="fa-solid fa-user icon"></i>
          </div>
          <div className="statistical-item-content">
            <div>Total Student</div>
            <div className="count">{totalStudent}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Total;
