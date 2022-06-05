import React, { useEffect, useState } from "react";
import styles from "./PayoutList.module.css";
import axios from "axios";

function PayoutList(props) {
  const [payoutList, setPayoutList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:57678/Payout")
      .then((res) => {
        setPayoutList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setPayoutList([]);
      });
  }, []);
  return (
    <div className={styles.cardPayoutList}>
      <div className={styles.PayoutListTitle}>Payout List</div>
      <div className={styles.PayoutList}>
        <div className={styles.PayoutListButtonSearch}>
          <div className={styles.PayoutListButton}>
            <button className={styles.PayoutButton}>Copy</button>
            <button className={styles.PayoutButton}>CSV</button>
            <button className={styles.PayoutButton}>Excel</button>
            <button className={styles.PayoutButton}>Print</button>
          </div>
          <div className={styles.PayoutListSearch}>
            <div className={styles.PayoutTitleSearch}>Search:</div>
            <div>
              <input
                className={styles.PayoutInputSearch}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className={styles.PayoutListAll}>
          <div className={styles.headerPayoutList}>
            <div className={styles.headerID}>#</div>
            <div className={styles.headerName}>Name</div>
            <div className={styles.headerAmount}>Amount</div>
            <div className={styles.headerRemark}>Remark</div>
            <div className={styles.headerStatus}>Status</div>
            <div className={styles.headerUpdate}>Last Update</div>
            <div className={styles.headerAction}>Action</div>
          </div>
          {payoutList?.map((element, index) => {
            return (
              <div className={styles.itemPayoutList} key={element.id}>
                <div className={styles.itemID}>{index + 1}</div>
                <div className={styles.itemName}>{element.name}</div>
                <div className={styles.itemAmount}>{element.amount}</div>
                {element.remark === null ? (
                  <div className={styles.itemRemark}> - </div>
                ) : (
                  <div className={styles.itemRemark}>{element.remark}</div>
                )}
                {element.status === "Pandding" ? (
                  <div className={styles.itemStatus}>
                    <div className={styles.tagStatusPanding}>
                      {element.status}
                    </div>
                  </div>
                ) : element.status === "Paid" ? (
                  <div className={styles.itemStatus}>
                    <div className={styles.tagStatusPaid}>{element.status}</div>
                  </div>
                ) : (
                  <div className={styles.itemStatus}>
                    <div className={styles.tagStatusReject}>
                      {element.status}
                    </div>
                  </div>
                )}
                <div className={styles.itemUpdate}>{element.update}</div>
                {element.status === "Pandding" ? (
                  <div className={styles.itemAction}>
                    <input
                      className={styles.itemActionInput}
                      type="text"
                      name="remark"
                      required=""
                      placeholder="Remark please"
                    />
                    <select name="status" className={styles.itemActionSelect}>
                      <option value="1">Paid</option>
                      <option value="2">Reject</option>
                    </select>
                    <button className={styles.buttonActionSubmit}>
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className={styles.itemAction}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.PayoutListPaging}></div>
    </div>
  );
}

export default PayoutList;
