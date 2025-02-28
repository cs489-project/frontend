import { Route, Routes } from 'react-router-dom';
import './App.css'
import NotFound from './pages/NotFound';
import UserLogin from './pages/UserLogin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/test" element={<div>set</div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App
