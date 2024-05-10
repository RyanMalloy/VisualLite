import React, { useEffect, useState } from "react";
import { auth, addToLikes, removeFromLikes } from "../config/firebase";
import { useSnackbar } from "notistack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LiquorIcon from "@mui/icons-material/Liquor";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import CategoryIcon from "@mui/icons-material/Category";
import StyleIcon from "@mui/icons-material/Style";

import { Chip, Box, Card, Typography, CardContent, IconButton, Button, Snackbar, Modal, useTheme, Alert } from "@mui/material";

const BeerCard = ({ beer, getStyleName, getCategoryName, isLiked, setIsLiked, setLikedBeers }) => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToLikes = async (beer) => {
    if (!auth.currentUser) {
      return;
    }
    if (isLiked) {
      const message = await removeFromLikes(auth.currentUser.uid, beer.id);
      enqueueSnackbar(message, {
        variant: "success",
        action: (
          <Button
            sx={{
              color: "black",
              bgcolor: "white",
              "&:hover": {
                bgcolor: "black",
                color: "white",
              },
            }}
            variant="contained"
            size="small"
            onClick={() => handleUndoLike(beer)}>
            Undo
          </Button>
        ),
      });
      setIsLiked(false); // Update the isLiked state
    } else {
      const message = await addToLikes(auth.currentUser.uid, beer);
      enqueueSnackbar(message, { variant: "success" });
      setIsLiked(true); // Update the isLiked state
    }
  };

  const handleUndoLike = async (beer) => {
    if (!auth.currentUser) {
      return;
    }
    const message = await addToLikes(auth.currentUser.uid, beer);
    enqueueSnackbar(message, { variant: "success" });
    // Update the liked beers state
    setLikedBeers(
      (prevLikedBeers) => {
        // Check if the beer is already in the liked beers array
        const beerIndex = prevLikedBeers.findIndex((b) => b.id === beer.id);
        if (beerIndex === -1) {
          // If the beer is not in the array, add it
          return [...prevLikedBeers, beer];
        } else {
          // If the beer is already in the array, return the existing array
          return prevLikedBeers;
        }
      },
      () => {
        setIsLiked(true); // Update the isLiked state
      }
    );
  };

  const addToast = (message, beer = null, isUndo = false) => {
    enqueueSnackbar(message, {
      variant: message === "Beer already liked" ? "warning" : "success",
      action: isUndo ? (
        <Button color="secondary" size="small" onClick={() => handleUndoLike(beer)}>
          Undo
        </Button>
      ) : null,
    });
  };

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackbar();
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card sx={{ overflow: "auto", borderRadius: 3, boxShadow: 2, my: 1 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LiquorIcon />
              <Typography variant="body h5">{beer?.name}</Typography>
            </Box>
            <IconButton sx={{ color: isLiked ? "red" : "default" }} disabled={!isUserLoggedIn} onClick={() => handleAddToLikes(beer)}>
              <FavoriteIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 1, color: "text.secondary" }}>
            <Chip
              sx={{
                p: 1,
                py: 2,
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "text.secondary",
              }}
              variant="filled"
              label={`${beer.abv}% ABV`}
              icon={<BubbleChartIcon />}
            />
            <Chip
              sx={{
                p: 1,
                py: 2,
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "text.secondary",
              }}
              variant="filled"
              label={getCategoryName(beer?.catID)}
              icon={<CategoryIcon />}
            />
            <Chip
              sx={{
                p: 1,
                py: 2,
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "text.secondary",
              }}
              variant="filled"
              label={getStyleName(beer?.styleID)}
              icon={<StyleIcon />}
            />
          </Box>
          <Typography variant="body" color="text.secondary" sx={{ my: 1 }}>
            {beer.description}
          </Typography>
          <Button sx={{ borderRadius: 30 }} variant="outlined" onClick={handleOpen}>
            View
          </Button>
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LiquorIcon />
            <Typography variant="body h5">{beer?.name}</Typography>
          </Box>
          <Typography variant="body" color="text.secondary" sx={{ mt: 1 }}>
            {beer?.description}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1, color: "text.secondary" }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <LiquorIcon />
              <Typography variant="body " color="text.secondary">
                ABV: {beer?.abv}%
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <CategoryIcon />
              <Typography variant="body " color="text.secondary">
                {getCategoryName(beer?.catID)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <StyleIcon />
              <Typography variant="body " color="text.secondary">
                {getStyleName(beer?.styleID)}
              </Typography>
            </Box>
          </Box>

          <Button sx={{ mt: 2, borderRadius: 30 }} variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default BeerCard;
