import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import React, { useState, useRef, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";

const formatarNumeroCompleto = (valor) => {
  const numero = parseFloat(valor);

  if (isNaN(numero)) {
    return "N/A";
  }


  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    maximumFractionDigits: 2, 
    minimumFractionDigits: 0,  
  }).format(numero);
};

export const DisplayCard = ({ name, data }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#3260ddff', 
        color: 'white',
        borderRadius: '12px', 
        padding: '12px 24px',
        textAlign: 'center',
        minWidth: 120,
      }}
    >
      <Typography variant="body2" component="div" sx={{ opacity: 0.8 }}>
        {name}
      </Typography>
      <Typography variant="h5" component="div" fontWeight="bold">
        {formatarNumeroCompleto(data)}
      </Typography>
    </Box>
  );
};

export const FundamentalCard = ({ name, data }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 180,
        maxWidth: 360,     
        height: 95,
        marginBottom: 2,
        borderColor: 'primary.main',
      }}
    >
      <Box>
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h6">
            {name}
          </Typography>
        </Stack>
      </Box>
      <Divider sx={{ borderColor: 'primary.main' }} />
      <Box>
        <Typography align="center" justifyContent={"center"} marginTop={1}>
           {formatarNumeroCompleto(data)}
        </Typography>
      </Box>
    </Card>
  );
};