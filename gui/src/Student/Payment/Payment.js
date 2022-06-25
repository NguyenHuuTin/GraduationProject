import React from "react";
import styles from "./Payment.module.css";
import {useParams } from "react-router-dom";

function Payment(props) {
  const { vnp_Amount } = useParams(0);
  console.log(vnp_Amount);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.body}>
          <i
            className="fa-solid fa-circle-check"
            style={{ color: "#23D39D", fontSize: 50, marginTop: 40 }}
          ></i>
          <div className={styles.title}>Payment Successful!</div>
          <div className={styles.number}>Transaction Number: 149538292359</div>
          <div className={styles.itemPay}>
            <div style={{ fontWeight: 500 }}>Amount Price:</div>
            <div>$ 250</div>
          </div>
          <div className={styles.itemPay}>
            <div style={{ fontWeight: 500 }}>Bank:</div>
            <div>NCB</div>
          </div>
        </div>
        <img
          alt="payment"
          className={styles.img}
          src="https://res.cloudinary.com/dlurdcc6c/image/upload/v1655393991/samples/Course/image/paymentcomfirm_sw6yaz.png"
        ></img>
      </div>
    </div>
  );
}

export default Payment;
