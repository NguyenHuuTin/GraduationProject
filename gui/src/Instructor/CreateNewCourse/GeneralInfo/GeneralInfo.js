import React, { useEffect, useState } from "react";
import styles from "./GeneralInfo.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GeneralInfo(props) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTile] = useState("");
  const [language, setLanguage] = useState("");
  const [subCate, setSubCate] = useState("");
  const [price, setPrice] = useState(0);
  const [languageList, setLanguageList] = useState([]);
  const [backGround, setBackGround] = useState();
  const [courseID, setCourseID] = useState("");
  const navigate = useNavigate();

  const url =
    "https://saasmonks.in/App-Demo/Cursus-33214/public/frontend/images/courses/add_img.jpg";
  useEffect(() => {
    return () => {};
  }, [backGround]);

  const handleBackGround = (e) => {
    const file = e.target.files[0];
    setBackGround(file);
  };

  useEffect(() => {
    axios
      .get("http://localhost:57678/Languages")
      .then((res) => {
        setLanguageList(res.data);
        setLanguage(res.data[0].id);
      })
      .catch(() => {
        setLanguageList([]);
      });
  }, []);

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:57678/subcategory")
      .then((res) => {
        setCategoryList(res.data);
        setSubCate(res.data[0].id);
      })
      .catch(() => {
        setCategoryList([]);
      });
  }, []);

  const handleValue = (e, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const handleSubmit = () => {
    if (description !== "" && title !== "" && subTitle !== "" && backGround) {
      if (title.length >= 10 && subTitle.length >= 10) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("subTitle", subTitle);
        formData.append("description", description);
        formData.append("languageId", language);
        formData.append("subCategoryId", subCate);
        formData.append("price", price);
        formData.append("backgroupCourse", backGround);
        const token = localStorage.token;
        console.log(token);
        if (token) {
          axios
            .post("http://localhost:57678/Courses/Information", formData, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res.data);
              setCourseID(res.data);
              navigate(`${res.data}`);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        alert(
          "SubTitle and Title must be a string or array type with a minimum length of '10'"
        );
      }
    } else {
      alert("Please fill out the information completely");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.courseTitle}>
          <div className={styles.inputTitle}>
            <div className={styles.name}>Course Title*</div>
            <div>
              <input
                className={styles.inputText}
                type={"text"}
                maxLength="60"
                placeholder="Insert your course title."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.inputTitle}>
            <div className={styles.name}>Course Subtitle*</div>
            <div>
              <input
                className={styles.inputText}
                type={"text"}
                maxLength="60"
                placeholder="Insert your course subtitle."
                value={subTitle}
                onChange={(e) => {
                  setSubTile(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.description}>
          <div className={styles.name}>Course Description</div>
          <div className={styles.inputDes}>
            <CKEditor editor={ClassicEditor} onChange={handleValue} />
          </div>
        </div>

        <div className={styles.courseTitle}>
          <div className={styles.inputID}>
            <div className={styles.name}>Language*</div>
            <div>
              <select
                className={styles.inputText}
                type={"text"}
                maxLength="60"
                placeholder="Insert your course title."
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
              >
                {languageList?.map((element) => {
                  return (
                    <option key={element.id} value={element.id}>
                      {element.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={styles.inputID}>
            <div className={styles.name}>Course SubCategory*</div>
            <div>
              <select
                className={styles.inputText}
                type={"text"}
                maxLength="60"
                placeholder="Insert your course subtitle."
                onChange={(e) => {
                  setSubCate(e.target.value);
                }}
              >
                {categoryList?.map((element) => {
                  return (
                    <option key={element.id} value={element.id}>
                      {element.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className={styles.inputID}>
            <div className={styles.name}>Price*</div>
            <div>
              <input
                className={styles.inputText}
                type={"text"}
                placeholder="Insert your course price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.mainBackGround}>
          <div className={styles.image}>
            <img
              className={styles.image}
              src={backGround ? URL.createObjectURL(backGround) : url}
              alt=""
            />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>Cover Image</div>
            <div className={styles.contentBody}>
              Upload your course image here. It must meet our course image
              quality standards to be accepted. Important guidelines: 750x422
              pixels; .jpg, .jpeg,. gif, or .png. no text on the image max file
              size 1mb.
            </div>
            <div className={styles.customFile}>
              <input
                type={"file"}
                className={styles.inputFile}
                onChange={handleBackGround}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonNext}>
        <button
          className={styles.btn}
          onClick={() => {
            handleSubmit();
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default GeneralInfo;
