import React, { useEffect, useState } from "react";
import styles from "./CreateCourseContent.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import {useNavigate } from "react-router-dom";

function CreateCourseContent(props) {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [lectureTitle, setLectureTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState(0);
  const [contentTitle, setContentTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [questionActive, setQuestionActive] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const [titleQuizz, setTitleQuizz] = useState("");
  const token = localStorage.token;

  console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:57678/Course/${id}`)
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
        setUploaded(0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [status, id]);

  const handleCreateSection = () => {
    const formDataSection = new FormData();
    formDataSection.append("CourseId", id);
    formDataSection.append("CourseContentTitle", contentTitle);

    if (token) {
      axios
        .post("http://localhost:57678/Courses/Section", formDataSection, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setStatus((prev) => !prev);
          setContentTitle("");
        })
        .catch((error) => {
          console.log(error);
          NotificationManager.error("Add course fail!");
        });
    }
  };

  const handleCreateLecture = async (sectionId) => {
    const formDataLection = new FormData();
    formDataLection.append("Id", sectionId);
    formDataLection.append("LessonTitle", lectureTitle);
    formDataLection.append("File", file);
    formDataLection.append("Duration", duration);

    if (token) {
      await axios
        .post("http://localhost:57678/Courses/Lesion", formDataLection, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (data) => {
            setUploaded(Math.round((data.loaded / data.total) * 100) - 10);
          },
        })
        .then((res) => {
          console.log(res.data);
          NotificationManager.success("Add course Successful!");
          setUploaded(100);
          setStatus((prev) => !prev);
          setLectureTitle("");
          setDuration(0);
          setFile();
        })
        .catch((error) => {
          console.log(error);
          setUploaded(0);
          NotificationManager.error("Add course fail!");
        });
    }
  };
  const handleSaveQuestion = (quizzId) => {
    if (question !== "" && answer !== "") {
      axios
        .post(`http://localhost:57678/Courses/Question`, {
          id: quizzId,
          htmlContent: question,
        })
        .then((res) => {
          handleSaveAnswer(res.data);
        });
    } else {
      alert("Please complete the question and answer correctly!");
    }
  };

  const handleSaveAnswer = (questionId) => {
    axios
      .post(`http://localhost:57678/Courses/Answer`, {
        id: questionId,
        answer: answer,
      })
      .then((res) => {
        console.log(res.data);
        NotificationManager.success("Add Question Successful!");
        setAnswer("");
        setQuestion("");
        setStatus((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Add Question fail!");
      });
  };

  const handleValue = (e, editor) => {
    const data = editor.getData();
    setQuestion(data);
  };

  const handleValueActive = (e, editor) => {
    const data = editor.getData();
    setQuestionActive(data);
  };

  const handleFinish = () => {
    if (token) {
      axios
        .post(`http://localhost:57678/Courses/Extra`, {
          id: id,
          status: "Waiting for approve",
        })
        .then((res) => {
          console.log(res.data);
          navigate("/instructorpage");
        })
        .catch((error) => {
          console.log(error);
          NotificationManager.error("Add course fail!");
        });
    }
  };

  const handleUpdateSection = async (sectionId) => {
    await axios
      .post(`http://localhost:57678/Course/Update/Section`, {
        id: sectionId,
        title: contentTitle,
      })
      .then((res) => {
        console.log(res.data);
        NotificationManager.success("Update Successful!");
        setContentTitle("");
        setStatus((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Update fail!");
      });
  };

  const handleUpdateLecture = async (lectureId) => {
    const formDataLecture = new FormData();
    formDataLecture.append("id", lectureId);
    formDataLecture.append("LessonTitle", lectureTitle);
    formDataLecture.append("Duration", duration);
    file && formDataLecture.append("File", file);

    await axios
      .post(`http://localhost:57678/Course/Update/Lecture`, formDataLecture, {
        onUploadProgress: (data) => {
          setUploaded(Math.round((data.loaded / data.total) * 100) - 10);
        },
      })
      .then((res) => {
        console.log(res.data);
        NotificationManager.success("Update Successful!");
        setUploaded(100);
        setDuration(0);
        setLectureTitle("");
        setFile();
        setStatus((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Update fail!");
      });
  };

  const handleCreateQuizz = async (sectionId) => {
    if (titleQuizz !== "") {
      await axios
        .post(`http://localhost:57678/Courses/Quizz`, {
          id: sectionId,
          title: titleQuizz,
        })
        .then((res) => {
          console.log(res.data);
          setTitleQuizz("");
          setStatus((prev) => !prev);
        })
        .catch((error) => {
          console.log(error);
          NotificationManager.error("Create fail!");
        });
    } else {
      alert("Please enter the title of the test!");
    }
  };

  const handleUpdateQuizz = async (quizzId) => {
    if (titleQuizz !== "") {
      await axios
        .post(`http://localhost:57678/Course/Update/Quizz`, {
          id: quizzId,
          title: titleQuizz,
        })
        .then((res) => {
          console.log(res.data);
          NotificationManager.success("Update successful!");
          setTitleQuizz("");
          setStatus((prev) => !prev);
        })
        .catch((error) => {
          console.log(error);
          NotificationManager.error("Update fail!");
        });
    } else {
      alert("Please enter the title of the test!");
    }
  };

  const handleUpdateQuestion = (quizzId) => {
    console.log(quizzId, "questionid");
    axios
      .post(`http://localhost:57678/Course/Update/Question`, {
        id: quizzId,
        htmlContent: questionActive,
      })
      .then((res) => {
        handleUpdateAnswer(quizzId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateAnswer = (questionId) => {
    axios
      .post(`http://localhost:57678/Course/Update/Answer`, {
        id: questionId,
        answer: answer,
      })
      .then((res) => {
        console.log(res.data);
        NotificationManager.success("Add Question Successful!");
        setAnswer("");
        setQuestionActive("");
        setStatus((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Add Question fail!");
      });
  };

  const handleRemoveQuestion = (questionId) => {
    axios
      .delete(`http://localhost:57678/Course/Question/${questionId}`)
      .then((res) => {
        NotificationManager.success("Delete Successful!");
        setStatus((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveQuizz = (quizzId) => {
    if (window.confirm("Are you sure delete this quizz!")) {
      axios
        .delete(`http://localhost:57678/Course/Quizz/${quizzId}`)
        .then((res) => {
          NotificationManager.success("Delete Successful!");
          setStatus((prev) => !prev);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleRemoveChapter = (sectionId) => {
    if (window.confirm("Are you sure delete this Chapter!")) {
      axios
        .delete(`http://localhost:57678/Courses/Section/${sectionId}`)
        .then((res) => {
          NotificationManager.success("Delete Successful!");
          setStatus((prev) => !prev);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleRemoveLecture = (lesionId) => {
    if (window.confirm("Are you sure delete this Lecture!")) {
      axios
        .delete(`http://localhost:57678/Courses/Lecture/${lesionId}`)
        .then((res) => {
          NotificationManager.success("Delete Successful!");
          setStatus((prev) => !prev);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className={styles.containerEdit}>
          {course &&
            course.section.map((element, index) => {
              return (
                <div className={styles.itemSection} key={element.id}>
                  <div className={styles.name}>Chapter Content Title*</div>
                  <div>
                    <input
                      className={styles.inputText}
                      type={"text"}
                      maxLength="60"
                      placeholder="Insert your Section title."
                      value={contentTitle === "" ? element.title : contentTitle}
                      onChange={(e) => {
                        setContentTitle(e.target.value);
                      }}
                    />
                    <button
                      className={styles.btnCreate}
                      onClick={() => {
                        handleUpdateSection(element.id);
                      }}
                    >
                      Update
                    </button>
                    <button className={styles.btnDeleteChapter} onClick={()=>{handleRemoveChapter(element.id)}}>Delete</button>
                    <NotificationContainer />
                  </div>
                  <div className={styles.lecture}>
                    {element.lessons &&
                      element.lessons.map((item) => {
                        return (
                          <div className={styles.itemLecture} key={item.id}>
                            <div className={styles.name}>Lecture Title*</div>
                            <div>
                              <input
                                className={styles.inputText}
                                type={"text"}
                                maxLength="60"
                                placeholder="Insert your lecture title."
                                value={
                                  lectureTitle === ""
                                    ? item.title
                                    : lectureTitle
                                }
                                onChange={(e) => {
                                  setLectureTitle(e.target.value);
                                }}
                              ></input>
                            </div>
                            <div className={styles.video}>
                              <div className={styles.duration}>
                                <div className={styles.name}>Duration*</div>
                                <div>
                                  <input
                                    className={styles.inputNumber}
                                    type={"number"}
                                    placeholder="Insert your course price"
                                    value={
                                      duration === 0 ? item.duration : duration
                                    }
                                    onChange={(e) => {
                                      setDuration(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className={styles.file}>
                                <div className={styles.name}>File*</div>
                                <div>
                                  <input
                                    type={"file"}
                                    className={styles.inputTextFile}
                                    onChange={(e) => {
                                      setFile(e.target.files[0]);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className={styles.styleVideo}>
                                <iframe
                                  className={styles.videoCourse}
                                  src={
                                    file
                                      ? URL.createObjectURL(file)
                                      : item.videoUrl
                                  }
                                  title="Course video"
                                  frameBorder={"0"}
                                  allow="accelerometer; control; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            </div>
                            <div className={styles.saveCourse}>
                              <div className={styles.loading}>
                                <div className={styles.loadStatus}>
                                  {uploaded < 100 && uploaded > 0
                                    ? "Loading..."
                                    : ""}
                                </div>
                                <div className={styles.progress}>
                                  <div
                                    className={styles.progressDone}
                                    role="progressbar"
                                    aria-valuenow={uploaded}
                                    aria-valuemin={"0"}
                                    aria-valuemax={"100"}
                                    style={{
                                      opacity: 1,
                                      width: `${uploaded}%`,
                                    }}
                                  >
                                    {`${uploaded}%`}
                                  </div>
                                </div>
                              </div>
                              <button
                                className={styles.btnSaveCourse}
                                onClick={() => {
                                  handleUpdateLecture(item.id);
                                }}
                              >
                                Update
                              </button>
                              <button className={styles.btnDeleteLecture} onClick={()=>{handleRemoveLecture(item.id)}}>Delete</button>
                            </div>
                          </div>
                        );
                      })}

                    <div className={styles.lecture}>
                      <div className={styles.newLecture}>New lecture</div>
                      <div className={styles.itemLecture}>
                        <div className={styles.name}>Lecture Title*</div>
                        <div>
                          <input
                            className={styles.inputText}
                            type={"text"}
                            maxLength="60"
                            placeholder="Insert your lecture title."
                            value={lectureTitle}
                            onChange={(e) => {
                              setLectureTitle(e.target.value);
                            }}
                          ></input>
                        </div>
                        <div className={styles.video}>
                          <div className={styles.duration}>
                            <div className={styles.name}>Duration*</div>
                            <div>
                              <input
                                className={styles.inputNumber}
                                type={"number"}
                                placeholder="Insert your course price"
                                value={duration}
                                onChange={(e) => {
                                  setDuration(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className={styles.file}>
                            <div className={styles.name}>File*</div>
                            <div>
                              <input
                                type={"file"}
                                className={styles.inputTextFile}
                                onChange={(e) => {
                                  setFile(e.target.files[0]);
                                }}
                              />
                            </div>
                          </div>
                          <div className={styles.styleVideo}>
                            <iframe
                              className={styles.videoCourse}
                              src={file && URL.createObjectURL(file)}
                              title="Course video"
                              frameBorder={"0"}
                              allow="accelerometer; control; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                        <div className={styles.saveCourse}>
                          <div className={styles.loading}>
                            <div className={styles.loadStatus}>
                              {uploaded < 100 && uploaded > 0
                                ? "Loading..."
                                : ""}
                            </div>
                            <div className={styles.progress}>
                              <div
                                className={styles.progressDone}
                                role="progressbar"
                                aria-valuenow={uploaded}
                                aria-valuemin={"0"}
                                aria-valuemax={"100"}
                                style={{ opacity: 1, width: `${uploaded}%` }}
                              >
                                {`${uploaded}%`}
                              </div>
                            </div>
                          </div>
                          <button
                            className={styles.btnSaveCourse}
                            onClick={() => {
                              handleCreateLecture(element.id);
                            }}
                          >
                            Add
                          </button>
                          <NotificationContainer />
                        </div>
                      </div>
                    </div>
                  </div>

                  {course.quizzs[index] ? (
                    <div
                      style={{
                        backgroundColor: "lightgray",
                        border: "1px solid black",
                        padding: 10,
                      }}
                    >
                      <div className={styles.name}>Quizz Title*</div>
                      <div>
                        <input
                          className={styles.inputTextQuizz}
                          type={"text"}
                          maxLength="60"
                          placeholder="Insert your quizz title."
                          value={
                            titleQuizz === ""
                              ? course.quizzs[index].title
                              : titleQuizz
                          }
                          onChange={(e) => {
                            setTitleQuizz(e.target.value);
                          }}
                        />
                        <button
                          className={styles.btnCreate}
                          onClick={() => {
                            handleUpdateQuizz(course.quizzs[index].id);
                          }}
                        >
                          Update quizz
                        </button>
                        <button
                          className={styles.btnDeleteQuestion}
                          onClick={() => {
                            handleRemoveQuizz(course.quizzs[index].id);
                          }}
                        >
                          Delete
                        </button>
                        <NotificationContainer />
                      </div>
                      <div className={styles.quizz}>
                        {/* <div className={styles.iconAdd}>
                                  <i
                                    className="fa-solid fa-plus"
                                    style={{ margin: "auto" }}
                                  ></i>
                                </div> */}
                        {course.quizzs[index].quizzQuestions &&
                          course.quizzs[index].quizzQuestions.map(
                            (itemQuestion) => {
                              return (
                                <div
                                  className={styles.quizzItem}
                                  key={itemQuestion.id}
                                >
                                  <div className={styles.inputDes}>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      onChange={handleValueActive}
                                      data={
                                        questionActive === ""
                                          ? itemQuestion.htmlContent
                                          : questionActive
                                      }
                                    />
                                  </div>

                                  <div
                                    style={{
                                      marginLeft: 30,
                                      marginTop: 20,
                                      marginBottom: 20,
                                    }}
                                  >
                                    True Answer:{" "}
                                    <input
                                      type={"text"}
                                      value={
                                        answer === ""
                                          ? itemQuestion.quizzAnswers[0].content
                                          : answer.toUpperCase()
                                      }
                                      className={styles.answer}
                                      onChange={(e) => {
                                        setAnswer(e.target.value.toUpperCase());
                                      }}
                                    ></input>
                                  </div>
                                  <div
                                    style={{
                                      width: 170,
                                      marginLeft: "auto",
                                      marginRight: 35,
                                      marginBottom: 20,
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <button
                                      className={styles.btnDeleteQuestion}
                                      onClick={() => {
                                        handleRemoveQuestion(itemQuestion.id);
                                      }}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className={styles.btnSaveQuestion}
                                      onClick={() => {
                                        handleUpdateQuestion(itemQuestion.id);
                                      }}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              );
                            }
                          )}

                        {/* Create new Question */}
                        <div className={styles.newLecture}>New Question</div>
                        <div className={styles.quizzItem}>
                          <div className={styles.inputDes}>
                            <CKEditor
                              editor={ClassicEditor}
                              onChange={handleValue}
                              data={question}
                            />
                          </div>

                          <div
                            style={{
                              marginLeft: 30,
                              marginTop: 20,
                              marginBottom: 20,
                            }}
                          >
                            True Answer:{" "}
                            <input
                              type={"text"}
                              value={answer.toUpperCase()}
                              className={styles.answer}
                              onChange={(e) => {
                                setAnswer(e.target.value.toUpperCase());
                              }}
                            ></input>
                          </div>
                          <div
                            style={{
                              width: 70,
                              marginLeft: "auto",
                              marginRight: 35,
                              marginBottom: 20,
                            }}
                          >
                            <button
                              className={styles.btnSaveCourse}
                              onClick={() => {
                                handleSaveQuestion(course.quizzs[index].id);
                              }}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: "lightgray",
                        border: "1px solid black",
                        padding: 10,
                      }}
                    >
                      <div className={styles.name}>Quizz Title*</div>
                      <div>
                        <input
                          className={styles.inputText}
                          type={"text"}
                          maxLength="60"
                          placeholder="Insert your quizz title."
                          value={titleQuizz}
                          onChange={(e) => {
                            setTitleQuizz(e.target.value);
                          }}
                        />
                        <button
                          className={styles.btnCreate}
                          onClick={() => {
                            handleCreateQuizz(element.id);
                          }}
                        >
                          Create quizz
                        </button>
                        <NotificationContainer />
                      </div>
                    </div>
                  )}
                  {/* {course.quizzs &&
                    course.quizzs
                      .filter((quizz) => {
                        return quizz.sectionId === element.id;
                      })
                      .map((itemQuizz) => {
                        return (
                          <div key={itemQuizz.id}>
                            <div className={styles.name}>Quizz Title*</div>
                            <div>
                              <input
                                className={styles.inputText}
                                type={"text"}
                                maxLength="60"
                                placeholder="Insert your Section title."
                                value={
                                  titleQuizz === ""
                                    ? itemQuizz.title
                                    : titleQuizz
                                }
                                onChange={(e) => {
                                  setTitleQuizz(e.target.value);
                                }}
                              />
                              <button className={styles.btnCreate}>
                                Update quizz
                              </button>
                              <NotificationContainer />
                            </div>
                            <div className={styles.quizz}>
                             
                              {itemQuizz.quizzQuestions &&
                                itemQuizz.quizzQuestions.map((itemQuestion) => {
                                  return (
                                    <div
                                      className={styles.quizzItem}
                                      key={itemQuestion.id}
                                    >
                                      <div className={styles.inputDes}>
                                        <CKEditor
                                          editor={ClassicEditor}
                                          onChange={handleValue}
                                          data={question === "" ? itemQuestion.htmlContent : question}
                                        />
                                      </div>
                                      <div
                                        style={{
                                          marginLeft: 30,
                                          marginTop: 20,
                                          marginBottom: 20,
                                        }}
                                      >
                                        True Answer:{" "}
                                        <input
                                          type={"text"}
                                          className={styles.answer}
                                        ></input>
                                      </div>
                                      <div
                                        style={{
                                          width: 70,
                                          marginLeft: "auto",
                                          marginRight: 35,
                                          marginBottom: 20,
                                        }}
                                      >
                                        <button
                                          className={styles.btnSaveCourse}
                                          onClick={handleSaveQuestion}
                                        >
                                          Update
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        );
                      })} */}
                </div>
              );
            })}
          <div className={styles.newLecture}>New chapter</div>
          <div className={styles.itemSection}>
            <div className={styles.name}>Chapter Content Title*</div>
            <div>
              <input
                className={styles.inputText}
                type={"text"}
                maxLength="60"
                placeholder="Insert your course title."
                value={contentTitle}
                onChange={(e) => {
                  setContentTitle(e.target.value);
                }}
              />
              <button
                className={styles.btnCreate}
                onClick={() => {
                  handleCreateSection();
                }}
              >
                Create
              </button>
              <NotificationContainer />
            </div>
          </div>
          <button
            className={styles.btnFinish}
            onClick={() => {
              handleFinish();
            }}
          >
            Finish
          </button>
          <NotificationContainer />
        </div>
  );
}

export default CreateCourseContent;
