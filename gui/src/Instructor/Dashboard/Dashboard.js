import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function Dashboard(props) {
  const [dashboard, setDashboard] = useState();
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [CourseList, setCourseList] = useState([]);
  const [saleData, setSaleData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [],
  });

  const token = localStorage.token;
  useEffect(() => {
    axios
      .get("http://localhost:57678/dashboard/GetTotal", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDashboard(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:57678/dashboard/SaleOfYear", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSaleData({
          // labels: ["Jan","Feb", "Mar", "Apr", "May", "Jun", 'Jul',  "Aug", "Sep", "Oct", "Nov", "Dec" ],
          labels: res.data.map((element) => element.monthString),
          datasets: [
            {
              label: "Sales",
              data: res.data.map((index) => index.sale),
              backgroundColor: ["rgba(75,192,192,1)"],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        });
      });
  },[]);

  useEffect(() => {
    axios
      .get("http://localhost:57678/Course")
      .then((res) => {
        setCourseList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setCourseList([]);
      });
  }, [status]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:57678/Course/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setStatus((prev) => !prev);
          NotificationManager.success("Delete course successfully!");
        } else {
          NotificationManager.error("Delete course failed!");
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          navigate("/login/signin");
        } else {
          NotificationManager.error("Delete course failed!");
        }
      });
  };

  const [filter, setFilter] = useState(CourseList);

  useEffect(() => {
    var filterList = CourseList.filter((object) => {
      return object.status === "Waiting for approved";
    });
    setFilter(filterList);
  }, [CourseList]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.textTitle}>
          <i className="fa-solid fa-gauge-high"></i>
        </div>
        <div className={styles.textTitle}>Instructor Dashboard</div>
      </div>

      <div className={styles.total}>
        <div className={styles.itemTotal}>
          <div className={styles.itemContent}>
            <div className={styles.itemTitle}>Total Sales</div>
            <div className={styles.itemCount}>
              ${dashboard && dashboard.totalSale}
            </div>
            <div className={styles.itemTagToday}>
              Today ${dashboard && dashboard.totalSaleByDay}
            </div>
          </div>
          <div className={styles.itemImg}>
            <img
              className={styles.img}
              src="https://saasmonks.in/App-Demo/Cursus-33214/public/frontend/images/dashboard/achievement.svg"
              alt=""
            />
          </div>
        </div>
        <div className={styles.itemTotal}>
          <div className={styles.itemContent}>
            <div className={styles.itemTitle}>Total Enroll</div>
            <div className={styles.itemCount}>
              ${dashboard && dashboard.totalEnrollment}
            </div>
            <div className={styles.itemTagTodays}>
              Today ${dashboard && dashboard.totalEnrollmentByDay}
            </div>
          </div>
          <div className={styles.itemImg}>
            <img
              className={styles.img}
              src="https://saasmonks.in/App-Demo/Cursus-33214/public/frontend/images/dashboard/graduation-cap.svg"
              alt=""
            />
          </div>
        </div>
        <div className={styles.itemTotal}>
          <div className={styles.itemContent}>
            <div className={styles.itemTitle}>Total Courses</div>
            <div className={styles.itemCount}>
              ${dashboard && dashboard.totalCourse}
            </div>
            <div className={styles.itemTagToday}>
              Today ${dashboard && dashboard.totalCourseByDay}
            </div>
          </div>
          <div className={styles.itemImg}>
            <img
              className={styles.img}
              src="https://saasmonks.in/App-Demo/Cursus-33214/public/frontend/images/dashboard/online-course.svg"
              alt=""
            />
          </div>
        </div>
        <div className={styles.itemTotal}>
          <div className={styles.itemContent}>
            <div className={styles.itemTitle}>Total Students</div>
            <div className={styles.itemCount}>
              ${dashboard && dashboard.totalStudent}
            </div>
            <div className={styles.itemTagTodays}>
              Today ${dashboard && dashboard.totalStuentByDay}
            </div>
          </div>
          <div className={styles.itemImg}>
            <img
              className={styles.img}
              src="https://saasmonks.in/App-Demo/Cursus-33214/public/frontend/images/dashboard/knowledge.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={styles.bodyCreate}>
        <div className={styles.iconCourse}>
          <i className="fa-solid fa-book"></i>
        </div>
        <div className={styles.createTitle}>Jump Into Course Creation</div>
        <div>
          <button className={styles.createBtn}>Create Your Course</button>
        </div>
      </div>

      <div className={styles.chartMain}>
        <div className={styles.chartTitle}>Sales Of The Year</div>
        <Line className={styles.chartBody} data={saleData} />
      </div>

      <div className={styles.textTitle}>Profile Analytics</div>
      <div className={styles.profileAnalytics}>
        <div className={styles.currentSub}>
          <div className={styles.currentSubTitle}>Current subscribers</div>
          <div className={styles.currentSubCount}>
            {dashboard && dashboard.totalSubscriber}
          </div>
        </div>
        <div className={styles.viewSell}>
          <div className={styles.view}>
            <div className={styles.name}>Sell (today)</div>
            <div className={styles.number}>
              {dashboard && dashboard.totalSaleByDay}
            </div>
          </div>
          <div className={styles.view}>
            <div className={styles.name}>Enroll</div>
            <div className={styles.number}>
              {dashboard && dashboard.totalEnrollmentByDay}
            </div>
          </div>
        </div>
        <Link to={"."} className={styles.gotoProfile}>
          <div>GO TO PROFILE ANALYTICS</div>
        </Link>
      </div>
      <div className={styles.textTitle}>Submit Courses</div>
      {filter &&
        filter.map((element) => {
          return (
            <div className={styles.submitCourse} key={element.id}>
              <div className={styles.infoCourse}>
                <div className={styles.courseName}>{element.title}</div>
                <div className={styles.courseStatus}>Pending</div>
              </div>
              <div className={styles.timeSubmit}>{element.updateAt}</div>
              <Link to={"."} className={styles.linkDelete} onClick={()=>{handleDelete(element.id)}}>
                Delete
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default Dashboard;
