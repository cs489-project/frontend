import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>TODO USER LOGIN PAGE</div>} />
        <Route path="/organization" element={<div>TODO ORG LOGIN PAGE</div>} />
        <Route path="/posting" element={<div>sdf</div>} />
      </Routes>
    </Router>
  );
}

export default App;
