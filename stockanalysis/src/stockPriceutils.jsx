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

export const DisplayCard = ({ name, data }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 100,
        maxWidth: 360,
        borderWidth: 2,
        height: 95,
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
      <Divider />
      <Box>
        <Typography align="center" justifyContent={"center"} marginTop={1}>
          {data !== null && data !== undefined ? data : "N/A"}
        </Typography>
      </Box>
    </Card>
  );
};

export const FundamentalCard = ({ name, data }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 180,
        maxWidth: 360,
        borderWidth: 2,
        height: 95,
        marginBottom: 2,
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
      <Divider />
      <Box>
        <Typography align="center" justifyContent={"center"} marginTop={1}>
          {data !== null && data !== undefined ? data : "N/A"}
        </Typography>
      </Box>
    </Card>
  );
};
