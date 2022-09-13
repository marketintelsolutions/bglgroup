import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import Homepage from "./Screens/Homepage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./Screens/LoginPage";
import AccountBalance from "./Screens/AccountBalance";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/account" element={<AccountBalance />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
