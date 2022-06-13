import React, { useEffect, useState } from "react";
import styles from "./ListInstructor.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function ListInstructor(props) {
  const [instructor, setInstructor] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:57678/ListInstructor")
      .then((res) => {
        setInstructor(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
        setInstructor([]);
      });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {instructor &&
          instructor.map((element) => {
            return (
              <Link key={element.id} to={`/instructorList/${element.id}`} className={styles.itemCourse}>
                <img
                  alt="course item"
                  src={element.avatar}
                  className={styles.imgCourse}
                ></img>
                <div className={styles.courseInfo}>
                  <div className={styles.courseName}>{element.name}</div>
                  <div className={styles.infoInstructor}>
                    <div>
                      <i
                        className="fa-solid fa-book"
                        style={{ color: "black" }}
                      ></i>
                    </div>
                    <div className={styles.userName}>Course: {element.course.length}</div>
                    <div className={styles.checkIcon}>
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default ListInstructor;
