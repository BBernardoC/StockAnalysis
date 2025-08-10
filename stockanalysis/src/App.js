import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
function App() {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState("");
  const [stockData, setStockData] = useState(null);
  const fetchStock = async () => {
    setError("");
    setStockData(null);
    try {
      const res = await fetch(`http://127.0.0.1:5000/stock/${ticker}/1mo`);
      if (!res.ok) {
        setError("deu bad");
        return;
      }
      const data = await res.json();
      setStockData(data);
    } catch (err) {
      setError("erro ao buscar acao");
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
        id="outlined-basic"
        label="Stocks"
        variant="outlined"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />

      <button onClick={fetchStock} style={{ marginLeft: "10px" }}>
        Buscar
      </button>

      <h2>Resultado:</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {stockData && <pre>{JSON.stringify(stockData, null, 2)}</pre>}
    </Box>
  );
}

export default App;
