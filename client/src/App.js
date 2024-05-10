import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Theme from "./components/Theme";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import BeerPage from "./pages/BeerPage";
import LoginPage from "./pages/LoginPage";
import BreweriesPage from "./pages/BreweriesPage";
import AccountPage from "./pages/AccountPage";
import TopTwenty from "./pages/TopTwenty";

function App() {
  return (
    <>
      <Theme>
        <SnackbarProvider maxSnack={3}>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/aboutus" element={<AboutUsPage />} />
                <Route path="/beers" element={<BeerPage />} />
                <Route path="/breweries" element={<BreweriesPage />} />
                <Route path="/toptwenty" element={<TopTwenty />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/account" element={<PrivateRoute />}>
                  <Route index element={<AccountPage />} />
                </Route>
              </Routes>
            </Router>
          </AuthProvider>
        </SnackbarProvider>
      </Theme>
    </>
  );
}

export default App;
