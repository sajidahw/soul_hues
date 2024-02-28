import React from "react"; // Add the missing import statement for React

import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  // Logo component function w/o parameters
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src="soulhues_logo_cropped.png"
          alt="Soul Hues AI"
          width={"60px"}
          height={"50px"}
          className="image-inverted"
        />
      </Link>{" "}
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "1.2em" }}> Soul Hues: </span>
        {/* </Typography> */}
        My Personality Color App <i>with Chat-GPT4</i>
      </Typography>
    </div>
  );
};

export default Logo;

// Typography display md is medium, sm is small, xs is extra small where Typography is a component from Material UI
// mr is margin right
