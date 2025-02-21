

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './pages/Registration'
import  Login from './pages/Login'
import  AddTaskInput  from "./pages/AddTaskInput";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-task/:userId" element={<AddTaskInput />} /> 
      </Routes>
    </Router>
  );
};

export default App;

