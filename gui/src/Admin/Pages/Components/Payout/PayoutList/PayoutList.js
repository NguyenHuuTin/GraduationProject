import React, { useEffect, useState } from "react";
import styles from "./PayoutList.module.css";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function PayoutList(props) {
  const [status, setStatus] = useState(false);
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
  }, [status]);

  const [remark, setRemark] = useState("");
  const [paid, setPaid] = useState("Paid");
  const handleSubmit = (id) => {
    axios
      .put(`http://localhost:57678/Payout`, {
        id: id,
        remark: remark,
        status: paid,
      })
      .then(() => {
        setStatus((prev) => !prev);
        NotificationManager.success("Successfully!");
      })
      .catch(() => {
        NotificationManager.error("Failed!");
      });
  };

  // Hook action Search
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(payoutList);

  useEffect(() => {
    if (search === "") {
      setFilter(payoutList);
    } else {
      var filterList = payoutList.filter((object) => {
        return (
          object.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          object.update.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          object.status.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      });
      setFilter(filterList);
    }
  }, [search, payoutList]);

  // Paging
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const count = 10;

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Hook action paging
  useEffect(() => {
    var mod = filter.length % count;
    if (mod === 0) {
      setTotalPage(filter.length / count);
    } else {
      setTotalPage(Math.floor(filter.length / count) + 1);
    }
    setLastIndex(currentPage * count);
    setFirstIndex(lastIndex - count);
  }, [filter.length, currentPage, lastIndex]);
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
          {filter.slice(firstIndex, lastIndex)?.map((element, index) => {
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
                      value={remark}
                      onChange={(e) => {
                        setRemark(e.target.value);
                      }}
                    />
                    <select
                      name="status"
                      className={styles.itemActionSelect}
                      onChange={(e) => {
                        setPaid(e.target.value);
                      }}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Reject">Reject</option>
                    </select>
                    <button
                      className={styles.buttonActionSubmit}
                      onClick={() => {
                        handleSubmit(element.id);
                      }}
                    >
                      Submit
                    </button>
                    <NotificationContainer/>
                  </div>
                ) : (
                  <div className={styles.itemAction}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.listPaging}>
        <div className={styles.showPage}>
          Showing page {currentPage} of {totalPage}
        </div>
        <div className={styles.btnPage}>
          <button
            disabled={currentPage === 1}
            className={styles.btnPrev}
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPage}
            className={styles.btnNext}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayoutList;
