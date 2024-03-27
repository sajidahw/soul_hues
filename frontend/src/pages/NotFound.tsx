// catch for any route that doesn't exist
import { FcLock, FcHighPriority } from "react-icons/fc";
import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box
        padding={8}
        mt={8}
        // mx={6}
        display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img
          className="image-inverted4 rotate" // added to circulate
          src="/forbidden_entry.png"
          alt="magical forbidden sign"
          style={{
            width: "440px",
            height: "440px",
            borderRadius: "260px",
            border: " 1px solid purple",
            boxShadow: "0 0 10px 5px red",
          }} //450px, 15px, 300/300
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "50%",
            justifyContent: "center",
            backgroundColor: "rgba(128, 52, 128, 0.8)", // light purple
            boxShadow: "0 0 10px 5px red",
            borderRadius: "20px",
            my: "auto",
            mx: 8,
            p: 0.2,
          }}
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            padding={2}
            fontWeight={600}
          >
            <FcHighPriority
              style={{
                marginRight: "10px",
                marginLeft: "10px",
                fontSize: "55px",
              }}
            />
            Forbidden Entry:
          </Typography>

          <Typography
            variant="h4"
            textAlign={"center"}
            padding={2}
            fontWeight={600}
            // width={"100%"}
            display={"flex"}
            flexDirection={"row"}
          >
            <FcLock
              style={{
                marginRight: "10px",
                marginLeft: "10px",
                fontSize: "55px",
              }}
            />
            You must LOG IN to access secure chat pages.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
