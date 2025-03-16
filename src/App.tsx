import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import UserSignUpLogin from "./pages/UserSignUpLogin";
import OrgSignUpLogin from "./pages/OrgSignUpLogin";
import UDLayout from "./components/user-dashboard/UDLayout";
import PendingSignUp from "./pages/PendingSignUp";
import OrgDashboard from "./pages/OrgDashboard";
import UDOpportunitiesList from "./components/user-dashboard/UDOpportunitiesList";
import UDOpportunityDetail from "./components/user-dashboard/UDOpportunityDetail";
import UDInbox from "./components/user-dashboard/UDInbox";
import UDLeaderboard from "./components/user-dashboard/UDLeaderboard";
import UDSettings from "./components/user-dashboard/UDSettings";
import { SnackbarProvider } from "./components/SnackBar";
import OrgPostingList from "./components/OrgPostingList";
import PostingBuilder from "./components/PostingBuilder";

function App() {
  return (
    <SnackbarProvider>
      <Routes>
        {/* 
         for all users pages, prepend with /user
         for all company pages, prepend with /org
      */}
        <Route path="/" element={<UserSignUpLogin />} />
        <Route path="/user" element={<UserSignUpLogin />} />

        {/* User dashboard routes */}
        <Route path="/user/dashboard" element={<UDLayout />}>
          <Route index element={<Navigate to="opportunities" replace />} />
          <Route path="opportunities" element={<UDOpportunitiesList />} />
          <Route
            path="opportunities/:opportunityId"
            element={<UDOpportunityDetail />}
          />
          <Route path="inbox" element={<UDInbox />} />
          <Route path="leaderboard" element={<UDLeaderboard />} />
          <Route path="settings" element={<UDSettings />} />
        </Route>

        <Route path="/org" element={<OrgSignUpLogin />} />
        <Route path="/org/dashboard" element={<OrgDashboard />}>
          <Route index element={<OrgPostingList />}></Route>
          <Route path="create" element={<PostingBuilder />}></Route>
        </Route>
        <Route path="/org/pending" element={<PendingSignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
