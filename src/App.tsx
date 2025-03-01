import { Route, Routes } from 'react-router-dom';
import './App.css'
import NotFound from './pages/NotFound';
import UserLogin from './pages/UserLogin';

function App() {
  return (
    <Routes>
      {/* 
         for all users pages, prepend with /user
         for all company pages, prepend with /org
    */}
      <Route path="/" element={<UserLogin />} />
      <Route path="/user" element={<UserLogin />} />
      <Route path="/org" element={<div>TODO ORG LOGIN/SIGNUP PAGE</div>} />

      <Route path="/user/dashboard" element={<div>sdf</div>} />
      <Route path="/org/dashboard" element={<div>sdf</div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
