import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

const LoginButtons = ({ updateFormLogin, updateFormSignUp, show, loading }) => {
  return (
    <Box sx={{ mt: 1 }}>
      {show ? (
        <>
          <Box sx={{ display: "flex" }}>
            <ToggleButtonGroup fullWidth>
              <ToggleButton disabled={loading} selected variant="primary" onClick={updateFormLogin}>
                Login
              </ToggleButton>
              <ToggleButton disabled={loading} variant="contained" onClick={updateFormSignUp}>
                Sign Up
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex" }}>
            <ToggleButtonGroup fullWidth>
              <ToggleButton disabled={loading} variant="primary" onClick={updateFormLogin}>
                Login
              </ToggleButton>
              <ToggleButton disabled={loading} selected variant="contained" onClick={updateFormSignUp}>
                Sign Up
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </>
      )}
    </Box>

    // <div className="login-group-container mb-3">
    //   <div className="login-group ">
    //     {show ? (
    //       <>
    //         <button className="btn login-btn login-btn-active" onClick={updateFormLogin}>
    //           Sign In
    //         </button>
    //         <button className="btn login-btn" onClick={updateFormSignUp}>
    //           Sign Up
    //         </button>
    //       </>
    //     ) : (
    //       <>
    //         <button className="btn login-btn" onClick={updateFormLogin}>
    //           Sign In
    //         </button>
    //         <button className="btn login-btn login-btn-active" onClick={updateFormSignUp}>
    //           Sign Up
    //         </button>
    //       </>
    //     )}
    //   </div>
    // </div>
  );
};

export default LoginButtons;
