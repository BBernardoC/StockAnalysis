import React from "react";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalculateIcon from "@mui/icons-material/Calculate";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PersonIcon from "@mui/icons-material/Person";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  return (
    <AppBar position="static" color="default" sx={{ mb: 2 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo área - Esquerda */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ShowChartIcon color="primary" />
              <Typography variant="h6" component="div">
                StockAnalysis
              </Typography>
            </Box>
          </Link>
        </Box>

        {/* Items de navegação - Centro */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <IconButton
            color={location.pathname === "/search" ? "primary" : "inherit"}
            component={Link}
            to="/search"
            sx={{
              flexDirection: "column",
              "& .MuiTypography-root": { mt: 0.5 },
            }}
          >
            <SearchIcon />
            <Typography variant="caption">Buscar</Typography>
          </IconButton>

          <IconButton
            color={location.pathname === "/calculator" ? "primary" : "inherit"}
            component={Link}
            to="/calculator"
            sx={{
              flexDirection: "column",
              "& .MuiTypography-root": { mt: 0.5 },
            }}
          >
            <CalculateIcon />
            <Typography variant="caption">Calculadora</Typography>
          </IconButton>

          <IconButton
            color={location.pathname === "/portfolio" ? "primary" : "inherit"}
            component={Link}
            to="/portfolio"
            sx={{
              flexDirection: "column",
              "& .MuiTypography-root": { mt: 0.5 },
            }}
          >
            <AccountBalanceWalletIcon />
            <Typography variant="caption">Carteira</Typography>
          </IconButton>

          <IconButton
            color={location.pathname === "/profile" ? "primary" : "inherit"}
            component={Link}
            to="/profile"
            sx={{
              flexDirection: "column",
              "& .MuiTypography-root": { mt: 0.5 },
            }}
          >
            <PersonIcon />
            <Typography variant="caption">Perfil</Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
