import React, { useEffect, useState } from "react";
import "./StatisticCategory.css";
import axios from "axios";

function StatisticCategory(props) {
  const [language, setLanguage] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:57678/Languages")
      .then((res) => {
        setLanguage(res.data.length);
      })
      .catch(() => {
        setLanguage(0);
      });
  }, []);

  const [subcategory, setSubCategory] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:57678/subcategory")
      .then((res) => {
        setSubCategory(res.data.length);
      })
      .catch(() => {
        setSubCategory(0);
      });
  }, []);

  const [category, setCategory] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:57678/Category")
      .then((res) => {
        setCategory(res.data.length);
      })
      .catch(() => {
        setCategory(0);
      });
  }, []);
  return (
    <div className="statistic-category-body">
      <div className="card-statistic-category">
        <div className="card-statistic-category-item">
          <div className="item-icon-category1">
            <i className="fa-solid fa-language icon-category"></i>
          </div>
          <div className="statistic-category-item-content">
            <div>Language</div>
            <div className="count-statistic-category">{language}</div>
          </div>
        </div>
        <div className="card-statistic-category-item">
          <div className="item-icon-category2">
            <i className="fa-solid fa-list icon-category"></i>
          </div>
          <div className="statistic-category-item-content">
            <div>Category</div>
            <div className="count-statistic-category">{category}</div>
          </div>
        </div>
        <div className="card-statistic-category-item">
          <div className="item-icon-category3">
            <i className="fa-solid fa-boxes-stacked icon-category"></i>
          </div>
          <div className="statistic-category-item-content">
            <div>SubCategory</div>
            <div className="count-statistic-category">{subcategory}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticCategory;
