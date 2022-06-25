import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ViewMyCourse.module.css";
import parse from "html-react-parser";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function ViewMyCourse(props) {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [video, setVideo] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [comment, setComment] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [trueComment, setTrueComment] = useState(false);
  const [test, setTest] = useState(false);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

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
  }, [id]);

  useEffect(() => {
    course && setVideo(course.section[x].lessons[y].videoUrl);
  }, [x, y, course]);

  useEffect(() => {
    axios
      .get(`http://localhost:57678/Comment/${id}`)
      .then((res) => {
        console.log(res.data);
        setComment(res.data);
      })
      .catch((error) => {
        console.log(error);
        setComment([]);
      });
  }, [trueComment, id]);

  const token = localStorage.token;

  const handleSendComment = (e) => {
    if (inputComment !== "") {
      if (e.key === "Enter") {
        axios
          .post(
            `http://localhost:57678/Comment`,
            {
              id: id,
              comment: inputComment,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            setInputComment("");
            setTrueComment((prev) => !prev);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login/signin");
          });
      }
    }
  };

  const handleAnswerQuestion = (questionId) => {
    if (answer !== "") {
      axios
        .post(
          `http://localhost:57678/Quizz/AddAnswerStudent`,
          {
            questionId: questionId,
            answer: answer,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setAnswer("");
          setZ((prev) => prev + 1);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login/signin");
        });
    }
  };

  const handleDoTest = (index) => {
    if (window.confirm("Are you sure you want to take the test?")) {
      setX(index);
      setTest(true);
    }
  };

  const handleCheck = (index, i) => {
    if (index > 0 && course.quizzs[index - 1] !== null) {
      console.log("dòng", index);
      handleCheckComplete(index, i);
    } else {
      if (!test) {
        setTest(false);
        setX(index);
        setY(i);
      }
    }
  };

  const handleCheckComplete = (index, i) => {
    if (token) {
      console.log(token);
      if (index > 0) {
        const quizzId = course.quizzs[index - 1].id;
        axios
          .get(`http://localhost:57678/Quizz/Checkcompletequizz/${quizzId}`, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.data) {
              if (!test) {
                setTest(false);
                setX(index);
                setY(i);
              }
            } else {
              NotificationManager.warning(
                "You must complete all previous lessons and pass the test!",
                "",
                1000
              );
            }
          })
          .catch((error) => {
            console.log(error);
            navigate("/login/signin");
          });
      } else {
        if (!test) {
          setTest(false);
          setX(index);
          setY(i);
        }
      }
    }
  };

  const handleSubmit = (quizzId) => {
    if (answer !== "") {
      const questionId = course.quizzs[x].quizzQuestions[z].id;
      axios
        .post(
          `http://localhost:57678/Quizz/AddAnswerStudent`,
          {
            questionId: questionId,
            answer: answer,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setAnswer("");
          AddQuizzComplete(quizzId, z + 1);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login/signin");
        });
    }
  };

  const AddQuizzComplete = (quizzId, numQuizz) => {
    axios
      .post(
        `http://localhost:57678/Quizz/CompleteQuizz`,
        {
          quizzId: quizzId,
          numQuizz: numQuizz,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data / numQuizz >= 0.8) {
          NotificationManager.success(
            `You have completed ${res.data}/${z + 1} questions`,
            "Congratulations"
          );
          //alert(`You have completed ${res.data}/${z + 1} questions`);
          if (x + 1 === course.section.length) {
            SaveCourseComplete();
            NotificationManager.success(
              "You have completed the course",
              "Congratulations"
            );
          } else {
            setX((prev) => prev + 1);
            setY(0);
            setZ(0);
            setTest(false);
          }
        } else {
          setY(0);
          setZ(0);
          setTest(false);
          NotificationManager.warning(
            `You have completed ${res.data}/${
              z + 1
            } questions`,
            "No pass"
          );
        }
      });
  };

  const SaveCourseComplete = () => {
    const courseId = course.id;
    axios
      .post(`http://localhost:57678/Quizz/AddCourseComplete/${courseId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setX(0);
        setY(0);
        setZ(0);
        setTest(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={styles.container}>
      {test === false ? (
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
                  onChange={(e) => {
                    setInputComment(e.target.value);
                  }}
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
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.bodyTest}>
          <div className={styles.mainTest}>
            {parse(course.quizzs[x].quizzQuestions[z].htmlContent)}
          </div>
          <div className={styles.mainAnswer}>
            <div>
              Đáp án:
              <input
                type={"text"}
                autoFocus
                value={answer.toLocaleUpperCase()}
                onChange={(e) => {
                  setAnswer(e.target.value.toLocaleUpperCase());
                }}
                className={styles.txtAnswer}
              />
            </div>
            {z + 1 === course.quizzs[x].quizzQuestions.length ? (
              <div>
                <button
                  className={styles.btnNext}
                  onClick={() => {
                    // handleAnswerQuestion(course.quizzs[x].quizzQuestions[z].id);
                    handleSubmit(course.quizzs[x].id);
                  }}
                >
                  Submit
                </button>
                <NotificationContainer />
              </div>
            ) : (
              <button
                className={styles.btnNext}
                onClick={() => {
                  handleAnswerQuestion(course.quizzs[x].quizzQuestions[z].id);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
      <div className={styles.bodyListCourse}>
        <div className={styles.titleContentCourse}>Course Content</div>

        {course &&
          course.section.map((element, index) => {
            return (
              <div key={element.id} className={styles.sectionCourse}>
                <div className={styles.titleSection}>{element.title}</div>
                <div className={styles.lectureCourse}>
                  {element.lessons.map((item, i) => {
                    return (
                      <div
                        key={item.id}
                        className={styles.titleLecture}
                        onClick={() => {
                          handleCheck(index, i);
                        }}
                      >
                        <NotificationContainer />
                        <i
                          className="fa-solid fa-circle-play"
                          style={{
                            marginRight: 10,
                            color: "#F9B9A7",
                            marginLeft: 20,
                          }}
                        ></i>
                        {item.title}
                      </div>
                    );
                  })}
                </div>
                {course.quizzs[index] && (
                  <div
                    className={styles.quizz}
                    onClick={() => {
                      handleDoTest(index);
                    }}
                  >
                    <i
                      className="fa-solid fa-file-pen"
                      style={{
                        marginRight: 10,
                        marginLeft: 41,
                      }}
                    ></i>
                    {course.quizzs[index].title}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ViewMyCourse;
