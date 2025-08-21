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
            <Item
              sx={{
                width: "27vh",
                height: "15vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {price}
            </Item>
            <Item
              sx={{
                width: "27vh",
                height: "15vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {dividendYield}
            </Item>
            <Item
              sx={{
                width: "27vh",
                height: "15vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {priceToEarningsRatio}
            </Item>
            <Item
              sx={{
                width: "27vh",
                height: "15vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {priceToBook}
            </Item>
            <Item
              sx={{
                width: "27vh",
                height: "15vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {ticker}
            </Item>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Stack>
          <Item
            sx={{
              width: "27vh",
              height: "15vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Calculo Bazin (yield 6%)
            {CalcBazin()}
          </Item>
          <Item
            sx={{
              width: "27vh",
              height: "15vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Calculo Graham
            {CalcGraham()}
          </Item>
        </Stack>
      </Box>
    </Box>
  );
}

export default StockPage;
