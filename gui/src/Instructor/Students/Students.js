import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Students.module.css";

function Students(props) {
  const [CourseList, setCourseList] = useState([]);
  const [courseId, setCourseId] = useState();
  const [student, setStudent] = useState([]);
  const [inputComment, setInputComment] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:57678/ActiveCourseStudentPage")
      .then((res) => {
        setCourseList(res.data);
        console.log(res.data);
        setCourseId(res.data[0].id);
      })
      .catch(() => {
        setCourseList([]);
      });
  }, []);

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
        .get(`http://localhost:57678/ListStudentByCourse/${courseId}`)
        .then((res) => {
          console.log(res.data);
          setStudent(res.data);
        })
        .catch((error) => {
          console.log(error);
          setStudent([]);
        });
  }, [courseId]);

  //   const handleSendComment = (e) => {
  //     if (inputComment !== "") {
  //       if (e.key === "Enter") {
  //         axios
  //           .post(
  //             `http://localhost:57678/Comment`,
  //             {
  //               id: courseId,
  //               comment: inputComment,
  //             },
  //             {
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 Accept: "application/json",
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             }
  //           )
  //           .then((res) => {
  //             console.log(res.data);
  //             setInputComment("");
  //             setTrueComment((prev) => !prev);
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           });
  //       }
  //     }
  //   };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.textTitle}>
          <i className="fa-solid fa-users" style={{marginRight: 10}}></i>
          Students
        </div>
        
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
           <div>
                <img
                  alt="img_Course"
                  src="https://saasmonks.in/App-Demo/Cursus-33214/public/default.png"
                  className={styles.imgCourse}
                ></img>
                Student list
           </div>
           <div style={{marginRight: 20, fontSize: 15}}>
              <i className="fa-solid fa-users" style={{marginRight: 10}}></i>
              Total student: {student.length +4}
            </div>
          </div>
          <div className={styles.listComment}>
            {student &&
              student.map((element) => {
                return (
                  <div className={styles.itemComment} key={element.id}>
                    <img
                      className={styles.imgUser}
                      alt="img_user"
                      src={element.avatar}
                    ></img>
                    <div className={styles.infoComment}>
                      <div className={styles.nameUser}>{element.name}</div>
                      <div className={styles.dateComment}>{element.date}</div>
                      <div className={styles.contentComment}>
                        <div
                          className={styles.complete}
                          style={{ width: `${element.percent}%` }}
                        >
                          {" "}
                        </div>
                        {element.percent}%
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className={styles.itemComment}>
                    <img
                      className={styles.imgUser}
                      alt="img_user"
                      src="https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg"
                    ></img>
                    <div className={styles.infoComment}>
                      <div className={styles.nameUser}>Nguyen Huu Tin</div>
                      <div className={styles.dateComment}>25 jun 2022</div>
                      <div className={styles.contentComment}>
                        <div
                          className={styles.complete}
                          style={{ width: `100%` }}
                        >
                          {" "}
                        </div>
                        100%
                      </div>
                    </div>
                  </div>

                  <div className={styles.itemComment}>
                    <img
                      className={styles.imgUser}
                      alt="img_user"
                      src="https://cdn4.vectorstock.com/i/1000x1000/32/23/user-sign-icon-person-symbol-human-avatar-vector-12693223.jpg"
                    ></img>
                    <div className={styles.infoComment}>
                      <div className={styles.nameUser}>Nguyen Van A</div>
                      <div className={styles.dateComment}>25 jun 2022</div>
                      <div className={styles.contentComment}>
                        <div
                          className={styles.complete}
                          style={{ width: `30%` }}
                        >
                          {" "}
                        </div>
                        30%
                      </div>
                    </div>
                  </div>

                  <div className={styles.itemComment}>
                    <img
                      className={styles.imgUser}
                      alt="img_user"
                      src="https://thumbs.dreamstime.com/b/user-profile-my-account-avatar-login-icon-man-male-face-smile-symbol-flat-vector-human-person-member-sign-user-profile-182815734.jpg"
                    ></img>
                    <div className={styles.infoComment}>
                      <div className={styles.nameUser}>Nguyen Van B</div>
                      <div className={styles.dateComment}>25 jun 2022</div>
                      <div className={styles.contentComment}>
                        <div
                          className={styles.complete}
                          style={{ width: `25%` }}
                        >
                          {" "}
                        </div>
                        25%
                      </div>
                    </div>
                  </div>

                  <div className={styles.itemComment}>
                    <img
                      className={styles.imgUser}
                      alt="img_user"
                      src="https://thumbs.dreamstime.com/b/man-portrait-face-icon-web-avatar-flat-style-vector-male-blocked-unknown-anonymous-silhouette-business-manager-character-85797128.jpg"
                    ></img>
                    <div className={styles.infoComment}>
                      <div className={styles.nameUser}>Nguyen Van B</div>
                      <div className={styles.dateComment}>25 jun 2022</div>
                      <div className={styles.contentComment}>
                        <div
                          className={styles.complete}
                          style={{ width: `75%` }}
                        >
                          {" "}
                        </div>
                        75%
                      </div>
                    </div>
                  </div>
            <div className="overflow"></div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Students;
