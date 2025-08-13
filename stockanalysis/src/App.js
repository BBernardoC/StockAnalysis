import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homePage";
import StockPage from "./stockPage";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
  // Você pode customizar seu tema aqui no futuro (cores, fontes, etc.)
});

function App() {
  return (
    // O ThemeProvider aplica o tema a todos os componentes filhos
    <ThemeProvider theme={theme}>
      {/* O CssBaseline normaliza os estilos CSS */}
      <CssBaseline />
      
      {/* Sua estrutura de rotas original permanece aqui dentro */}
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