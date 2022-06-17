import React, { useEffect } from "react";
import styles from "./InstructorPage.module.css";
import Menu from "./Layout/Menu/Menu";
import Header from "./Layout/Header/Header";
import Content from "./Layout/Content/Content";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InstructorPage(props) {
  const navigate = useNavigate();
  const token = localStorage.token;

  useEffect(()=>{
    if(token){
      axios.get(`http://localhost:57678/GetRoleByToken`,{
        headers:{
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then((res)=>{
        res.data === "Student" && navigate("/") 
      })
      .catch((error)=>{
        navigate('/login/signin');
      })
    }
    else{
      navigate('/login/signin');
    }
  },[])
  return (
    <div className={styles.app}>
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <Header />
        </div>
        <div className={styles.AppBody}>
          <Menu />
          <Content />
        </div>
      </div>
    </div>
  );
}

export default InstructorPage;
