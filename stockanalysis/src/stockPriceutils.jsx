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

const DisplayCard = ({ name, data }) => {
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

export default DisplayCard;
