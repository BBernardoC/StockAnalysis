import { Box, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import BasicTable from "../portfolioTable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement, // Adicionado para gráfico de pizza
} from "chart.js";
import { Pie } from "react-chartjs-2"; // Mudado para Pie ao invés de Line

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

// Configuração do gráfico
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Distribuição da Carteira",
    },
  },
};

function Portfolio() {
  const [filter, setFilter] = useState("Select all");
  const [walletData, setWalletData] = useState(null);
  const [GraphData, setGraphData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/wallet`)
      .then((res) => res.json())
      .then((json) => setWalletData(json))
      .catch(() => setWalletData(null));
  }, []);

  const chartData = {
    labels: ["Ações", "FIIs", "BDRs", "ETF", "Outros"],
    datasets: [
      {
        label: "Valor Investido",
        data: walletData
          ? Object.values(
              walletData.reduce((acc, item) => {
                const ticker = item[1];
                const value = parseFloat(item[3]);

                // Classificar e somar valores por tipo
                if (
                  ticker.length === 5 &&
                  (ticker.endsWith("4") || ticker.endsWith("3"))
                ) {
                  acc["Ações"] = (acc["Ações"] || 0) + value;
                } else if (ticker.length === 6 && ticker.endsWith("11")) {
                  acc["FIIs"] = (acc["FIIs"] || 0) + value;
                } else if (ticker.endsWith("34")) {
                  acc["BDRs"] = (acc["BDRs"] || 0) + value;
                } else if (ticker.startsWith("ETF")) {
                  acc["ETF"] = (acc["ETF"] || 0) + value;
                } else {
                  acc["Outros"] = (acc["Outros"] || 0) + value;
                }
                return acc;
              }, {})
            )
          : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)", // Ações
          "rgba(255, 159, 64, 0.8)", // FIIs
          "rgba(255, 205, 86, 0.8)", // BDRs
          "rgba(75, 192, 192, 0.8)", // ETF
          "rgba(54, 162, 235, 0.8)", // Outros
        ],
      },
    ],
  };
  const investments = [
    "Ações",
    "ETF",
    "Renda fixa",
    "Criptomoedas",
    "FIIs",
    "Fundos de investimentos",
    "Reit",
    "Stock",
    "BDRs",
    "Etf internacionais",
    "Tesouro direto",
    "Outros",
  ];

  return (
    <Box
      sx={{
        alignItems: "center",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box>
          <Pie options={options} data={chartData} />
        </Box>
        <Box>
          <Pie options={options} data={chartData} />
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Portfólio
        </Typography>
        <BasicTable investments={investments} />
      </Box>
    </Box>
  );
}

export default Portfolio;
