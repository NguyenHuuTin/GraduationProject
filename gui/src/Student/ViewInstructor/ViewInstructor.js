import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ViewInstructor.module.css";

function ViewInstructor(props) {
  const { id } = useParams();
  const [instructor, setInstructor] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:57678/ListInstructor/${id}`)
      .then((res) => {
        console.log(res.data)
        setInstructor(res.data);
      })
      .catch((error) => {
        console.log(error);
        setInstructor([]);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.info}>
          <div className={styles.user}>
            <img
              src={instructor && instructor.avatar}
              alt="avatar user"
              className={styles.imgAvatar}
            ></img>
            <div className={styles.name}>
              <div className={styles.userNameInfo}>{instructor && instructor.name}</div>
              <div className={styles.userDes}>Web Developer</div>
            </div>
          </div>
          <div className={styles.count}>
            <div className={styles.itemCount}>
              <div className={styles.itemName}>Enroll Students</div>
              <div className={styles.itemNumber}>5</div>
            </div>

            <div className={styles.itemCount}>
              <div className={styles.itemName}>Courses</div>
              <div className={styles.itemNumber}>16</div>
            </div>
            {/* <div className={styles.itemCount}>
              <div className={styles.itemName}>Reviews</div>
              <div className={styles.itemNumber}>1</div>
            </div>
            <div className={styles.itemCount}>
              <div className={styles.itemName}>Subscribers</div>
              <div className={styles.itemNumber}>452</div>
            </div> */}
          </div>
        </div>
        <div className={styles.link}>
          <div className={styles.report}>
            <i className="fa-solid fa-flag" style={{ color: "white" }}></i>
            Report
          </div>
          <div className={styles.listLink}>
            <Link to={"."} className={styles.fb}>
              <i
                className="fa-brands fa-facebook-f"
                style={{ color: "white", margin: "auto" }}
              ></i>
            </Link>
            <Link to={"."} className={styles.twitter}>
              <i
                className="fa-brands fa-twitter"
                style={{ color: "white", margin: "auto" }}
              ></i>
            </Link>
            <Link to={"."} className={styles.linked}>
              <i
                className="fa-brands fa-linkedin-in"
                style={{ color: "white", margin: "auto" }}
              ></i>
            </Link>
            <Link to={"."} className={styles.youtube}>
              <i
                className="fa-brands fa-youtube"
                style={{ color: "white", margin: "auto" }}
              ></i>
            </Link>
          </div>
          {/* <div className={styles.subscript}>Subscript</div> */}
        </div>
      </div>
      <div className={styles.listCourse}>

      <div className={styles.main}>
      {instructor &&
          instructor.course.map((element) => {
            return (
              <Link key={element.id} to={`/course/${element.id}`} className={styles.itemCourse}>
                <img
                  alt="course item"
                  src={element.imageUrl}
                  className={styles.imgCourse}
                ></img>
                <div className={styles.courseInfo}>
                  <div className={styles.courseName}>{element.title}</div>
                  <div className={styles.infoInstructor}>
                    <img
                      className={styles.imgUser}
                      alt="img_user"
                      src={element.user.avatar}
                    ></img>
                    <div className={styles.userName}>{element.user.userName}</div>
                    <div className={styles.checkIcon}>
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                  </div>
                  <div className={styles.coursePrice}>{element.originPrice}$</div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default ViewInstructor;
