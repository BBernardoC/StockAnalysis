import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function StockPage() {
  const { ticker } = useParams();
  const [stockData, setStockData] = useState(null);
  const [stockInfo, setStockInfo] = useState(null);
  const [bookValue, setBookValue] = useState(null);
  const [price, setPrice] = useState(null);
  const [dividendYield, setDividentYield] = useState(null);
  const [priceToEarningsRatio, setPriceToEarningsRatio] = useState(null);
  const [priceToBook, setPriceToBook] = useState(null);
  const [annualDividend, setAnnualDividend] = useState(null);
  const [eps, setEps] = useState(null);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/stock/${ticker}/1mo`)
      .then((res) => res.json())
      .then((json) => setStockData(json))
      .catch(() => setStockData({ error: "erro ao buscar os dados" }));
  }, [ticker]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/stock/${ticker}`)
      .then((res) => res.json())
      .then((json) => {
        setStockInfo(json);
        setDividentYield(json.dividendYield);
        setBookValue(json.bookValue);
        setPriceToEarningsRatio(json.priceToEarningsRatio);
        setPriceToBook(json.priceToBook);
        setPrice(json.currentPrice);
        setAnnualDividend(json.annualDividendPerShare);
        setEps(json.eps);
      })
      .catch(() =>
        setStockInfo({ error: "erro ao buscar os dados stockinfo" })
      );
  }, []);

  const CalcBazin = () => {
    console.log(annualDividend);
    let priceCeiling = annualDividend / 0.06;
    return priceCeiling;
  };

  const CalcGraham = () => {
    console.log(eps, bookValue);
    let calcGraham = Math.sqrt(22.5 * eps * bookValue);
    return calcGraham;
  };

  return (
    <Box>
      <Box
        sx={{
          height: "30vh",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Box
          justifyContent={"center"}

          /*second box to hold some metrics*/
        >
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Card variant="outlined" sx={{ maxWidth: 360 }}>
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    Preço
                  </Typography>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="body2">
                  {price}
                </Typography>
              </Box>
            </Card>
            <Card variant="outlined" sx={{ maxWidth: 360 }}>
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    Dividend Yield
                  </Typography>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="body2">
                  {dividendYield}
                </Typography>
              </Box>
            </Card>
            <Card variant="outlined" sx={{ maxWidth: 360 }}>
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    P/L
                  </Typography>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="body2">
                  {priceToEarningsRatio}
                </Typography>
              </Box>
            </Card>
            <Card variant="outlined" sx={{ maxWidth: 360 }}>
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    P/VP
                  </Typography>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="body2">
                  {priceToBook}
                </Typography>
              </Box>
            </Card>
            <Card variant="outlined" sx={{ maxWidth: 360 }}>
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    Ticker{" "}
                  </Typography>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="body2">
                  {ticker}
                </Typography>
              </Box>
            </Card>
          </Stack>
        </Box>
      </Box>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={stockData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Card variant="outlined" sx={{ maxWidth: 360 }}>
            <Box sx={{ p: 2 }}>
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  Calculo Bazin
                </Typography>
              </Stack>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Typography gutterBottom variant="body2">
                {CalcBazin()}
              </Typography>
            </Box>
          </Card>

          <Card variant="outlined" sx={{ maxWidth: 360 }}>
            <Box sx={{ p: 2 }}>
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  Calculo Graham
                </Typography>
              </Stack>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Typography gutterBottom variant="body2">
                {CalcGraham()}
              </Typography>
            </Box>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}

export default StockPage;
