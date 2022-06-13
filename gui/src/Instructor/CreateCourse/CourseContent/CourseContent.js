import React, { useEffect, useState } from "react";
import styles from "./CourseContent.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import parse from "html-react-parser";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function CourseContent(props) {
  const [lecture, setLecture] = useState([]);
  const [contentTitle, setContentTitle] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");
  const [sort, setSort] = useState(0);
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [volume, setVolume] = useState(0);
  const [duration, setDuration] = useState(0);

  const [arraySection, setArraySection] = useState([]);

  const handleValue = (editor) => {
    const data = editor.getData();
    setDescription(data);
    // parse(data)
  };

  const handleSaveLecture = () => {
    if (
      contentTitle !== "" &&
      lectureTitle !== "" &&
      sort > 0 &&
      file !== null &&
      description !== "" &&
      volume > 0 &&
      duration > 0
    ){
      const LessonContent = [
        {
          LessonTitle: lectureTitle,
          File: file,
          Sort: sort,
          Description: description,
          Volume: volume,
          Duration: duration,
        },
      ];
  
      setLecture(lecture.concat(LessonContent));
      //setLecture(LessonContent)
    }
    else{
      alert("Please enter all the attributes.")
    }
    
  };

  const handleRemove = (index) => {
    setLecture(lecture.splice(index, 5));
  };

  lecture && console.log(lecture);


  const handleSaveCourse = async () => {
    if (
      window.confirm(
        "Are you sure you have completed the content of the lessons?"
      )
    ) {
      const formDataSection = new FormData();
      formDataSection.append(
        "CourseId",
        props.courseID
      );
      formDataSection.append("CourseContentTitle", contentTitle);

      const token = localStorage.token;
      console.log(token);
      if (token) {
        await axios
          .post("http://localhost:57678/Courses/Section", formDataSection, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            handleSaveLection(res.data);
          })
          .catch((error) => {
            console.log(error);
            NotificationManager.error("Add course fail!");
          });
      }
    }
  };
  const [uploaded, setUploaded] = useState(0);

  const handleSaveLection = async (sectionID) => {
    const token = localStorage.token;
    let count = 0;

    lecture.forEach(async (element) => {
      const formDataLection = new FormData();
      formDataLection.append("SectionId", sectionID);
      formDataLection.append("LessonTitle", element.LessonTitle);
      formDataLection.append("File", element.File);
      formDataLection.append("Sort", element.Sort);
      formDataLection.append("Description", element.Description);
      formDataLection.append("Volume", element.Volume);
      formDataLection.append("Duration", element.Duration);

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
            console.log(res.data, ++count);
            NotificationManager.success("Add course Successful!");
            setUploaded(100);
            props.handleStatus(3)
          })
          .catch((error) => {
            console.log(error);
            NotificationManager.error("Add course fail!");
          });
      }
    });
  };

  const token = localStorage.token;
  const handleNext = ()=>{
    if(token){
      axios.post(`http://localhost:57678/Courses/Extra`,{
      id : props.courseID,
      status : "Waiting for approve"
    })
    .then((res)=>{
      console.log(res.data)
      props.handleStatus(4)
    })
    .catch((error)=>{
      console.log(error)
    })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <i className="fa-solid fa-photo-film" style={{ marginRight: 10 }}></i>
        Course Content
      </div>
      <div className={styles.main}>
        <div className={styles.titleAddCourseContent}>New Course Content</div>
        <div className={styles.courseTitle}>
          <div className={styles.inputTitle}>
            <div className={styles.name}>Course Content Title*</div>
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
            </div>
          </div>
        </div>

        <div className={styles.titleAddLecture}>Add lecture</div>

        <div className={styles.courseTitle}>
          <div className={styles.inputID}>
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
          </div>

          <div className={styles.inputID}>
            <div className={styles.name}>Sort</div>
            <div>
              <input
                className={styles.inputText}
                type={"number"}
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              ></input>
            </div>
          </div>

          <div className={styles.inputID}>
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
        </div>

        <div className={styles.description}>
          <div className={styles.name}>Description*</div>
          <div className={styles.inputDes}>
            <CKEditor
              editor={ClassicEditor}
              value={description}
              onChange={(e, editor) => {
                handleValue(editor);
              }}
            />
          </div>
        </div>

        <div className={styles.coursePrice}>
          <div className={styles.coursePriceInput}>
            <div className={styles.inputPrice}>
              <div className={styles.name}>Volume*</div>
              <div>
                <input
                  className={styles.inputText}
                  type={"number"}
                  placeholder="Insert your course price"
                  value={volume}
                  onChange={(e) => {
                    setVolume(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={styles.inputPrice}>
              <div className={styles.name}>Duration*</div>
              <div>
                <input
                  className={styles.inputText}
                  type={"number"}
                  placeholder="Insert your course price"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                />
              </div>
            </div>

            <button
              className={styles.btnSaveLecture}
              onClick={handleSaveLecture}
            >
              Save Lecture
            </button>
            <NotificationContainer />
          </div>
        </div>
        <div className={styles.tableLecture}>
          <div className={styles.tableHeader}>
            <div className={styles.tableStt}>Lecture</div>
            <div className={styles.tableTile}>Title</div>
            <div className={styles.tableVolume}>Volume</div>
            <div className={styles.tableDuration}>Duration</div>
            <div className={styles.tableSort}>Sort</div>
            <div className={styles.tableFile}>File</div>
            <div className={styles.tableControl}>Control</div>
          </div>
          {lecture?.map((element, index) => {
            return (
              <div className={styles.tableContent} key={index}>
                <div className={styles.itemStt}>{index}</div>
                <div className={styles.itemTile}>{element.LessonTitle}</div>
                <div className={styles.itemVolume}>{element.Volume}</div>
                <div className={styles.itemDuration}>{element.Duration}</div>
                <div className={styles.itemSort}>{element.Sort}</div>
                <div className={styles.itemFile}>
                  <a href={URL.createObjectURL(element.File)}>Video course</a>
                </div>
                <div className={styles.itemControl}>
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => {
                      handleRemove(index);
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.saveCourse}>
          
          <div className={styles.loading}>
            <div className={styles.loadStatus}>{uploaded <100 ? "Loading..." : ""}</div>
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
          <button className={styles.btnSaveCourse} onClick={handleSaveCourse}>
            Save Course Content
          </button>
        </div>
      </div>
      {/* <div className={styles.tableCourseContent}>
        <div className={styles.tableHeader}>
          <div className={styles.tableSttTotal}>Content</div>
          <div className={styles.tableTileTotal}>Title</div>
          <div className={styles.tableLectureTotal}>Lectures</div>
          <div className={styles.tableVolumeTotal}>Volume</div>
          <div className={styles.tableDurationTotal}>Duration</div>
          <div className={styles.tableSortTotal}>Update Date</div>
          <div className={styles.tableControlTotal}>Control</div>
        </div>
        {arraySection?.map((element, index) => {
            return (
              <div className={styles.tableContent} key={index}>
                <div className={styles.itemStt}>{index}</div>
                <div className={styles.itemTile}>{element.LessonTitle}</div>
                <div className={styles.itemVolume}>{element.Volume}</div>
                <div className={styles.itemDuration}>{element.Duration}</div>
                <div className={styles.itemSort}>{element.Sort}</div>
                <div className={styles.itemFile}>
                  <a href={URL.createObjectURL(element.File)}>Video course</a>
                </div>
                <div className={styles.itemControl}>
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => {
                      handleRemove(index);
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
      </div> */}
      <div className={styles.buttonNext}>
        <button className={styles.btn} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default CourseContent;
