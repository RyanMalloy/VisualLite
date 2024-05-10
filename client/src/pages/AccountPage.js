import React, { useState, useEffect } from "react";
import { fetchLikedBeers, auth } from "../config/firebase";

import BeerCard from "../components/BeerCard";
import HeroNavbar from "../components/HeroNavbar";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography, Box, Modal, useTheme, Snackbar } from "@mui/material";
import PageHeader from "../components/PageHeader";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AccountPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [styles, setStyles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likedBeers, setLikedBeers] = useState([]);

  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchStyles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:4000/styles`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStyles(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:4000/categories`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStyles();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchLikedBeers(auth.currentUser.uid)
      .then((key) => setLikedBeers(key))
      .catch((error) => console.error(error));
  }, []);

  const getStyleName = (styleID) => {
    const style = styles.find((s) => s.id === styleID);
    return style ? style.name : "Unknown Style";
  };

  const getCategoryName = (catID) => {
    const category = categories.find((c) => c.id === catID);
    return category ? category.name : "Unknown Category";
  };

  const handleLikeChange = (beer, isLiked) => {
    setLikedBeers((prevLikedBeers) => {
      if (isLiked) {
        return [...prevLikedBeers, beer];
      } else {
        return prevLikedBeers.filter((prevBeer) => prevBeer.id !== beer.id);
      }
    });
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setMessage("Logged out successfully!");
      setOpen(true);
      navigate("/login");
    } catch (error) {
      setMessage("Failed to log out.");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <HeroNavbar />
      <PageHeader
        icon={<AccountCircleIcon sx={{ fontSize: 48 }} />}
        title="Account"
        description="Manage your personal beer journey. Update your preferences, keep track of your favorite brews, and tailor your beer exploration experience to suit your unique taste."
        buttons={
          <Button sx={{ width: "fit-content", mt: 1 }} color="error" variant="contained" onClick={handleOpenModal}>
            Sign Out
          </Button>
        }
      />

      <Grid container spacing={2} sx={{ p: 3 }}>
        {loading ? (
          <Box sx={{ position: "absolute", display: "flex", flexDirection: "column", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Box className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Box>
          </Box>
        ) : (
          <>
            {likedBeers.length > 0 ? (
              <>
                {likedBeers.map((beer, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <BeerCard
                      beer={beer}
                      getStyleName={getStyleName}
                      getCategoryName={getCategoryName}
                      isLiked={likedBeers.some((likedBeer) => likedBeer.id === beer.id)}
                      setIsLiked={(isLiked) => handleLikeChange(beer, isLiked)}
                      setLikedBeers={setLikedBeers}
                    />
                  </Grid>
                ))}
              </>
            ) : (
              <>
                <Typography variant="h5">You have not liked any beers yet...</Typography>
              </>
            )}
          </>
        )}
      </Grid>
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 3,
            overflow: "auto",
            borderRadius: 3,
            width: theme.modal.width,
            border: "none",
            boxShadow: 24,
          }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h5">Sign Out</Typography>
            <Typography variant="body" color="text.secondary">
              Are you sure you want to sign out? You can log back in at any time.
            </Typography>
            <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
              <Button fullWidth variant="contained" color="error" onClick={handleSignOut}>
                Yes
              </Button>
              <Button fullWidth variant="outlined" onClick={handleCloseModal}>
                No
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={message} />
    </>
  );
};

export default AccountPage;
