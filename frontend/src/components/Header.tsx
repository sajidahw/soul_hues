// default code using 'rafce' for Header component
import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import NavigatorLink from "./shared/NavigatorLink";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  // Header component function w/o parameters

  // authentication
  const auth = useAuth(); // used to manipulate if login screen is shown

  return (
    <AppBar
      sx={{
        bgcolor: "purple",
        position: "static",
        borderRadius: 1,
        boxShadow: 2,
      }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigatorLink
                // bg="#508896"
                bg="#f5d3a9" // pale orange
                to="/chat"
                text="Go to Chat"
                textColor="#467a87" // mid teal
                // textColor="#50a5ba" // lighter teal"
                // textColor="#d9db6e"
              />
              <NavigatorLink
                // bg="#d9db6e"
                bg="#467a87" // mid teal
                // bg="#50a5ba" // lighter teal
                // textColor="#3c6873"
                textColor="#f5d3a9" // pale orange
                to="/"
                text="Logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigatorLink
                // bg="#508896"
                bg="#f5d3a9" // pale orange
                to="/login"
                text="Login"
                // textColor="#d9db6e"
                textColor="#467a87" // mid teal
                // textColor="#50a5ba" // lighter teal
              />
              <NavigatorLink
                // bg="#d9db6e"
                bg="#467a87" // mid teal
                // bg="#50a5ba" // lighter teal
                // textColor="#3c6873"
                textColor="#f5d3a9" // pale orange
                to="/signup"
                text="Sign Up"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
