import React, { useEffect, useState } from "react";
import styles from "./Chart.module.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";

function Chart(props) {
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

  useEffect(() => {
    axios
      .get("http://localhost:57678/dashboard/InstructorEarning")
      .then((res) => {
        setSaleData({
          // labels: ["Jan","Feb", "Mar", "Apr", "May", "Jun", 'Jul',  "Aug", "Sep", "Oct", "Nov", "Dec" ],
          labels: res.data.map((element) => element.monthString),
          datasets: [
            {
              label: "Instructor Earning",
              data: res.data.map((index) => index.sale),
              backgroundColor: ["rgba(75,192,192,1)"],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        });
      });
  });

  return (
    <div className={styles.chart}>
      <div className={styles.chartBody}>
        <div className={styles.chartTitle}>
          <p>Statistics</p>
        </div>
        <Bar className={styles.chartContent} data={saleData} />
      </div>
    </div>
  );
}

export default Chart;
