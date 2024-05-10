import { useState, useEffect } from "react";
import BreweryCard from "../components/BreweryCard";
import HeroNavbar from "../components/HeroNavbar";
import PageHeader from "../components/PageHeader";
import { Box, SpeedDial, SpeedDialAction, Grid, TextField, Button, Typography } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FactoryIcon from "@mui/icons-material/Factory";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const BreweriesPage = () => {
  const [breweries, setBreweries] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 50;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("Showing all breweries. Use the search bar to find specific breweries.");

  useEffect(() => {
    const fetchBreweries = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:4000/breweries?page=${currentPage}&limit=${limit}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBreweries(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleSearch = () => {
    // TODO
    // query with the search term
    // set search results
    // set search message
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <HeroNavbar />
      <PageHeader icon={<FactoryIcon sx={{ fontSize: 48 }} />} title="Breweries" description="Journey through the artistry of breweries. Uncover the unique stories behind each, celebrating their heritage and innovation in crafting distinct brews." />

      <Grid container spacing={2} sx={{ p: 3 }}>
        {/* <Grid item xs={12}>
          <Box display={"flex"}>
            <TextField
              placeholder="Search breweries"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              label="Search breweries"
              variant="outlined"
              sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            />
            <Button sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {searchMessage}
          </Typography>
        </Grid> */}
        {loading ? (
          <Box sx={{ position: "absolute", display: "flex", flexDirection: "column", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Box className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Box>
          </Box>
        ) : (
          <>
            {breweries.map((brewery, index) => (
              <Grid item xs={12} md={6} key={index}>
                <BreweryCard brewery={brewery} />
              </Grid>
            ))}
          </>
        )}
      </Grid>

      <Box>
        <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: "fixed", bottom: 16, right: 16 }} icon={<SpeedDialIcon />}>
          <SpeedDialAction key="Previous Page" icon={<ArrowBackIcon />} tooltipTitle="Previous Page" onClick={handlePrevPage} disabled={currentPage === 1} />
          <SpeedDialAction key="Next Page" icon={<ArrowForwardIcon />} tooltipTitle="Next Page" onClick={handleNextPage} />
        </SpeedDial>
      </Box>
    </>
  );
};

export default BreweriesPage;
