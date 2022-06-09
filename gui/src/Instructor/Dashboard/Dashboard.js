import React from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

function Dashboard(props) {
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
            <div className={styles.itemCount}>$65933.81</div>
            <div className={styles.itemTagToday}>Today $0</div>
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
            <div className={styles.itemTitle}>Total Sales</div>
            <div className={styles.itemCount}>$65933.81</div>
            <div className={styles.itemTagTodays}>Today $0</div>
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
            <div className={styles.itemTitle}>Total Sales</div>
            <div className={styles.itemCount}>$65933.81</div>
            <div className={styles.itemTagToday}>Today $0</div>
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
            <div className={styles.itemTitle}>Total Sales</div>
            <div className={styles.itemCount}>$65933.81</div>
            <div className={styles.itemTagTodays}>Today $0</div>
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
    <div className={styles.textTitle}>Profile Analytics</div>
      <div className={styles.profileAnalytics}>
        <div className={styles.currentSub}>
          <div className={styles.currentSubTitle}>Current subscribers</div>
          <div className={styles.currentSubCount}>1</div>
        </div>
        <div className={styles.viewSell}>
          <div className={styles.view}>
            <div className={styles.name}>View</div>
            <div className={styles.number}>1</div>
          </div>
          <div className={styles.view}>
            <div className={styles.name}>Sell (today)</div>
            <div className={styles.number}>65933.81</div>
          </div>
          <div className={styles.view}>
            <div className={styles.name}>Enroll</div>
            <div className={styles.number}>18</div>
          </div>
        </div>
        <Link to={"."} className={styles.gotoProfile}>
          <div>GO TO PROFILE ANALYTICS</div>
        </Link>
      </div>
      <div className={styles.textTitle}>Submit Courses</div>
      <div className={styles.submitCourse}>
        <div className={styles.infoCourse}>
            <div className={styles.courseName}>something something</div>
            <div className={styles.courseStatus}>Pending</div>
        </div>
        <div className={styles.timeSubmit}>Submitted2 days ago</div>
        <Link to={"."} className={styles.linkDelete}>Delete</Link>
      </div>

      <div className={styles.submitCourse}>
        <div className={styles.infoCourse}>
            <div className={styles.courseName}>something something</div>
            <div className={styles.courseStatus}>Pending</div>
        </div>
        <div className={styles.timeSubmit}>Submitted2 days ago</div>
        <Link to={"."} className={styles.linkDelete}>Delete</Link>
      </div>

      <div className={styles.submitCourse}>
        <div className={styles.infoCourse}>
            <div className={styles.courseName}>something something</div>
            <div className={styles.courseStatus}>Pending</div>
        </div>
        <div className={styles.timeSubmit}>Submitted2 days ago</div>
        <Link to={"."} className={styles.linkDelete}>Delete</Link>
      </div>
    </div>
  );
}

export default Dashboard;
