import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";

function HomePage() {

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (input.trim() !== "") {
      navigate(`/stock/${input.toUpperCase()}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 2,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Análise de Ações 📈
        </Typography>

        <Typography variant="h6" color="text.secondary">
          Digite o ticker de uma ação para ver os detalhes.
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 1, mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Digite o ticker (ex: PETR4)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            InputProps={{
              style: { textTransform: "uppercase" },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={!input.trim()}
            startIcon={<SearchIcon />}
            sx={{ height: '56px' }}
          >
            Buscar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
