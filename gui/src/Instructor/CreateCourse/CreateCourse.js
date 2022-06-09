import axios from "axios";
import React, { useState } from "react";
import styles from "./CreateCourse.module.css";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import View from "./View/View";

function CreateCourse(props) {
  const [description, setDescription] = useState("aaaaaaaaaaaaaaaaaaaaaaaa");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTile] = useState("");
  const [language, setLanguage] = useState("");
  const [subCate, setSubCate] = useState("");
  const [promotion , setPromotion] = useState("");
  const [isFree, setIsFree] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const [backGround, setBackGround] = useState();
  const [courseID, setCourseID] = useState("")
  const [status, setStatus] = useState(0);
  const handleStatus = (e)=>{
    setStatus(e);
  }

  const handleData = (title, subTitle, description, language, subCate, promotion, isFree, price, discount)=>{
    setTitle(title);
    setSubTile(subTitle);
    setLanguage(language);
    setSubCate(subCate);
    setPromotion(promotion);
    setIsFree(isFree);
    setPrice(price);
    setDiscount(discount);
  }

  const handleCreateInfoCourse = async (backGround)=>{
    setBackGround(backGround);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('description', description);
    formData.append('languageId', language);
    formData.append('subCategoryId', subCate);
    formData.append('isFree', isFree);
    formData.append('price', price);
    formData.append('discount', discount);
    formData.append('backgroupCourse', backGround);
    const token = localStorage.token;
    console.log(token);
    if(token){
      await axios.post('http://localhost:57678/Courses/Information', formData,{
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res)=>{
      console.log(res.data)
      setCourseID(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.textTitle}>
          <i className="fa-solid fa-circle-plus"></i>
        </div>
        <div className={styles.textTitle}>Create New Course</div>
      </div>

      <div className={styles.stepContainer}>
        <div className={styles.stepItem}>
          <div className={styles.stepOne}>
            <div className={styles.stepStatusHidden}></div>
            <div className={styles.stepPointActive}></div>
            <div className={status >= 1 ? styles.stepStatusActive : styles.stepStatus}></div>
          </div>
          <div className={styles.stepTitle}>GENERAL INFORMATION</div>
        </div>
        <div className={styles.stepItem}>
          <div className={styles.stepOne}>
            <div className={status >= 2 ? styles.stepStatusActive : styles.stepStatus}></div>
            <div className={status >= 2 ? styles.stepPointActive : styles.stepPoint}></div>
            <div className={status >= 2 ? styles.stepStatusActive : styles.stepStatus}></div>
          </div>
          <div className={styles.stepTitle}>VIEW</div>
        </div>
        <div className={styles.stepItem}>
          <div className={styles.stepOne}>
            <div className={status >= 3 ? styles.stepStatusActive : styles.stepStatus}></div>
            <div className={status >= 3 ? styles.stepPointActive : styles.stepPoint}></div>
            <div className={status >= 3 ? styles.stepStatusActive : styles.stepStatus}></div>
          </div>
          <div className={styles.stepTitle}>COURSE CONTENT</div>
        </div>
        <div className={styles.stepItem}>
          <div className={styles.stepOne}>
            <div className={status >= 4 ? styles.stepStatusActive : styles.stepStatus}></div>
            <div className={status >= 4 ? styles.stepPointActive : styles.stepPoint}></div>
            <div className={styles.stepStatusHidden}></div>
          </div>
          <div className={styles.stepTitle}>EXTRA INFORMATION</div>
        </div>
      </div>
      <div className={styles.content}>
        {
          status === 0 ? <GeneralInfo handleStatus={handleStatus} handleData={handleData}/>
          : <View handleStatus={handleStatus} handleCreateInfoCourse={handleCreateInfoCourse}/>
        }
      </div>
    </div>
  );
}

export default CreateCourse;
