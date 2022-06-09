import "./App.css";
import Admin from "./Admin/Admin";
import InstructorPage from "./Instructor/InstructorPage";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";

function App() {
  return (
    <Routes>
      <Route path="admin/*" element={<Admin />}/>
      <Route path="/instructorPage/*" element={<InstructorPage />} />
      <Route index path="/*" element={<Login/>}/>
    </Routes>
  );
}

export default App;
