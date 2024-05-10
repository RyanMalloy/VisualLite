import React from "react";
import HeroNavbar from "../components/HeroNavbar";
import GroupPic from "../images/about_hero_bg.png";

import { Grid, Typography, Alert, Divider } from "@mui/material";
import PageHeader from "../components/PageHeader";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const AboutUs = () => {
  return (
    <>
      <HeroNavbar />
      <PageHeader icon={<EmojiPeopleIcon sx={{ fontSize: 48 }} />} title="About Us" description="Get to know us and our passion for crafting exceptional beer experiences. Discover our story, our values, and our commitment to the art of brewing." />

      <Grid container spacing={2} sx={{ p: 3, display: "flex", alignItems: "center" }}>
        <Grid item sm={12} md={6}>
          <img src={GroupPic} alt="TeamPicture" style={{ width: "100%", height: "100%" }}></img>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant="h6">Scrum Master</Typography>
          <Typography variant="h3">Ryan</Typography>
          <Typography variant="body">
            Ryan, our Scrum Master, is the orchestrator of our agile processes, ensuring seamless collaboration and maximizing team efficiency. With a keen eye for detail and a passion for agile methodologies, Ryan keeps our projects on track and our
            team in sync.
          </Typography>
          <Alert sx={{ width: "fit-content", mt: 1 }} severity="info">
            Favorite Beer: Michalob Ultra
          </Alert>
        </Grid>
      </Grid>

      <Divider />

      <Grid container spacing={2} sx={{ p: 3, display: "flex", alignItems: "center" }}>
        <Grid item xs={12} md={6}>
          <img src={GroupPic} alt="TeamPicture" style={{ width: "100%", height: "100%" }}></img>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Project Manager</Typography>
          <Typography variant="h3">Jonny</Typography>
          <Typography variant="body">
            Jonny, as the Project Manager, is the strategic force behind our initiatives. With exceptional organizational skills and a talent for communication, he expertly guides our projects from conception to completion, ensuring milestones are
            met and objectives are achieved.
          </Typography>
          <Alert sx={{ width: "fit-content", mt: 1 }} severity="info">
            Favorite Beer: Michelob Ultra
          </Alert>
        </Grid>
      </Grid>

      <Divider />

      <Grid container spacing={2} sx={{ p: 3, display: "flex", alignItems: "center" }}>
        <Grid item sm={12} md={6}>
          <img src={GroupPic} alt="TeamPicture" style={{ width: "100%", height: "100%" }}></img>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant="h6">Backend Specialist</Typography>
          <Typography variant="h3">Nic</Typography>
          <Typography variant="body">
            Nic, our Backend Specialist, is the powerhouse behind the seamless functionality of our applications. With a deep understanding of server-side technologies and database management, Nic crafts robust and scalable solutions that drive the
            core of our systems.
          </Typography>
          <Alert sx={{ width: "fit-content", mt: 1 }} severity="info">
            Favorite Beer: New Glarus Cabin Fever
          </Alert>
        </Grid>
      </Grid>

      <Divider />

      <Grid container spacing={2} sx={{ p: 3, display: "flex", alignItems: "center" }}>
        <Grid item sm={12} md={6}>
          <img src={GroupPic} alt="TeamPicture" style={{ width: "100%", height: "100%" }}></img>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant="h6">Frontend Luminary</Typography>
          <Typography variant="h3">Patrick</Typography>
          <Typography variant="body">
            Patrick, the Frontend Luminary, brings our digital interfaces to life with his creative and technical expertise. His innovative approach to design and meticulous attention to user experience make our applications not only functional but
            visually compelling.
          </Typography>
          <Alert sx={{ width: "fit-content", mt: 1 }} severity="info">
            Favorite Beer: Rhinegeist Truth
          </Alert>
        </Grid>
      </Grid>

      <Divider />

      <Grid container spacing={2} sx={{ p: 3, display: "flex", alignItems: "center" }}>
        <Grid item sm={12} md={6}>
          <img src={GroupPic} alt="TeamPicture" style={{ width: "100%", height: "100%" }}></img>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant="h6">Backend Savant</Typography>
          <Typography variant="h3">Brady </Typography>
          <Typography variant="body">
            Brady, our Backend Savant, is known for his exceptional coding skills and problem-solving abilities. With a focus on developing high-performance back-end systems, Brady ensures our applications are efficient, reliable, and secure.
          </Typography>
          <Alert sx={{ width: "fit-content", mt: 1 }} severity="info">
            Favorite Beer: 3 Floyds Gumballhead
          </Alert>
        </Grid>
      </Grid>
    </>
  );
};

export default AboutUs;
