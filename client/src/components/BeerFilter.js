import React, { useState, useEffect } from "react";
import { Button, Typography, Box, SpeedDial, SpeedDialAction, Drawer, Divider, Input, Checkbox, FormControlLabel } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SortIcon from "@mui/icons-material/Sort";
import CategoryIcon from "@mui/icons-material/Category";
import StyleIcon from "@mui/icons-material/Style";

const BeerFilter = ({ styles, selectedStyleIds, onStyleFilterChange, categories, selectedCategoryIds, onCategoryFilterChange,
   onPrevPage, onNextPage, currentPage }) => {
  const [selectedStyles, setSelectedStyles] = useState({});
  const [selectedCategories, setSelectedCategories] = useState({});
  const [styleSearchTerm, setStyleSearchTerm] = useState("");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const updatedSelectedStyles = {};
    selectedStyleIds.forEach(id => {
      updatedSelectedStyles[id] = true;
    });
    setSelectedStyles(updatedSelectedStyles);
  }, [selectedStyleIds]);

  useEffect(() => {
    const updatedSelectedCategories = {};
    selectedCategoryIds.forEach(id => {
      updatedSelectedCategories[id] = true;
    });
    setSelectedCategories(updatedSelectedCategories);
  }, [selectedCategoryIds]);

  const toggleFilter = (newOpen) => () => {
    setOpenFilter(newOpen);
  };

  const handleStyleChange = (id) => {
    const newSelectedStyles = { ...selectedStyles };
    newSelectedStyles[id] = !selectedStyles[id];
    setSelectedStyles(newSelectedStyles);
    const newSelectedStyleIds = Object.keys(newSelectedStyles).filter(styleId => newSelectedStyles[styleId]);
    onStyleFilterChange(newSelectedStyleIds);
  };

  const handleCategoryChange = (id) => {
    const newSelectedCategories = { ...selectedCategories };
    newSelectedCategories[id] = !selectedCategories[id];
    setSelectedCategories(newSelectedCategories);
    const newSelectedCategoryIds = Object.keys(newSelectedCategories).filter(catId => newSelectedCategories[catId]);
    onCategoryFilterChange(newSelectedCategoryIds);
  };

  const clearStyles = () => {
    setSelectedStyles({});
    onStyleFilterChange([]);
  };

  const clearCategories = () => {
    setSelectedCategories({});
    onCategoryFilterChange([]);
  };

  const filteredStyles = styles.filter((style) => style.name.toLowerCase().includes(styleSearchTerm.toLowerCase()));
  const filteredCategories = categories.filter((category) => category.name.toLowerCase().includes(categorySearchTerm.toLowerCase()));

  return (
    <>
      <Box>
        <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: "fixed", bottom: 16, right: 16 }} icon={<SpeedDialIcon />}>
          <SpeedDialAction key="Filter Settings" icon={<SortIcon />} tooltipTitle="Filter Settings" onClick={toggleFilter(true)} />
          <SpeedDialAction key="Previous Page" icon={<ArrowBackIcon />} tooltipTitle="Previous Page" onClick={onPrevPage} disabled={currentPage === 1} />
          <SpeedDialAction key="Next Page" icon={<ArrowForwardIcon />} tooltipTitle="Next Page" onClick={onNextPage} />
        </SpeedDial>
      </Box>

      <Drawer open={openFilter} onClose={toggleFilter(false)}>
        <Box sx={{ p: 2, width: 300 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography variant="body h4">Filter Settings</Typography>
            <SortIcon />
          </Box>
          <Divider sx={{ my: 1, mb: 3 }} />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <StyleIcon />
              <Typography variant="h6">Styles</Typography>
            </Box>
            <Button variant="outlined" onClick={clearStyles}>
              Clear
            </Button>
          </Box>
          <Input sx={{ width: "100%", mt: 1 }} type="text" placeholder="Search..." value={styleSearchTerm} onChange={(e) => setStyleSearchTerm(e.target.value)} />
          <Box sx={{ height: 200, overflow: "auto", my: 1, pl: 1.5 }}>
            {filteredStyles.map((style) => (
              <Box key={style.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <FormControlLabel
                  control={<Checkbox checked={!!selectedStyles[style.id]} onChange={() => handleStyleChange(style.id)}/>}
                  label={
                    <Typography variant="body" sx={{ fontSize: 14 }}>
                      {style.name}
                    </Typography>
                  }
                />
              </Box>
            ))}
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CategoryIcon />
              <Typography variant="h6">Categories</Typography>
            </Box>
            <Button variant="outlined" onClick={clearCategories}>
              Clear
            </Button>
          </Box>
          <Input sx={{ width: "100%", mt: 1 }} type="text" placeholder="Search..." value={categorySearchTerm} onChange={(e) => setCategorySearchTerm(e.target.value)} />
          <Box sx={{ height: 200, overflow: "auto", my: 1, pl: 1.5 }}>
            {filteredCategories.map((category) => (
              <Box key={category.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <FormControlLabel
                  control={<Checkbox checked={!!selectedCategories[category.id]} onChange={() => handleCategoryChange(category.id)} />}
                  label={
                    <Typography variant="body2" sx={{ fontSize: 14 }}>
                      {category.name}
                    </Typography>
                  }
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
export default BeerFilter;