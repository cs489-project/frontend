import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* 
             for all users pages, prepend with /user
             for all company pages, prepend with /org
        */}
        <Route path="/user" element={<div>TODO USER LOGIN PAGE</div>} />
        <Route path="/org" element={<div>TODO ORG LOGIN PAGE</div>} />

        <Route path="/user/dashboard" element={<div>sdf</div>} />
        <Route path="/org/dashboard" element={<div>sdf</div>} />
      </Routes>
    </Router>
  );
}

export default App;
