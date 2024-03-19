import { Box, useMediaQuery, useTheme } from "@mui/material";
import Animate from "../components/typer/Animate";
import { Footer } from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md")); // check if mobile device size being used
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <Animate />
        </Box>
        <Box sx={{ mx: 3, my: 3 }}></Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
          }}
        >
          <img
            src="nuclear.jpg"
            // src="robot.png"
            alt="ideation"
            style={{ width: "30%", margin: "auto", borderRadius: "250px" }}
          />
          {/* <img
            src="soulhues_logo_cropped.png"
            // src="robot.png"
            alt="Sould Hues Logo"
            style={{ width: "200px", margin: "auto" }}
          /> */}
          <img
            className="image-inverted rotate"
            src="openai.png"
            alt="openai"
            style={{ width: "200px", margin: "auto" }}
          />
        </Box>
        <Box sx={{ mx: 3, my: 3 }}></Box>
        <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
          <img
            src="chat.png"
            alt="chat with AI"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "80%" : "60%",
              borderRadius: 20,
              boxShadow: " -5px -5px 105px purple", //#64f3d5
              marginTop: 20,
              marginBottom: 5, //10
              padding: 4, //10
            }}
          />
        </Box>
      </Box>
      <Footer></Footer>
    </Box>
  );
};

export default Home;
