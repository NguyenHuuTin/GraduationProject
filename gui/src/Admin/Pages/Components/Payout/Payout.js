import React from 'react';
import styles from './Payout.module.css';
import {Link} from 'react-router-dom';
import PayoutList from './PayoutList/PayoutList';

function Payout(props) {
    return (
        <div className={styles.cardContentPayout}>
      <div className={styles.cardHeaderPayout}>
        <h2 className={styles.headerTitlePayout}>Payout</h2>
        <div className={styles.headerPathPayout}>
          <div className={styles.headerPathItemPayout}>
            <Link to={".."} className={styles.itemContentPayoutActive}>
              Home
            </Link>
          </div>
          /
          <div className={styles.headerPathItemPayout}>
            <Link to={"/Payout"} className={styles.itemContentPayout}>
              Payout
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.PayoutMain}>
        <div className={styles.PayoutMainPayoutList}>
          <PayoutList/>
        </div>
      </div>
    </div>
    );
}

export default Payout;