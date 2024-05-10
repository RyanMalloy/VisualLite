import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import BeerBackground from "../images/beer-scene.png";

const PageHeader = ({ icon, title, description, buttons }) => {
  return (
    <>
      <Grid container sx={{ p: 3, backgroundImage: `url(${BeerBackground})` }}>
        <Grid item sx={{ maxWidth: 600, color: "white", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {icon}
            <Typography variant="h3">{title}</Typography>
          </Box>
          <Typography variant="body">{description}</Typography>
          {buttons && buttons}
        </Grid>
      </Grid>
    </>
  );
};

export default PageHeader;
