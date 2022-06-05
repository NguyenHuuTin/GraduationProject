import React from "react";
import "./Content.css";
import Dashboard from "../../../Pages/Components/Dashboard/Dashboard";
import User from "../../../Pages/Components/User/User";
import { Routes, Route } from "react-router-dom";
import AddNewUser from "../../../Pages/Components/User/AddNewUser/AddNewUser";
import EditUser from "../../../Pages/Components/User/EditUser/EditUser";
import Category from "../../../Pages/Components/Category/Category";
import AddNewCategory from "../../../Pages/Components/Category/AddNewCategory/AddNewCategory";
import EditCategory from "../../../Pages/Components/Category/EditCategory/EditCategory";
import SubCategory from "../../../Pages/Components/SubCategory/SubCategory";
import AddNewSubCategory from "../../../Pages/Components/SubCategory/AddNewSubCategory/AddNewSubCategory";
import EditSubCategory from "../../../Pages/Components/SubCategory/EditSubCategory/EditSubCategory";
import Student from "../../../Pages/Components/Student/Student";
import Instructor from "../../../Pages/Components/Instructor/Instructor";
import Language from "../../../Pages/Components/Language/Language";
import AddNewLanguage from "../../../Pages/Components/Language/AddNewLanguage/AddNewLanguage";
import EditLanguage from "../../../Pages/Components/Language/EditLanguage/EditLanguage";
import Payout from "../../../Pages/Components/Payout/Payout";
import Course from "../../../Pages/Components/Course/Course";
import AllCourse from "../../../Pages/Components/Course/AllCourse/AllCourse";
import WaitingForApproveCourse from "../../../Pages/Components/Course/WaitingForApproveCourse/WaitingForApproveCourse";
import ActiveCourse from "../../../Pages/Components/Course/ActiveCourse/ActiveCourse";
import BlockCourse from "../../../Pages/Components/Course/BlockCourse/BlockCourse";
import RejectCourse from "../../../Pages/Components/Course/RejectCourse/RejectCourse";
import CourseSell from "../../../Pages/Components/CourseSell/CourseSell";
import Subscription from "../../../Pages/Components/Subscription/Subscription";
import InstructorRegistration from "../../../Pages/Components/InstructorRegistration/InstructorRegistration";
import StudentRegistration from "../../../Pages/Components/StudentRegistration/StudentRegistration";

function Content(props) {
  return (
    <div className="content">
      <Routes>
        <Route path="user" element={<User />}>
          <Route index element={<AddNewUser />} />
          <Route path="edit" element={<EditUser />} />
        </Route>

        <Route path="/" element={<Dashboard />} />

        <Route path="language" element={<Language />}>
          <Route index element={<AddNewLanguage />} />
          <Route path="edit" element={<EditLanguage />} />
        </Route>

        <Route path="category" element={<Category />}>
          <Route index element={<AddNewCategory />} />
          <Route path="edit" element={<EditCategory />} />
        </Route>

        <Route path="subcategory" element={<SubCategory />}>
          <Route index element={<AddNewSubCategory />} />
          <Route path="edit" element={<EditSubCategory />} />
        </Route>

        <Route path="student" element={<Student />} />

        <Route path="instructor" element={<Instructor />} />

        <Route path="payout" element={<Payout />} />

        <Route path="course" element={<Course />} >
          <Route index element={<AllCourse />} />
          <Route path="wait" element={<WaitingForApproveCourse />} />
          <Route path="active" element={<ActiveCourse />} />
          <Route path="block" element={<BlockCourse />} />
          <Route path="reject" element={<RejectCourse />} />
        </Route>
        <Route path="courseSelling" element={<CourseSell />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="instructorRegistration" element={<InstructorRegistration />} />
        <Route path="studentRegistration" element={<StudentRegistration />} />
      </Routes>
    </div>
  );
}

export default Content;
