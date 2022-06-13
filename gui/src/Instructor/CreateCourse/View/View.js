import React, { useEffect, useState } from "react";
import styles from "./View.module.css";

function View(props) {
    const [backGround, setBackGround] = useState();
    const url = "https://saasmonks.in/App-Demo/Cursus-33214/public/frontend/images/courses/add_img.jpg";
    useEffect(()=>{

        return()=>{
        }
    },[backGround])
    const handleBackGround = (e)=>{
        const file = e.target.files[0]
        setBackGround(file)
    }

    const handleSubmit=()=>{
      if(backGround)
      {
        props.handleCreateInfoCourse(backGround)
      }
      else{
        alert("Please choose photo")
      }
    }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <i className="fa-solid fa-image" style={{ marginRight: 10 }}></i>
        View
      </div>
      <div className={styles.main}>
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
            Upload your course image here. It must meet our course image quality
            standards to be accepted. Important guidelines: 750x422 pixels;
            .jpg, .jpeg,. gif, or .png. no text on the image max file size 1mb.
          </div>
          <div className={styles.customFile}>
            <input type={"file"} className={styles.inputFile} onChange={handleBackGround}/>

          </div>
        </div>
      </div>
      <div className={styles.buttonNext}>
        <button
          className={styles.btn}
          onClick={() => {
            handleSubmit()
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default View;
