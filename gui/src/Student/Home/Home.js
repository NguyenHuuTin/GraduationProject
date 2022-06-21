import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { SliderData } from "./SlideData";

function Home(props) {
  const [course, setCourse] = useState([]);
  const [myCourse, setMyCourse] = useState([]);
  const [filter, setFilter] = useState([]);
  const token = localStorage.token;
  useEffect(() => {
    axios
      .get("http://localhost:57678/ActiveCourseStudentPage")
      .then((res) => {
        setCourse(res.data);
      })
      .catch((error) => {
        console.log(error);
        setCourse([]);
      });
  }, []);

  useEffect(() => {
    if(token){
      axios
      .get("http://localhost:57678/MyCourseStudentPage",{
        headers:{
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data);
        setMyCourse(res.data);
      })
      .catch((error) => {
        console.log(error);
        setMyCourse([]);
      });
    }
  }, []);

  const checkMyCourse = (id)=>{
    var result = false;
    myCourse.forEach(element => {
      if(element.id === id){
        result = true;
      }
    });
    return result;
  }

  useEffect(()=>{
    if(course && myCourse){
      var filterList = course.filter((object) => {
        return (
          checkMyCourse(object.id) === false
        );
      });
      setFilter(filterList);
    }
  },[course, myCourse])

  const [current, setCurrent] = useState(0);
  const length = props.slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(props.slides) || props.slides.length <= 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <section className={styles.slider}>
        <div className={styles.leftArrow} onClick={prevSlide}>
          <i className="fa-solid fa-angle-left"></i>
        </div>
        <div className={styles.rightArrow} onClick={nextSlide}>
          <i className="fa-solid fa-angle-right" style={{ marginLeft: 3 }}></i>
        </div>

        {SliderData.map((slide, index) => {
          return (
            <div
              className={
                index === current ? `${styles.slideActive}` : `${styles.slide}`
              }
              key={index}
            >
              {index === current && (
                <img
                  src={slide.image}
                  alt="travelImage"
                  className={styles.image}
                />
              )}
            </div>
          );
        })}
      </section>

      <div className={styles.main}>
        {filter &&
          filter.map((element) => {
            return (
              <Link key={element.id} to={`/course/${element.id}`} className={styles.itemCourse}>
                <img
                  alt="course item"
                  src={element.image}
                  className={styles.imgCourse}
                ></img>
                <div className={styles.courseInfo}>
                  <div className={styles.courseName}>{element.title}</div>
                  <div className={styles.infoInstructor}>
                    <img
                      className={styles.imgUser}
                      alt="img_user"
                      src={element.avatar}
                    ></img>
                    <div className={styles.userName}>{element.user}</div>
                    <div className={styles.checkIcon}>
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                  </div>
                  <div className={styles.coursePrice}>{element.price}$</div>
                </div>
              </Link>
            )
          })}
         {myCourse &&
          myCourse.map((element) => {
            return (
              <Link key={element.id} to={`/myCourse/${element.id}`} className={styles.itemCourse}>
                <img
                  alt="course item"
                  src={element.image}
                  className={styles.imgCourse}
                ></img>
                <div className={styles.courseInfo}>
                  <div className={styles.courseName}>{element.title}</div>
                  <div className={styles.infoInstructor}>
                    <img
                      className={styles.imgUser}
                      alt="img_user"
                      src={element.avatar}
                    ></img>
                    <div className={styles.userName}>{element.user}</div>
                    <div className={styles.checkIcon}>
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                  </div>
                  <div className={styles.courseKeepStudying}>keep studying</div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
