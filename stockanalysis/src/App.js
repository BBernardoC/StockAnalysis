import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homePage";
import StockPage from "./stockPage";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';


const theme = createTheme({
  // ADICIONAR CUSTOMIZAÇÃO AQUI!!!!!!!!!!!!!!!
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stock/:ticker" element={<StockPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;