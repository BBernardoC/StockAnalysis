import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";

// Exemplo de dados agrupados por tipo de investimento
const investmentTypes = {
  Ações: [
    {
      name: "PETR4",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      price: 4,
      price2: 3,
      balance: 2,
      price3: 1,
    },
    {
      name: "VALE3",
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      price: 4,
      price2: 3,
      balance: 2,
      price3: 1,
    },
  ],
  FIIs: [
    {
      name: "HGLG11",
      calories: 262,
      fat: 16.0,
      carbs: 24,
      protein: 6.0,
      price: 4,
      price2: 3,
      balance: 2,
      price3: 1,
    },
    {
      name: "XPLG11",
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      price: 4,
      price2: 3,
      balance: 2,
      price3: 1,
    },
  ],
  "Renda Fixa": [
    {
      name: "CDB Banco X",
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      price: 4,
      price2: 3,
      balance: 2,
      price3: 1,
    },
  ],
  abner: [{ name: "anderson", calories: 356, fat: 16.0, carbs: 49 }],
};

function InvestmentTypeTable({ type, rows }) {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          p: 1,
          borderRadius: "4px 4px 0 0",
        }}
      >
        <IconButton
          aria-label="expand section"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ ml: 1 }}>
          {type}
        </Typography>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer component={Paper} sx={{ borderRadius: "0 0 4px 4px" }}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Ticker</TableCell>
                <TableCell align="right">Preco</TableCell>
                <TableCell align="right">Variacao</TableCell>
                <TableCell align="right">Porcentagem</TableCell>
                <TableCell align="right">Rentabilidade</TableCell>
                <TableCell align="right">Preco medio</TableCell>
                <TableCell align="right">Preco atual</TableCell>
                <TableCell align="right">Bazin</TableCell>
                <TableCell align="right">Saldo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.price2}</TableCell>
                  <TableCell align="right">{row.balance}</TableCell>
                  <TableCell align="right">{row.price3}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Box>
  );
}

export default function BasicTable() {
  return (
    <Box>
      {Object.entries(investmentTypes).map(([type, rows]) => (
        <InvestmentTypeTable key={type} type={type} rows={rows} />
      ))}
    </Box>
  );
}
