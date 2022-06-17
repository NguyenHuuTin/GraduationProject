import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewCourse.module.css";
import parse from "html-react-parser";

function ViewCourse(props) {
  const { id } = useParams();
  const [course, setCourse] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:57678/CourseStudent/${id}`)
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleCourse}>{course && course.title}</div>
        <div className={styles.descriptionCourse}>
          {course && parse(course.description)}
        </div>
        <div className={styles.titleContentCourse}>Nội dung khóa học</div>
        {course &&
          course.section.map((element, index) => {
            return (
              <div key={element.id} className={styles.sectionCourse}>
                <div className={styles.titleSection}>
                  {index + 1}. {element.title}
                </div>
                <div className={styles.lectureCourse}>
                  {element.lessons.map((item, i) => {
                    return (
                      <div key={item.id} className={styles.titleLecture}>
                        <i
                          className="fa-solid fa-circle-play"
                          style={{ marginRight: 10, color: "#F9B9A7" }}
                        ></i>
                        {i + 1}. {item.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.backGroup}>
        <img
          src={course && course.image}
          alt="BackGround Course"
          className={styles.imgCourse}
        ></img>
        <div className={styles.priceCourse}>
          Price: {course && course.price}
          <i className="fa-solid fa-dollar-sign" style={{ marginLeft: 10 }}></i>
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
