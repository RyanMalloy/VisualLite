import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const InfoCard = ({ icon, title, description }) => {
  return (
    <>
      <Card sx={{ backgroundColor: "white", borderRadius: 5 }}>
        <CardContent>
          <img src={icon} alt="BeerIcon" style={{ width: "10%", height: "10%" }}></img>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="body" color="gray">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default InfoCard;
