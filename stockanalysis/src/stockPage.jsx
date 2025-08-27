import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { DisplayCard, FundamentalCard } from "./stockPriceutils";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import Grid from "@mui/material/Grid";
import { useStockSetter } from "./stockFundamentals";
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
import { fundamentals } from "./fundamentals";

function StockPage() {
  const { ticker } = useParams();
  const [stockData, setStockData] = useState([]);
  const {
    stockInfo,
    annualDividendPerShare, // para CalcBazin()
    eps, // para CalcGraham()
    bookValue,
    priceToBook,
    priceToEarningsRatio,
    dividendYield,
    currentPrice,
  } = useStockSetter(ticker);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/stock/${ticker}/5y`)
      .then((res) => res.json())
      .then((json) => setStockData(json))
      .catch(() => setStockData({ error: "erro ao buscar os dados" }));
  }, [ticker]);

  const CalcBazin = () => {
    let priceCeiling = annualDividendPerShare / 0.06;
    return priceCeiling.toFixed(2);
  };

  const CalcGraham = () => {
    let calcGraham = Math.sqrt(22.5 * eps * bookValue);
    return calcGraham.toFixed(2);
  };

  const GraphData = () => {
    if (!stockData || stockData.length === 0) {
      return [];
    }
    const valueList = stockData.map((data) => ({
      date: data.date,
      open: data.open,
    }));

    valueList[valueList.length - 1].open = currentPrice;

    return valueList;
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
        <Box alignItems={"center"}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <DisplayCard name="Preço" data={currentPrice} />
            <DisplayCard
              name="DY"
              data={(dividendYield * 100).toFixed(2) + "%"}
            />
            <DisplayCard
              name="P/L"
              data={
                priceToEarningsRatio ? priceToEarningsRatio.toFixed(2) : "N/A"
              }
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
            data={GraphData()}
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
              dataKey="open"
              stroke="#82ca9d"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Card variant="outlined" sx={{ width: "100%" }}>
            <Box sx={{ p: 2 }}>
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  Calculo Bazin
                  <Typography variant="caption" display="block" gutterBottom>
                    (considerando um dividend yield mínimo de 6%, procura acoes
                    que pagam bons dividendos para o investidor)
                  </Typography>
                </Typography>
              </Stack>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Typography gutterBottom variant="body2">
                <BlockMath
                  math={
                    annualDividendPerShare
                      ? `\\frac{\\text{dividendo anual}}{0.06} = \\frac{${annualDividendPerShare}}{0.06} = ${CalcBazin()}`
                      : "\\text{Carregando...}"
                  }
                />
              </Typography>
            </Box>
          </Card>

          <Card variant="outlined">
            <Box sx={{ p: 2 }}>
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  Calculo Graham
                  <Typography variant="caption" display="block" gutterBottom>
                    (formula utilizada para empresas com crescimento estável,
                    tem em base encontrar o valor intrínseco da ação)
                  </Typography>
                </Typography>
              </Stack>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Typography gutterBottom variant="body2">
                <BlockMath
                  math={
                    eps && bookValue
                      ? `\\sqrt{22.5 \\times \\text{Lucro por acao} \\times \\text{valor contabil}} = \\sqrt{22.5 \\times ${eps} \\times ${bookValue}} = ${CalcGraham()}`
                      : "\\text{Carregando...}"
                  }
                />
              </Typography>
            </Box>
          </Card>
        </Stack>
      </Box>
      <Box margin={4} backgroundColor={"#f5f5f5"} padding={2} borderRadius={2}>
        <Typography variant="h4" gutterBottom>
          Dados Fundamentais de {ticker}
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {fundamentals
            .filter(
              (item) =>
                ![
                  "fiftyTwoWeekLowChange",
                  "fiftyTwoWeekLowChangePercent",
                  "fiftyTwoWeekHighChangePercent",
                  "fiftyTwoWeekHighChange",
                  "fiftyTwoWeekLow",
                  "fiftyTwoWeekHigh",
                  "targetMedianPrice",
                  "targetMeanPrice",
                  "targetLowPrice",
                  "targetHighPrice",
                  "currentPrice",
                  "overallRisk",
                  "bookValue",
                ].includes(item.key)
            )
            .map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FundamentalCard
                  name={item.name}
                  data={stockInfo?.[item.key] ?? "N/A"}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default StockPage;
