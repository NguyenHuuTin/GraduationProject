import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewCourse.module.css";
import parse from "html-react-parser";
import {useNavigate } from "react-router-dom";

function ViewCourse(props) {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [ip, setIP] = useState("");
  const navigate = useNavigate();
  const token = localStorage.token;

  useEffect(() => {
    axios
      .get(`http://localhost:57678/CourseStudent/${id}`)
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data);
    setIP(res.data.IPv4);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  const handleBuy = () => {
    var formData = new FormData();
    formData.append("ip", ip);
    formData.append("amount", course.price*100000);
    axios
      .post("http://localhost:57678/Payment", formData)
      .then((res) => {
        handleAddOrder()
        window.location = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddOrder = async ()=>{
    if(window.confirm('Are you sure you want to buy this course?')){
      if(token){
        await axios.post('http://localhost:57678/AddOrdeDetail',{
        courseId: id,
        price: course.price
      },{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res)=>{
        console.log(res.data);
        course.price === 0 && navigate("/myCourse")
      })
      .catch((error)=>{
        console.log(error)
      })
      }
      else{
        navigate("/login/signin")
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleCourse}>{course && course.title}</div>
        <div className={styles.descriptionCourse}>
          {course && parse(course.description)}
        </div>
        <div className={styles.titleContentCourse}>Nội dung khóa học</div>
        {course &&
          course.section.map((element, index) => {
            return (
              <div key={element.id} className={styles.sectionCourse}>
                <div className={styles.titleSection}>
                  {element.title}
                </div>
                <div className={styles.lectureCourse}>
                  {element.lessons.map((item, i) => {
                    return (
                      <div key={item.id} className={styles.titleLecture}>
                        <i
                          className="fa-solid fa-circle-play"
                          style={{ marginRight: 10, color: "#F9B9A7" }}
                        ></i>
                        {item.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.backGroup}>
        <img
          src={course && course.image}
          alt="BackGround Course"
          className={styles.imgCourse}
        ></img>
        <div className={styles.priceCourse}>
          Price: {course && course.price}
          <i className="fa-solid fa-dollar-sign" style={{ marginLeft: 10 }}></i>
        </div>
        <div className={styles.btnBuy}>
          <button className={styles.btnBuyCourse} onClick={course && (course.price === 0 ? handleAddOrder : handleBuy)}>
            Buy Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
