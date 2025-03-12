import { Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import UserSignUpLogin from "./pages/UserSignUpLogin";
import OrgSignUpLogin from "./pages/OrgSignUpLogin";
import UserDashboard from "./pages/UserDashboard";
import PendingSignUp from "./pages/PendingSignUp";
import OrgDashboard from "./pages/OrgDashboard";

function App() {
  return (
    <Routes>
      {/* 
         for all users pages, prepend with /user
         for all company pages, prepend with /org
    */}
      <Route path="/" element={<UserSignUpLogin />} />
      <Route path="/user" element={<UserSignUpLogin />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />

      <Route path="/org" element={<OrgSignUpLogin />} />
      <Route path="/org/dashboard" element={<OrgDashboard />} />
      <Route path="/org/pending" element={<PendingSignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
