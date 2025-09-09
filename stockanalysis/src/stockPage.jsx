import React from "react";
import { useState, useEffect, useMemo } from "react";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
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
import Button from "@mui/material/Button";

function StockPage() {
  const [showDetails, setShowDetails] = useState(false);
  const { ticker } = useParams();
  const [monteCarloData, setMonteCarloData] = useState(null);
  const [processedMonteCarlo, setProcessedMonteCarlo] = useState([]);

  // estado para dados brutos (sempre mantém os 5 anos)
  const [stockData, setStockData] = useState([]);

  // estado para dados filtrados (mostrados no gráfico)
  const [filteredData, setFilteredData] = useState([]);

  const {
    stockInfo,
    annualDividendPerShare,
    eps,
    bookValue,
    priceToBook,
    priceToEarningsRatio,
    dividendYield,
    currentPrice,
  } = useStockSetter(ticker);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/montecarlo/${ticker}`)
      .then((res) => res.json())
      .then((json) => setMonteCarloData(json.simulation))
      .catch(() => setMonteCarloData(null));
  }, [ticker]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/stock/${ticker}/5y`)
      .then((res) => res.json())
      .then((json) => {
        setStockData(json);
        setFilteredData(json); // inicia mostrando tudo (5Y)
      })
      .catch(() => setStockData({ error: "erro ao buscar os dados" }));
  }, [ticker]);

  useEffect(() => {
    if (monteCarloData) {
      setProcessedMonteCarlo(processMonteCarloData(monteCarloData));
    }
  }, [monteCarloData]);
  const handleFilter = (period) => {
    if (!stockData || stockData.length === 0) return;

    switch (period) {
      case "1d":
        setFilteredData(stockData.slice(-1));
        break;
      case "1w":
        setFilteredData(stockData.slice(-5));
        break;
      case "1m":
        setFilteredData(stockData.slice(-20));
        break;
      case "6m":
        setFilteredData(stockData.slice(-120));
        break;
      case "1y":
        setFilteredData(stockData.slice(-252));
        break;
      case "5y":
        setFilteredData(stockData);
        break;
      default:
        setFilteredData(stockData);
    }
  };

  const processMonteCarloData = (data) => {
    if (!data) return [];
    const simulations = Object.values(data);
    const groupedSimulations = [];

    for (let i = 0; i < 40; i++) {
      const group = simulations.slice(i * 25, (i + 1) * 25);
      const averages = [];
      for (let day = 0; day < 100; day += 5) {
        const dayAverage =
          group.reduce((sum, sim) => sum + sim[day], 0) / group.length;
        averages.push({ day, price: dayAverage });
      }
      groupedSimulations.push(averages); // Remove a estrutura com id
    }

    return groupedSimulations;
  };

  const CalcBazin = () => {
    if (!annualDividendPerShare) return "N/A";
    let priceCeiling = annualDividendPerShare / 0.06;
    return priceCeiling.toFixed(2);
  };

  const CalcGraham = () => {
    if (!eps || !bookValue) return "N/A";
    let calcGraham = Math.sqrt(22.5 * eps * bookValue);
    return calcGraham.toFixed(2);
  };

  const Get_MontecarloDataAll = () => {
    if (!monteCarloData) return [];

    // Cria um array de objetos para cada simulação
    const simulations = Object.entries(monteCarloData).map(
      ([simKey, simData]) => {
        return Object.entries(simData).map(([dayKey, value]) => ({
          day: parseInt(dayKey) + 1,
          value,
          simulation: simKey,
        }));
      }
    );

    // Retorna array de arrays (uma linha por simulação)
    return simulations;
  };

  const GraphData = () => {
    if (!filteredData || filteredData.length === 0) {
      return [];
    }
    const valueList = filteredData.map((data) => ({
      date: data.date,
      open: data.open,
    }));

    valueList[valueList.length - 1].open = currentPrice;
    return valueList;
  };

  return (
    <Box>
      {/* Botões de filtro */}
      <Box>
        <Stack
          direction={"row"}
          spacing={1}
          justifyContent={"right"}
          mt={4}
          mr={12}
        >
          <Button variant="outlined" onClick={() => handleFilter("1d")}>
            1D
          </Button>
          <Button variant="outlined" onClick={() => handleFilter("1w")}>
            1W
          </Button>
          <Button variant="outlined" onClick={() => handleFilter("1m")}>
            1M
          </Button>
          <Button variant="outlined" onClick={() => handleFilter("6m")}>
            6M
          </Button>
          <Button variant="outlined" onClick={() => handleFilter("1y")}>
            1Y
          </Button>
          <Button variant="outlined" onClick={() => handleFilter("5y")}>
            5Y
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 400,
          mt: 4,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          borderRadius: 2,
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
          marginTop: "20px",
        }}
      >
        <Box alignItems={"center"}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap", // <- permite quebrar se faltar espaço
              width: "100%", // <- garante que ocupe a linha inteira
            }}
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
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Button
              onClick={() => setShowDetails(!showDetails)}
              endIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
              {showDetails ? "Ver Menos" : "Ver Mais"}
            </Button>
          </Box>
          {showDetails && (
            <Box
              margin={4}
              padding={2}
              borderRadius={2}
              sx={{
                display: showDetails ? "block" : "none",
                transition: "all 0s", // instantâneo
              }}
            >
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
                        "dividendYield",
                        "priceToEarningsRatio",
                        "priceToBook",
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
          )}
        </Box>
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
      <Box
        sx={{
          width: "100%",
          height: 400,
          mt: 4,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <ResponsiveContainer width="90%" height={400}>
          <LineChart
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="day"
              domain={[0, 100]}
              tickCount={21}
              allowDuplicatedCategory={false}
              label={{ value: "Dias", position: "insideBottomRight" }}
            />
            <YAxis label="Preço" />
            <Tooltip />
            {processedMonteCarlo.map((simulation, i) => (
              <Line
                key={i}
                data={simulation}
                type="monotone"
                dataKey="price"
                stroke={`hsl(${
                  (i * 360) / processedMonteCarlo.length
                }, 70%, 50%)`}
                dot={false}
                strokeWidth={1}
                activeDot={{ r: 4 }} // Adiciona um ponto quando hover
                isAnimationActive={false} // Desativa animação para melhor performance
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default StockPage;
