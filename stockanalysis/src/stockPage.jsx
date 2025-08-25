import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import DisplayCard from "./stockPriceutils";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
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
  const [stockData, setStockData] = useState([]);
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
    fetch(`http://127.0.0.1:5000/stock/${ticker}/5y`)
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
    let priceCeiling = annualDividend / 0.06;
    return priceCeiling.toFixed(2);
  };

  const CalcGraham = () => {
    let calcGraham = Math.sqrt(22.5 * eps * bookValue);
    return calcGraham.toFixed(2);
  };

  console.log(price);

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
        <Box alignItems={"center"}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <DisplayCard name="Preço" data={price} />
            <DisplayCard
              name="DY"
              data={(dividendYield * 100).toFixed(2) + "%"}
            />
            <DisplayCard
              name="P/L"
              data={bookValue ? bookValue.toFixed(2) : "N/A"}
            />
            <DisplayCard
              name="P/VP"
              data={priceToBook ? priceToBook.toFixed(2) : "N/A"}
            />
            <DisplayCard
              name="Ticker"
              data={ticker ? ticker.toUpperCase() : "N/A"}
            />
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 400,
          mt: 4,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ResponsiveContainer width="90%" height="100%">
          <LineChart
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
            <XAxis
              dataKey="date"
              tickFormatter={(str) => {
                const d = new Date(str);
                return d.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                });
              }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="open" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Card
            variant="outlined"
            sx={{
              maxWidth: 360,
            }}
          >
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
                <BlockMath
                  math={
                    annualDividend
                      ? `\\frac{${annualDividend}}{0.06} = ${CalcBazin()}`
                      : "\\text{Carregando...}"
                  }
                />
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
                <BlockMath
                  math={
                    eps && bookValue
                      ? `\\sqrt{22.5 \\times ${eps} \\times ${bookValue}} = ${CalcGraham()}`
                      : "\\text{Carregando...}"
                  }
                />
              </Typography>
            </Box>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}

export default StockPage;
