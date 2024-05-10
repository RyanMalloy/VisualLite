import React, { useState, useEffect } from "react";
import BeerCard from "../components/BeerCard";
import BeerFilter from "../components/BeerFilter";
import { fetchLikedBeers, auth } from "../config/firebase";
import HeroNavbar from "../components/HeroNavbar";
import { Grid, Box, TextField, Button, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import LiquorIcon from "@mui/icons-material/Liquor";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const BeerPage = () => {
  const [beers, setBeers] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [styles, setStyles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [likedBeers, setLikedBeers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStyleIds, setSelectedStyleIds] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("Showing all beers. Use the search bar to find specific beers.");
  const limit = 50;

  const handleStyleFilterChange = async (styleIds) => {
    setSelectedStyleIds(styleIds);
    try {
      const response = await fetch(`http://localhost:4000/filter?page=${currentPage}&limit=${limit}&styleIds=${styleIds}&catIds=${selectedCategoryIds}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const filteredData = await response.json();
      setFilteredBeers(filteredData);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const handleCategoryFilterChange = async (catIds) => {
    setSelectedCategoryIds(catIds);
    console.log(catIds);
    console.log(selectedCategoryIds);
    try {
      const response = await fetch(`http://localhost:4000/filter?page=${currentPage}&limit=${limit}&styleIds=${selectedStyleIds}&catIds=${catIds}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const filteredData = await response.json();
      setFilteredBeers(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  useEffect(() => {
    const fetchBeers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:4000/beers?page=${currentPage}&limit=${limit}&selectedStyles=${selectedStyleIds.join(",")}&selectedCategories=${selectedCategoryIds.join(",")}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBeers(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

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

    const fetchFiltered = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:4000/filter?page=${currentPage}&limit=${limit}&styleIds=${selectedStyleIds}&catIds=${selectedCategoryIds}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const filteredData = await response.json();
        setFilteredBeers(filteredData);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltered();
    fetchBeers();
    fetchStyles();
    fetchCategories();
  }, [currentPage, selectedStyleIds, selectedCategoryIds]);

  useEffect(() => {
    if (auth.currentUser) {
      fetchLikedBeers(auth.currentUser.uid)
        .then((key) => setLikedBeers(key))
        .catch((error) => console.error(error));
    }
  }, []);

  const handleLikeChange = (beer, isLiked) => {
    setLikedBeers((prevLikedBeers) => {
      if (isLiked) {
        return [...prevLikedBeers, beer];
      } else {
        return prevLikedBeers.filter((prevBeer) => prevBeer.id !== beer.id);
      }
    });
  };

  const getStyleName = (styleID) => {
    const style = styles.find((s) => s.id === styleID);
    return style ? style.name : "Unknown Style";
  };

  const getCategoryName = (catID) => {
    const category = categories.find((c) => c.id === catID);
    return category ? category.name : "Unknown Category";
  };

  const handlePrevPage = async () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = async () => {
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
      <PageHeader icon={<LiquorIcon sx={{ fontSize: 48 }} />} title="Beers" description="Explore a world of flavors with our vast selection of beers. From bold and robust to light and refreshing, find your next favorite brew here." />

      <Grid container spacing={2} sx={{ p: 3 }}>
      {/* <Grid item xs={12}>
          <Box display={"flex"} >
            <TextField
              placeholder="Search beers"
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
              label="Search beers"
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
            {(selectedStyleIds?.length === 0 && selectedCategoryIds?.length === 0 &&
              beers.map((beer, index) => (
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
              ))) ||
              filteredBeers.map((beer, index) => (
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
        )}
      </Grid>
      <BeerFilter styles={styles} selectedStyleIds={selectedStyleIds} onStyleFilterChange={handleStyleFilterChange} categories={categories} selectedCategoryIds={selectedCategoryIds} onCategoryFilterChange={handleCategoryFilterChange} onPrevPage={handlePrevPage} onNextPage={handleNextPage} currentPage={currentPage} />
    </>
  );
};

export default BeerPage;
