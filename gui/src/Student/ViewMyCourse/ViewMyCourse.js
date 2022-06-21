import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewMyCourse.module.css";
import parse from "html-react-parser";

function ViewMyCourse(props) {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [video, setVideo] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [comment, setComment] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [trueComment, setTrueComment] = useState(false);

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

  useEffect(() => {
    course && setVideo(course.section[x].lessons[y].videoUrl);
  }, [x, y]);

  useEffect(() => {
    axios
      .get(`http://localhost:57678/Comment/${id}`)
      .then((res) => {
        console.log(res.data)
        setComment(res.data);
      })
      .catch((error) => {
        console.log(error);
        setComment([]);
      });
  },[trueComment]);

  const token = localStorage.token;

  const handleSendComment = (e)=>{
    if(inputComment !==""){
      if(e.key ==="Enter"){
        axios.post(`http://localhost:57678/Comment`, {
          id : id,
          comment: inputComment
        },{
          headers:{
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res)=>{
          console.log(res.data);
          setInputComment("");
          setTrueComment(prev => !prev)
        })
        .catch((error)=>{
          console.log(error);
        })
        
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.bodyVideo}>
        <iframe
          className={styles.video}
          src={course && video}
          title="Course video"
          frameBorder={"0"}
          allow="accelerometer; control; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className={styles.describe}>
          <h2>{course && course.section[x].lessons[y].title}</h2>
          <p>{course && parse(course.description)}</p>
          <div className={styles.comment}>
            <h4>{comment && comment.length} comments</h4>
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
                value={inputComment}
                onChange={(e)=>{setInputComment(e.target.value)}}
                onKeyDown={handleSendComment}
              ></input>
            </div>
            <div className={styles.listComment}>
              {comment &&
                comment.map((element) => {
                  return (
                    <div className={styles.itemComment} key={element.id}>
                      <img
                        className={styles.imgUser}
                        alt="img_user"
                        src={element.avatar}
                      ></img>
                      <div className={styles.infoComment}>
                        <div className={styles.nameUser}>{element.user}</div>
                        <div className={styles.dateComment}>{element.createAt}</div>
                        <div className={styles.contentComment}>
                          {element.comment}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                          style={{
                            marginRight: 10,
                            color: "#F9B9A7",
                            marginLeft: 20,
                          }}
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
