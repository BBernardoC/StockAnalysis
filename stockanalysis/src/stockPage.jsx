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
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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
  const [showDetails, setShowDetails] = useState(false);
  const [timeRange, setTimeRange] = useState("1 Ano");

  const {
    stockInfo,
    ebitda,
    floatShares,
    overallRisk,
    targetHighPrice,
    targetLowPrice,
    targetMeanPrice,
    targetMedianPrice,
    totalDebt,
    bookValue,
    eps,
    annualDividendPerShare,
    totalEquity,
    cash,
    revenue,
    netIncome,
    lastYearRevenue,
    fiftyTwoWeekHigh,
    fiftyTwoWeekLow,
    priceToEarningsRatio,
    dividendYield,
    debtToEquity,
    enterpriseValue,
    enterpriseToEbitda,
    enterpriseToRevenue,
    marketCap,
    priceToBook,
    payoutRatio,
    returnOnEquity,
    revenueGrowth,
    revenuePerShare,
    fiftyTwoWeekHighChange,
    fiftyTwoWeekHighChangePercent,
    fiftyTwoWeekLowChange,
    fiftyTwoWeekLowChangePercent,
    currentPrice,
  } = useStockSetter(ticker);


  useEffect(() => {
    fetch(`http://127.0.0.1:5000/stock/${ticker}/5y`)
      .then((res) => res.json())
      .then((json) => setStockData(json))
      .catch(() => setStockData({ error: "erro ao buscar os dados" }));
  }, [ticker]);

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

  const timeRanges = ["1 Dia", "1 Semana", "1 Mês", "1 Ano", "5 Anos"];

  return (
    <Box sx={{ maxWidth: '1200px', margin: 'auto', padding: { xs: 2, md: 4 } }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        mb={3}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          {ticker ? ticker.toUpperCase() : "Carregando..."}
        </Typography>
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "contained" : "outlined"}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </ButtonGroup>
      </Stack>

 
      <Card variant="outlined" sx={{ p: { xs: 1, sm: 2 }, mb: 4, borderColor: 'primary.main' }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={stockData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(str) => new Date(str).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="close" name="Fechamento" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="open" name="Abertura" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 1, sm: 2 }}
        flexWrap="wrap"
        useFlexGap
        sx={{ mb: 2 }}
      >
        <DisplayCard name="Preço" data={currentPrice} />
        <DisplayCard name="DY" data={`${(dividendYield * 100).toFixed(2)}%`} />
        <DisplayCard name="P/L" data={priceToEarningsRatio} />
        <DisplayCard name="P/VP" data={priceToBook} />
      </Stack>

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Button
          onClick={() => setShowDetails(!showDetails)}
          endIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {showDetails ? 'Ver Menos' : 'Ver Mais'}
        </Button>
      </Box>
      {showDetails && (
        <Box>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} mb={4}>
             <Card variant="outlined" sx={{ flex: 1, width: "100%", borderColor: 'primary.main' }}>
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    Calculo Bazin
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    (considerando um dividend yield mínimo de 6%)
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: 'primary.main' }} />
                <Box sx={{ p: 2 }}>
                    <BlockMath
                      math={
                        annualDividendPerShare
                          ? `\\frac{${annualDividendPerShare.toFixed(2)}}{0.06} = R\\$ ${CalcBazin()}`
                          : "\\text{Carregando...}"
                      }
                    />
                </Box>
              </Card>
              <Card variant="outlined" sx={{ flex: 1, width: "100%", borderColor: 'primary.main' }}>
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    Calculo Graham
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    (encontrar o valor intrínseco da ação)
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: 'primary.main' }} />
                <Box sx={{ p: 2 }}>
                    <BlockMath
                      math={
                        eps && bookValue
                          ? `\\sqrt{22.5 \\times ${eps} \\times ${bookValue}} = R\\$ ${CalcGraham()}`
                          : "\\text{Carregando...}"
                      }
                    />
                </Box>
              </Card>
          </Stack>
          
          <Box backgroundColor={"#ffffffff"} padding={2} borderRadius={2} >
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Dividendo anual" data={annualDividendPerShare}/></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Valor contábil" data={bookValue} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Lucro por ação" data={eps} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Valor de mercado" data={marketCap} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Valor da empresa" data={enterpriseValue} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="EBITDA" data={ebitda} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Ações em circulação" data={floatShares} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Risco geral" data={overallRisk} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Preço alvo alto" data={targetHighPrice} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Preço alvo baixo" data={targetLowPrice} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Preço alvo médio" data={targetMeanPrice} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Preço alvo mediano" data={targetMedianPrice}/></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Dívida total" data={totalDebt} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Patrimônio líquido" data={totalEquity} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Caixa" data={cash} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Receita" data={revenue} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Lucro líquido" data={netIncome} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Receita ano anterior" data={lastYearRevenue}/></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Máxima 52 semanas" data={fiftyTwoWeekHigh} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Mínima 52 semanas" data={fiftyTwoWeekLow} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="P/L" data={priceToEarningsRatio} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Dividend Yield" data={dividendYield} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Dívida / Patrimônio" data={debtToEquity} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="EV / EBITDA" data={enterpriseToEbitda} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="EV / Receita" data={enterpriseToRevenue} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="P/B" data={priceToBook} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Payout Ratio" data={payoutRatio} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="ROE" data={returnOnEquity} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Crescimento da Receita" data={revenueGrowth}/></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Receita por ação" data={revenuePerShare} /></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Variação máxima 52 semanas" data={fiftyTwoWeekHighChange}/></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Variação % máxima 52 semanas" data={fiftyTwoWeekHighChangePercent}/></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Variação mínima 52 semanas" data={fiftyTwoWeekLowChange}/></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Variação % mínima 52 semanas" data={fiftyTwoWeekLowChangePercent}/></Grid>
                <Grid item xs={12} sm={6} md={3}><FundamentalCard name="Preço atual" data={currentPrice} /></Grid>
              </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
}
export default StockPage;