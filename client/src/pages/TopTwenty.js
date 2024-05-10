import React, { useState, useEffect } from "react";
import { fetchLikedBeers, auth } from "../config/firebase";
import BeerCard from "../components/BeerCard";
import HeroNavbar from "../components/HeroNavbar";
import PageHeader from "../components/PageHeader";
import { Grid, Box } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const TopTwenty = () => {
  const [beers, setBeers] = useState([]);
  const [styles, setStyles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [likedBeers, setLikedBeers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:4000/beers`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allBeers = await response.json();

        // Generate a seed based on the current date
        const date = new Date();
        const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

        // Seeded random number generator
        const seededRandom = (seed) => {
          var x = Math.sin(seed++) * 10000;
          return x - Math.floor(x);
        };

        // Shuffle array using Fisher-Yates (Durstenfeld) shuffle algorithm
        for (let i = allBeers.length - 1; i > 0; i--) {
          const j = Math.floor(seededRandom(seed + i) * (i + 1));
          [allBeers[i], allBeers[j]] = [allBeers[j], allBeers[i]];
        }

        // Select the top 20 unique beers
        const top20 = allBeers.slice(0, 20);
        setBeers(top20);
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

    fetchBeers();
    fetchStyles();
    fetchCategories();
  }, []);

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

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <HeroNavbar />
      <PageHeader icon={<EmojiEventsIcon sx={{ fontSize: 48 }} />} title="Top 20" description="Discover the top 20 beers that have been handpicked for their exceptional taste and quality." />

      <Grid container spacing={2} sx={{ p: 3 }}>
        {loading ? (
          <Box sx={{ position: "absolute", display: "flex", flexDirection: "column", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Box className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Box>
          </Box>
        ) : (
          <>
            {beers.map((beer, index) => (
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
    </>
  );
};

export default TopTwenty;
