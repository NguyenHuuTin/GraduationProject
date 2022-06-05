import React from "react";
import styles from "./Subscription.module.css";
import { Link } from "react-router-dom";
import SubscriptionList from "./SubscriptionList/SubscriptionList";
import SubscriptionFilter from "./SubscriptionFilter/SubscriptionFilter";

function Subscription(props) {
  return (
    <div className={styles.cardContentSubscription}>
      <div className={styles.cardHeaderSubscription}>
        <h2 className={styles.headerTitleSubscription}>Subscription Report</h2>
        <div className={styles.headerPathSubscription}>
          <div className={styles.headerPathItemSubscription}>
            <Link to={".."} className={styles.itemContentSubscriptionActive}>
              Home
            </Link>
          </div>
          /
          <div className={styles.headerPathItemSubscription}>
            <Link to={"/Subscription"} className={styles.itemContentSubscription}>
              Subscription
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.SubscriptionMain}>
        <div className={styles.SubscriptionMainFilter}>
          <SubscriptionFilter />
        </div>
        <div className={styles.SubscriptionMainSubscriptionList}>
          <SubscriptionList />
        </div>
      </div>
    </div>
  );
}

export default Subscription;
