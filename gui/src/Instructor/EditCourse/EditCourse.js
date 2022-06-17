import React, { useEffect, useState } from "react";
import styles from "./EditCourse.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function EditCourse(props) {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [backGround, setBackGround] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:57678/CourseStudent/${id}`)
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
        setDescription(course.description);
        setTitle(course.title);
        setPrice(course.price);
        setBackGround(course.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <input className={styles.titleCourse} value={title}/>
        <div className={styles.descriptionCourse}>
          <CKEditor editor={ClassicEditor} />
        </div>
        <div className={styles.titleContentCourse}>Course Content</div>
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

export default EditCourse;
