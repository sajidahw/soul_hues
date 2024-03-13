// designing chat item appearance and functionality

import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

//0, 110, 138, .8
// 81, 162, 192, #4d56

const ChatItem = ({
  role,
  content,
}: {
  role: "system" | "user" | "assistant";
  content: string;
}) => {
  const auth = useAuth();
  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "rgb(0, 110, 138)",
        my: 2,
        gap: 2,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{content}</Typography>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{ display: "flex", p: 2, bgcolor: "rgb(113, 31, 115, .8)", gap: 2 }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "whitesmoke" }}>
        {auth?.user?.name[0]} {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
