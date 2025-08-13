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
      .then((json) => setStockInfo(json))
      .catch(() =>
        setStockInfo({ error: "erro ao buscar os dados stockinfo" })
      );
  }, [ticker]);

  return (
    <Box
      sx={{
        height: "100vh",
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
            Preco
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
            Variacao
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
            P/L
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
            p/vp
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
            dy
          </Item>
        </Stack>
        {stockData && <pre>{JSON.stringify(stockData, null, 2)}</pre>}
        {stockInfo && <pre>{JSON.stringify(stockInfo, null, 2)}</pre>}
      </Box>
    </Box>
  );
}

export default StockPage;
