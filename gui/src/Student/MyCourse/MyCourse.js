import React, { useEffect, useState } from "react";
import styles from "./MyCourse.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function MyCourse(props) {
  const [course, setCourse] = useState([]);
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.token;

  useEffect(() => {
    if(token){
      axios
      .get("http://localhost:57678/MyCourseStudentPage",{
        headers:{
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
      })
      .catch((error) => {
        console.log(error);
        setCourse([]);
      });
    }
    else{
      navigate("/login/signin");
    }
  }, []);

  useEffect(()=>{
    if(course){
      var filterList = course.filter((object) => {
        return (
          object.status !== "Block"
        );
      });
      setFilter(filterList);
    }
  },[course])


  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {filter &&
          filter.map((element) => {
            return (
              <Link key={element.id} to={`/myCourse/${element.id}`} className={styles.itemCourse}>
                <img
                  alt="course item"
                  src={element.image}
                  className={styles.imgCourse}
                ></img>
                <div className={styles.courseInfo}>
                  <div className={styles.courseName}>{element.title}</div>
                  <div className={styles.infoInstructor}>
                    <img
                      className={styles.imgUser}
                      alt="img_user"
                      src={element.avatar}
                    ></img>
                    <div className={styles.userName}>{element.user}</div>
                    <div className={styles.checkIcon}>
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                  </div>
                  <div className={styles.coursePrice}>keep studying</div>
                </div>
              </Link>
            );
          })}
        
      </div>
    </div>
  );
}

export default MyCourse;
