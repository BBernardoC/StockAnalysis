import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState("");
  const [stockData, setStockData] = useState(null);

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (input.trim() !== "") {
      navigate(`/stock/${input.toUpperCase()}`);
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite o ticker (ex: PETR4)"
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
        Buscar
      </button>

      <h2>Resultado:</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {stockData && <pre>{JSON.stringify(stockData, null, 2)}</pre>}
    </Box>
  );
}

export default HomePage;
