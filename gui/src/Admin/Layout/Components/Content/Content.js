import React from "react";
import "./Content.css";
import Dashboard from "../../../Pages/Components/Dashboard/Dashboard";
import User from "../../../Pages/Components/User/User";
import { Routes, Route, Outlet } from "react-router-dom";
import Category from "../../../Pages/Components/Category/Category";
import SubCategory from "../../../Pages/Components/SubCategory/SubCategory";
import Student from "../../../Pages/Components/Student/Student";
import Instructor from "../../../Pages/Components/Instructor/Instructor";
import Language from "../../../Pages/Components/Language/Language";
import Payout from "../../../Pages/Components/Payout/Payout";
import Course from "../../../Pages/Components/Course/Course";
import CourseSell from "../../../Pages/Components/CourseSell/CourseSell";
import Subscription from "../../../Pages/Components/Subscription/Subscription";
import InstructorRegistration from "../../../Pages/Components/InstructorRegistration/InstructorRegistration";
import StudentRegistration from "../../../Pages/Components/StudentRegistration/StudentRegistration";
import ViewInstructor from "../../../Pages/Components/ViewInstructor/ViewInstructor";

function Content(props) {
  return (
    <div className="content">
      <Routes>
        <Route path="user/*" element={<User />}>
          
        </Route>

        <Route index element={<Dashboard />} />

        <Route path="language/*" element={<Language />}>
          
        </Route>

        <Route path="category/*" element={<Category />}>
          
        </Route>

        <Route path="subcategory/*" element={<SubCategory />}>
          
        </Route>

        <Route path="student" element={<Student />} />

        <Route path="instructor" element={<Instructor />} />

        <Route path="instructor/:id" element={<ViewInstructor />} />

        <Route path="payout" element={<Payout />} />

        <Route path="course/*" element={<Course />} >
          
        </Route>
        <Route path="courseSelling" element={<CourseSell />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="instructorRegistration" element={<InstructorRegistration />} />
        <Route path="studentRegistration" element={<StudentRegistration />} />
      </Routes>
      <Outlet/>
    </div>
  );
}

export default Content;
