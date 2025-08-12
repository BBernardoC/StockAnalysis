import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from ".//homePage";
import StockPage from ".//stockPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stock/:ticker" element={<StockPage />} />
      </Routes>
    </Router>
  );
}

export default App;
