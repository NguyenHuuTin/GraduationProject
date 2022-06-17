import React, { useEffect } from "react";
import styles from "./Admin.module.css";
import Menu from "./Layout/Components/Menu/Menu";
import Header from "./Layout/Components/Header/Header";
import Content from "./Layout/Components/Content/Content";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin(props) {
  const navigate = useNavigate();
  const token = localStorage.token

  useEffect(()=>{
    if(token){
      axios.get(`http://localhost:57678/GetRoleByToken`,{
        headers:{
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then((res)=>{
        res.data === "Student" ? navigate("/") 
        : res.data === "Instructor" ? navigate("/instructorpage")
        : navigate("/admin")
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
      <div className={styles.appMenu}>
        <Menu />
      </div>
      <div className={styles.AppBody}>
        <Header />
        <Content>
        </Content>
      </div>
    </div>
  );
}

export default Admin;
