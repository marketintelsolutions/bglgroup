import "./App.css";
import Homepage from "./Screens/Homepage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./Screens/LoginPage";
import AccountBalance from "./Screens/AccountBalance";
import Alert from "./components/Alerts/Alert";
import AdminLoginPage from "./Screens/AdminLoginPage";
import Dashboard from "./Screens/Dashboard";
import SchemeofArrangement from "./Screens/SchemeofArrangement";
import UserDetailsPage from "./Screens/UserDetailsPage";
import AddUserPage from "./Screens/AddUserPage";
import AdminSignUpPage from "./Screens/AdminSignUpPage";
import Egm from "./Screens/Egm";
import Annual from "./Screens/Annual";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/account" element={<AccountBalance />} />
          <Route
            path="/scheme-of-arrangement"
            element={<SchemeofArrangement />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-user" element={<AddUserPage />} />
          <Route path="/user" element={<UserDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-signup" element={<AdminSignUpPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/" element={<Homepage />} />
          {/* new */}
          <Route path="/egm" element={<Egm />} />
          <Route path="/annual" element={<Annual />} />
        </Routes>
      </Router>
      <Alert />
    </div>
  );
}

export default App;
