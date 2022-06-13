import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewMyCourse.module.css";

function ViewMyCourse(props) {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [video, setVideo] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:57678/CourseStudent/${id}`)
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
        setVideo(res.data.section[0].lessons[0].videoUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(()=>{
    course && setVideo(course.section[x].lessons[y].videoUrl);
  },[x, y])
  return (
    <div className={styles.container}>
      <div className={styles.bodyVideo}>
        <iframe
          className={styles.video}
          src={course && video}
          title="YouTube video player"
          frameBorder={"0"}
          allow="accelerometer; control; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className={styles.describe}>
          <h2>{course && course.section[x].lessons[y].title}</h2>
          <p>
            {course && course.description}
          </p>
          <div className={styles.comment}>
            <h4>6 comments</h4>
            <div className={styles.myComment}>
              <img
                className={styles.imgUser}
                alt="img_user"
                src="https://www.kindpng.com/picc/m/24-248442_female-user-avatar-woman-profile-member-user-profile.png"
              ></img>
              <input
                type={"text"}
                className={styles.inputComment}
                placeholder="Do you have any questions about this lesson?"
              ></input>
            </div>
            <div className={styles.listComment}>
              <div className={styles.itemComment}>
                <img
                  className={styles.imgUser}
                  alt="img_user"
                  src="https://www.kindpng.com/picc/m/24-248442_female-user-avatar-woman-profile-member-user-profile.png"
                ></img>
                <div className={styles.infoComment}>
                  <div className={styles.nameUser}>Hữu tin</div>
                  <div className={styles.dateComment}>21 june 2022</div>
                  <div className={styles.contentComment}>
                    this course is very good
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bodyListCourse}>
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
                      <div
                        key={item.id}
                        className={styles.titleLecture}
                        onClick={() => {
                          setX(index);
                          setY(i);
                        }}
                      >
                        <i
                          className="fa-solid fa-circle-play"
                          style={{ marginRight: 10, color: "#F9B9A7" , marginLeft: 20}}
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
    </div>
  );
}

export default ViewMyCourse;
