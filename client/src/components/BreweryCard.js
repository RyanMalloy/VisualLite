import React from "react";
import { Card, CardContent, Typography, Box, Chip, Button, Modal, useTheme } from "@mui/material";
import FactoryIcon from "@mui/icons-material/Factory";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import FlagIcon from "@mui/icons-material/Flag";
import PublicIcon from "@mui/icons-material/Public";

const BreweryCard = ({ brewery }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card sx={{ overflow: "auto", borderRadius: 3, boxShadow: 2, my: 1 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FactoryIcon />
              <Typography variant="body h5">{brewery.name}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 1 }}>
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
              icon={<HomeIcon />}
              label={`${brewery.address}`}
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
              icon={<LocationCityIcon />}
              label={`${brewery.city}`}
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
              icon={<FlagIcon />}
              label={`${brewery.state}`}
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
              icon={<PublicIcon />}
              label={`${brewery.country}`}
            />
          </Box>

          <Typography variant="body" color="text.secondary" sx={{ my: 1 }}>
            {brewery.description}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <Button fullWidth sx={{ borderRadius: 30 }} variant="contained" onClick={handleOpen}>
              View
            </Button>
            <Button fullWidth sx={{ borderRadius: 30 }} variant="outlined" onClick={() => window.open(brewery.website)}>
              Website
            </Button>
          </Box>
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
            maxHeight: 600,
            border: "none",
            boxShadow: 24,
          }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FactoryIcon />
            <Typography variant="body h5">{brewery.name}</Typography>
          </Box>
          <Typography variant="body" color="text.secondary" sx={{ mt: 1 }}>
            {brewery?.description}
          </Typography>          

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1, color: "text.secondary" }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <HomeIcon />
              <Typography variant="body " color="text.secondary">
                Address: {brewery.address}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <LocationCityIcon />
              <Typography variant="body " color="text.secondary">
                City: {brewery.city}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <FlagIcon />
              <Typography variant="body " color="text.secondary">
                State: {brewery.state}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <PublicIcon />
              <Typography variant="body " color="text.secondary">
                Country: {brewery.country}
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

export default BreweryCard;
