import React, { useEffect, useState } from "react";
import styles from "./GeneralInfo.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import axios from "axios";

function GeneralInfo(props) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTile] = useState("");
  const [language, setLanguage] = useState("");
  const [subCate, setSubCate] = useState("");
  const [price, setPrice] = useState(0);
  const [languageList, setLanguageList] = useState([]);

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
    if (description !== "" && title !== "" && subTitle !== "") {
      if (title.length >= 10 && subTitle.length >= 10) {
        props.handleData(
          title,
          subTitle,
          description,
          language,
          subCate,
          price
        );
        props.handleStatus(1);
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
      <div className={styles.title}>
        <i className="fa-solid fa-circle-info" style={{ marginRight: 10 }}></i>
        General Information
      </div>
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

        {/* <div className={styles.coursePrice}>
          <div className={styles.priceTitle}>
            <div className={styles.textPriceTitle}>
              <i className="fa-solid fa-dollar-sign"></i>
            </div>
            <div className={styles.textPriceTitle}>Pricing</div>
          </div>
          <div className={styles.coursePriceInput}>
            <div className={styles.inputIsFree}>
              <div className={styles.name}>Is Free*</div>
              <div>
                <select
                  className={styles.inputText}
                  type={"text"}
                  onChange={(e) => {
                    setIsFree(e.target.value);
                  }}
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>
              </div>
            </div>
            <div className={styles.inputPrice}>
              <div className={styles.name}>Price*</div>
              <div>
                <input
                  className={styles.inputText}
                  type={"text"}
                  placeholder="Insert your course price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className={styles.inputPrice}>
              <div className={styles.name}>Discount Price</div>
              <div>
                <input
                  className={styles.inputText}
                  type={"text"}
                  maxLength="60"
                  placeholder="Discount price if have"
                  onChange={(e) => {
                    setDiscount(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className={styles.buttonNext}>
        <button
          className={styles.btn}
          onClick={() => {
            handleSubmit();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default GeneralInfo;
