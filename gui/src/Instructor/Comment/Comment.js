import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Comment.module.css";

function Comment(props) {
  const [status, setStatus] = useState(false);
  const [CourseList, setCourseList] = useState([]);
  const [courseId, setCourseId] = useState();
  const [comment, setComment] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [trueComment, setTrueComment] = useState(false);
  const token = localStorage.token;

  useEffect(() => {
    axios
      .get("http://localhost:57678/ActiveCourseStudentPage")
      .then((res) => {
        setCourseList(res.data);
        setCourseId(res.data[0].id);
      })
      .catch(() => {
        setCourseList([]);
      });
  }, [status]);

  // Hook action Search
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(CourseList);

  useEffect(() => {
    if (search !== "") {
      console.log(search);
      var filterList = CourseList.filter((object) => {
        return object.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setFilter(filterList);
    } else {
      setFilter(CourseList);
    }
  }, [search, CourseList]);

  useEffect(() => {
    courseId &&
      axios
        .get(`http://localhost:57678/Comment/${courseId}`)
        .then((res) => {
          console.log(res.data);
          setComment(res.data);
        })
        .catch((error) => {
          console.log(error);
          setComment([]);
        });
  }, [trueComment, courseId]);

  const handleSendComment = (e)=>{
    if(inputComment !==""){
      if(e.key ==="Enter"){
        axios.post(`http://localhost:57678/Comment`, {
          id : courseId,
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
      <div className={styles.title}>
        <div className={styles.textTitle}>
          <i className="fa-brands fa-facebook-messenger"></i>
        </div>
        <div className={styles.textTitle}>Comment</div>
      </div>

      <div className={styles.body}>
        <div className={styles.courseList}>
          <div className={styles.title}>
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                marginRight: 10,
                height: 20,
              }}
            ></i>
            <input
              type={"text"}
              className={styles.inputSearch}
              value={search}
              placeholder="Search..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
          </div>
          <div className={styles.mainList}>
            {filter &&
              filter.map((element) => {
                return (
                  <div
                    className={styles.itemCourse}
                    key={element.id}
                    onClick={() => {
                      setCourseId(element.id);
                    }}
                  >
                    <img
                      alt="img_Course"
                      src={element.image}
                      className={styles.imgCourse}
                    ></img>
                    {element.title.length > 35
                      ? element.title.slice(0, 35) + " ....."
                      : element.title}
                  </div>
                );
              })}

            <div className="overflow"></div>
          </div>
        </div>
        <div className={styles.commentBody}>
          <div className={styles.title}>
            <img
              alt="img_Course"
              src="https://saasmonks.in/App-Demo/Cursus-33214/public/default.png"
              className={styles.imgCourse}
            ></img>
            Comment list
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
                      <div className={styles.dateComment}>
                        {element.createAt}
                      </div>
                      <div className={styles.contentComment}>
                        {element.comment}
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="overflow"></div>
          </div>
          <div className={styles.sendComment}>
            <input
              type={"text"}
              className={styles.inputSend}
              placeholder="Write a comment..."
              value={inputComment}
              onChange={(e) => {
                setInputComment(e.target.value);
              }}
              onKeyDown={handleSendComment}
            ></input>
            <div className={styles.btnSend}>
              <i className="fa-solid fa-share"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
