import "./App.css";
import Admin from "./Admin/Admin";
import InstructorPage from "./Instructor/InstructorPage";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import StudentPage from "./Student/StudentPage";

function App() {
  return (
    <Routes>
      <Route index path="/*" element={<StudentPage/>}/>
      <Route path="/admin/*" element={<Admin />}/>
      <Route path="/instructorPage/*" element={<InstructorPage />} />
      <Route path="/login/*" element={<Login/>}/>
    </Routes>
  );
}

export default App;
