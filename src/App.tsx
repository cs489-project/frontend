import { Route, Routes } from 'react-router-dom';
import './App.css'
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>test1</div>} />
      <Route path="/about" element={<div>test2</div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App
