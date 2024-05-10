import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../config/firebase.js";
import HeroNavbar from "../components/HeroNavbar.js";
import LoginButtons from "../components/LoginButtons.js";
import { FormControl, Grid, Typography, Button, Alert, TextField, useTheme } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [showLogin, setshowLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const userCredential = await signIn(email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        setError("");
        setMessage("Success! Logging in...");
        setTimeout(() => {
          setLoading(true);
          navigate("/beers"); // Navigate to the main page
        }, 2000);
      } else {
        setError("Your email address is not verified. Please check your email to verify your account.");
        // Optionally, you can also provide a way to resend the verification email
      }
    } catch (error) {
      setMessage("");
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await signUp(email, password);
      setError("");
      setMessage("Success! Account created. Please check your email for verification.");
      setTimeout(() => {
        setshowLogin(true);
        setMessage("");
        setError("");
        setEmail("");
        setPassword("");
        setLoading(true);
      }, 3000);
    } catch (error) {
      setMessage("");
      setError(error.message);
      setLoading(false);
    }
  };

  const showLoginForm = (e) => {
    e.preventDefault();
    setError("");
    setshowLogin(true);
  };

  const showSignUpForm = (e) => {
    e.preventDefault();
    setError("");
    setshowLogin(false);
  };

  return (
    <>
      <HeroNavbar />
      <Grid container>
        <Grid item xs={12} sx={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {showLogin ? (
            <FormControl sx={{ width: theme.modal.width }}>
              <Typography variant="h4">Welcome Back!</Typography>
              <Typography variant="body" color="text.secondary">
                Welcome back. Please enter your details.
              </Typography>
              {message && (
                <Alert sx={{ my: 1 }} severity="success">
                  {message}
                </Alert>
              )}
              {error && (
                <Alert sx={{ my: 1 }} severity="error">
                  {error}
                </Alert>
              )}
              <LoginButtons updateFormLogin={showLoginForm} updateFormSignUp={showSignUpForm} show={showLogin} loading={loading} />
              <TextField disabled={loading} sx={{ mt: 2 }} id="email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
              <TextField disabled={loading} sx={{ my: 2 }} id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
              <Button disabled={loading} variant="contained" color="primary" fullWidth onClick={handleSubmitLogin}>
                Login
              </Button>
            </FormControl>
          ) : (
            <FormControl sx={{ width: theme.modal.width }}>
              <Typography variant="h4">Sign Up</Typography>
              <Typography variant="body" color="text.secondary">
                Hello! Enter your details to join.
              </Typography>
              {message && (
                <Alert sx={{ my: 1 }} severity="success">
                  {message}
                </Alert>
              )}
              {error && (
                <Alert sx={{ my: 1 }} severity="error">
                  {error}
                </Alert>
              )}
              <LoginButtons updateFormLogin={showLoginForm} updateFormSignUp={showSignUpForm} show={showLogin} />
              <TextField disabled={loading} sx={{ mt: 2 }} id="email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
              <TextField disabled={loading} sx={{ my: 2 }} id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
              <Button disabled={loading} variant="contained" color="primary" fullWidth onClick={handleSubmitSignUp}>
                Sign Up
              </Button>
            </FormControl>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
