import React from "react";
import HeroNavbar from "../components/HeroNavbar";
import hops from "../images/hops_icon.svg";
import land1 from "../images/landing_img_1.png";
import land2 from "../images/landing_img_2.png";
import beerIcon from "../images/beer_icon.svg";
import beerIcon2 from "../images/style_icon.svg";
import beerIcon3 from "../images/brewery_icon.svg";
import beerIcon4 from "../images/globe_icon.svg";
import beerSplash from "../images/Beer-splash.png";
import bar from "../images/bar.png";
import bar2 from "../images/bar2.png";

import { Grid, Typography, Divider, Card, CardContent, TextField, Box } from "@mui/material";
import InfoCard from "../components/InfoCard";

const HomePage = () => {
  return (
    <>
      <HeroNavbar />
      
      <Grid container spacing={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90vh" }}>
        <Box sx={{ height: "96%", width: "100%", backgroundImage: `url(${bar2})`, backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ color: "#fff", fontWeight: "bold" }}>
              Sip, Search, & Savor
            </Typography>
            <Typography variant="body" sx={{ color: "#fff" }}>
              Dive into our expansive database and find the perfect brew tailored just for you. Let every sip be an adventure.
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid container spacing={2} sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Grid item sm={12} md={6}>
          <img src={land1} alt="LandingPage1" style={{ width: "100%", height: "100%", borderRadius: 10 }}></img>
        </Grid>
        <Grid item sm={12} md={6}>
          <Box sx={{ backgroundColor: "#ededed", width: "min-content", p: 1, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={hops} alt="HopsIcon" style={{ width: "48px", height: "48px" }}></img>
          </Box>
          <Typography variant="h3">Hop Into a World of Flavor</Typography>
          <Typography variant="body" color="gray">
            The art of brewing is a journey of transformation, and with VisuaLite, you get to be a part of that magic. Delve deep into our extensive database, uncover hidden gems, and let every sip be a revelation of flavor and craftsmanship.
          </Typography>
        </Grid>
      </Grid>

      <Divider />

      <Grid container spacing={2} sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: `url(${beerSplash})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <Grid item xs={6} md={4}>
          <InfoCard icon={beerIcon} title="5000+ Beers" description="With over 5000 beers to choose from, VisuaLite is here to help." />
        </Grid>
        <Grid item xs={6} md={4}>
          <InfoCard icon={beerIcon2} title="140+ Styles" description="Choose over 140 styles of beer to find your next weekend go to." />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard icon={beerIcon3} title="1350+ Breweries" description="Select from over 1350 breweries to find that perfect match." />
        </Grid>
      </Grid>

      <Divider />

      <Grid container spacing={2} sx={{ p: 3, display: "flex", alignItems: "center" }}>
        <Grid item sm={12} md={6}>
          <Box sx={{ backgroundColor: "#ededed", width: "min-content", p: 1, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={beerIcon4} alt="BeerIcon4" style={{ width: "48px", height: "48px" }}></img>
          </Box>
          <Typography variant="h3">Discover the Beauty of Brews</Typography>
          <Typography variant="body" color="gray">
            At VisuaLite, we celebrate the rich tapestry of tastes that beers from around the globe bring to the table. From the crisp notes of a local lager to the deep undertones of an international stout, our curated database is your passport to a
            tasting journey like no other.{" "}
          </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
          <img src={land2} alt="LandingPage2" style={{ width: "100%", height: "100%", borderRadius: 10 }}></img>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
