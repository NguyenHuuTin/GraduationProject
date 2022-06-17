import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Payout.module.css";

function Payout(props) {
  const [listPayout, setListPayout] = useState();
  const [available, setAvailable] = useState(0);
  const [number, setNumber] = useState(0);
  const [status, setStatus] = useState(false);

  const token = localStorage.token;

  useEffect(() => {
    axios
      .get("http://localhost:57678/Payout/Instructor", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListPayout(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [status]);

  useEffect(() => {
    axios
      .get("http://localhost:57678/Payout/AvailableAmount", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAvailable(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [status]);

  const handleSubmit = ()=>{
    var formData = new FormData();
    formData.append("amount", number)
    axios.post(`http://localhost:57678/Payout/InsertPayout`,formData,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res)=>{
      setStatus(prev => !prev)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.textTitle}>
          <i className="fa-solid fa-hand-holding-dollar"></i>
        </div>
        <div className={styles.textTitle}>Payout</div>
      </div>

      <div className={styles.body}>
        <div className={styles.itemPayout}>
          <div className={styles.available}>
            <div className={styles.titleAvailable}>Available Amount</div>
            <div className={styles.numAvailable}>$ {available}</div>
            <div className={styles.noteAvailable}>
              Your payout will be take{" "}
              <strong style={{ color: "black" }}>2 3 business days</strong>
            </div>
          </div>
          <div className={styles.payoutNow}>
            <div className={styles.titleAvailable}>Payout Now</div>
            <input
              className={styles.inputNum}
              type={"number"}
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
            <button className={styles.btnSetAccount} onClick={handleSubmit}>Set Account</button>
          </div>
        </div>
        <div className={styles.listPayout}>
          <div className={styles.header}>
            <div className={styles.itemHeader}>Amount</div>
            <div className={styles.itemHeader}>Remark</div>
            <div className={styles.itemHeader}>Status</div>
            <div className={styles.itemHeader}>Last Update</div>
          </div>
          {listPayout &&
            listPayout.map((element) => {
              return (
                <div className={styles.item}>
                  <div className={styles.itemContent}>$ {element.amount}</div>
                  <div className={styles.itemContent}>{element.remark ? element.remark : "_"}</div>
                  <div className={styles.itemContent}>{element.status}</div>
                  <div className={styles.itemContent}>{element.update}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Payout;
