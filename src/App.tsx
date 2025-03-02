import { Route, Routes } from 'react-router-dom';
import './App.css'
import NotFound from './pages/NotFound';
import UserSignUpLogin from './pages/UserSignUpLogin';
import OrgSignUpLogin from './pages/OrgSignUpLogin';

function App() {
  return (
    <Routes>
      {/* 
         for all users pages, prepend with /user
         for all company pages, prepend with /org
    */}
      <Route path="/" element={<UserSignUpLogin />} />
      <Route path="/user" element={<UserSignUpLogin />} />
      <Route path="/org" element={<OrgSignUpLogin />} />

      <Route path="/user/dashboard" element={<div>sdf</div>} />
      <Route path="/org/dashboard" element={<div>sdf</div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
