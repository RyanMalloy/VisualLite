import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { Drawer, Box, Button, List, ListItem, ListItemButton, ListItemText, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import LiquorIcon from "@mui/icons-material/Liquor";
import FactoryIcon from "@mui/icons-material/Factory";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import Logo from "../components/SvgIcon";

const HeroNavbar = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const DrawerList = (
    <Box sx={{ width: 250, height: "100%", display: "flex", flexDirection: "column" }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton selected={currentPath === "/"} onClick={() => navigate("/")} sx={{ display: "flex", gap: 2 }}>
            <HomeIcon />
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton selected={currentPath === "/aboutus"} onClick={() => navigate("/aboutus")} sx={{ display: "flex", gap: 2 }}>
            <EmojiPeopleIcon />
            <ListItemText>About Us</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton selected={currentPath === "/beers"} onClick={() => navigate("/beers")} sx={{ display: "flex", gap: 2 }}>
            <LiquorIcon />
            <ListItemText>Beers</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton selected={currentPath === "/breweries"} onClick={() => navigate("/breweries")} sx={{ display: "flex", gap: 2 }}>
            <FactoryIcon />
            <ListItemText>Breweries</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton selected={currentPath === "/toptwenty"} onClick={() => navigate("/toptwenty")} sx={{ display: "flex", gap: 2 }}>
            <EmojiEventsIcon />
            <ListItemText>Top Twenty</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          {isUserLoggedIn ? (
            <ListItemButton selected={currentPath === "/account"} onClick={() => navigate("/account")} sx={{ display: "flex", gap: 2 }}>
              <AccountCircleIcon />
              <ListItemText>Account</ListItemText>
            </ListItemButton>
          ) : (
            <ListItemButton selected={currentPath === "/login"} onClick={() => navigate("/login")} sx={{ display: "flex", gap: 2 }}>
              <LoginIcon />
              <ListItemText>Login</ListItemText>
            </ListItemButton>
          )}
        </ListItem>
      </List>

      <Logo sx={{ width: "auto", mb: 2, mt: "auto", mr: 3}} />
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "white", color: "black" }}>
          <Toolbar sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={toggleDrawer(true)} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Logo sx={{ width: "auto" }} />
            <Box sx={{ flexGrow: 1 }} />
            {isUserLoggedIn ? (
              <Button sx={{ display: "flex", gap: 1 }} variant="outline" onClick={() => navigate("/account")}>
                <AccountCircleIcon />
                Account
              </Button>
            ) : (
              <Button sx={{ display: "flex", gap: 1 }} variant="outline" onClick={() => navigate("/login")}>
                <LoginIcon />
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default HeroNavbar;
