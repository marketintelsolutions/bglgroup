import "./App.css";
import Homepage from "./Screens/Homepage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./Screens/LoginPage";
import AccountBalance from "./Screens/AccountBalance";
import Alert from "./components/Alerts/Alert";
import AdminLoginPage from "./Screens/AdminLoginPage";
import Dashboard from "./Screens/Dashboard";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/account" element={<AccountBalance />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
      <Alert />
    </div>
  );
}

export default App;
