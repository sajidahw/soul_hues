// designing chat item appearance based off of role

// import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Improved function to extract code blocks
// function extractCodeBlocksFromString(message) {
//   if (!message.includes("```")) return [];

//   const parts = message.split("```");
//   return parts.reduce((acc, part, index) => {
//     // Odd indices are code blocks, given the starting index is 0
//     if (index % 2 === 1) acc.push(part);
//     return acc;
//   }, []);
// }

//0, 110, 138, .8
// 81, 162, 192, #4d56

const ChatItem = ({
  role,
  content,
}: {
  role: "system" | "user" | "assistant";
  content: string;
}) => {
  // const messageBlocks = extractCodeBlocksFromString(content);
  const auth = useAuth();
  // const userInitials = auth?.user?.name? auth.user.name.split(" ").reduce((acc, part) => acc + part[0], "")
  //     : "";

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "rgb(0, 110, 138)",
        my: 2,
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{content}</Typography>
        {/* {messageBlocks.length === 0 && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks.map((block, index) => (
          <SyntaxHighlighter key={index} style={coldarkDark} language="python">
            {block}
          </SyntaxHighlighter>
        ))} */}
      </Box>
    </Box>
  ) : (
    //user displayed chats
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "rgb(113, 31, 115, .8)",
        gap: 2,
        my: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "whitesmoke", p: 1 }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
