import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homePage";
import StockPage from "./pages/stockPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Navigation } from "./navigation";
import Portfolio from "./pages/portfolio";

const theme = createTheme({
  // Você pode customizar seu tema aqui no futuro (cores, fontes, etc.)
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation /> {/* Adicionando a navegação aqui */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stock/:ticker" element={<StockPage />} />
          <Route path="/search" element={<HomePage />} />
          {/* Página de busca usa HomePage por enquanto */}
          <Route
            path="/calculator"
            element={<div>Calculadora em desenvolvimento</div>}
          />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route
            path="/profile"
            element={<div>Perfil em desenvolvimento</div>}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
