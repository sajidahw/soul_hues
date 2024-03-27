/* Page view for chats */

import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import purple from "@mui/material/colors/purple";
import blue from "@mui/material/colors/blue";
import { IoMdSend } from "react-icons/io";
import {
  getUserChats,
  sendChatRequest,
  deleteUserChats,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ImageGenerator from "../components/image/imageGenerator";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null); // manipulate DOM or w/o rerendering
  const auth = useAuth();

  const [chatMessages, setChatMessages] = useState<Message[]>([]); // place here if not null

  const handleSubmit = async () => {
    // used with onClick for IconButton

    // get data from inputRef
    // console.log(inputRef.current?.value);
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    } // clears input after user submits

    // defined var: type
    const newMessage: Message = { role: "user", content };

    // new message stored inside Message[]
    setChatMessages((prevMessages) => [...prevMessages, newMessage]); // ...to clone/combine objects
    // console.log(setChatMessages);

    // send API request to backend with new msg
    const chatData = await sendChatRequest(content);
    // console.log(chatData);
    // updating & consolidating chatMessages
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting chat history...", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("All wiped!! No chat history.", { id: "deletechats" }); //deleted chat history
    } catch (err) {
      console.log(err);
      toast.error("Error in deleting chat history", { id: "deletechats" });
    }
  };

  // used once to load chat history
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading chat history...", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded Chat history!", {
            id: "loadchats",
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error in loading chat history", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%", //100%
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            //sidebar box
            display: "flex",
            width: "100%",
            height: "80vh", //80vh, 101vh
            bgcolor: "rgb(33, 51, 117)",
            borderRadius: 7,
            flexDirection: "column",
            flex: 4,
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "rgb(40, 18, 46)", //black
              color: "rgb(250, 203, 122)", //white
              fontWeight: 700,
              p: 1,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>

          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              p: 1,
              my: 1.5,
              fontWeight: 600,
              bgcolor: "rgb(150, 18, 148)",
              borderRadius: 2,
            }}
          >
            Let's discover your personality color and create it into artwork!
          </Typography>

          <Typography sx={{ mx: 2, my: 0 }}>
            <i>Begin by typing:</i>
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              p: 1,
              my: 1, //1.5
              fontWeight: 600,
              bgcolor: "rgb(150, 18, 148)",
              borderRadius: 2,
            }}
          >
            "I want to discover my/[a new] personality color [for today]!
            <br></br>
            <i>OR</i>
            <br></br>
            "I'd like to discover a new personality color."
            <br></br>
            <i>OR</i>
            <br></br>
            "What do you suggest my color should be?"
          </Typography>
          <Typography sx={{ mx: 2, my: 1 }}>You may be asked:</Typography>
          <Typography
            sx={{
              mx: 1,
              my: 1.2,
              fontFamily: "work sans",
              p: 1,
              bgcolor: blue[700],
              borderRadius: 3,
            }}
          >
            Tell me about your favorite activities.
          </Typography>

          <Typography
            sx={{ mx: 1, fontFamily: "work sans", p: 1.5, fontStyle: "italic" }}
          >
            Describe your ideal weekend.
          </Typography>

          <Typography
            sx={{
              mx: 1,
              fontFamily: "work sans",
              p: 1,
              bgcolor: blue[700],
              borderRadius: 3,
            }}
          >
            What do you enjoy doing in your free time?
          </Typography>

          <Typography
            sx={{ mx: 1, fontFamily: "work sans", p: 1.5, fontStyle: "italic" }}
          >
            How do you handle stress?
          </Typography>

          <Typography
            sx={{
              mx: 1,
              fontFamily: "work sans",
              p: 1,
              bgcolor: blue[700],
              borderRadius: 3,
            }}
          >
            What's important for you in friendships?
          </Typography>

          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: 5,
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              // mb: 4,
              bgcolor: purple[700],
              ":hover": { bgcolor: purple.A200 },
            }}
          >
            Erase Conversations
          </Button>
        </Box>
        <ImageGenerator />
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto", // 5
            fontWeight: 700, //600
            backgroundColor: "#dd67b6a8",
            borderRadius: 4,
            width: "52%",
          }}
        >
          My Personality Color App <br></br>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "700",
              // backgroundColor: "#dd67b6a8",
              width: "50%",
              mx: 15,
            }}
          >
            with GPT-4 Turbo
          </Typography>
        </Typography>

        <Box
          sx={{
            //chat conversational box
            width: "100%",
            height: "112vh", //60vh, 80, 86, 112vh
            borderRadius: 3,
            mx: "auto",
            my: 3,
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore; displays all chat messages
            <ChatItem role={chat.role} content={chat.content} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            // padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(75, 32, 52)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Type:  'I want to discover my personality color.'"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "35px", // 10px, 30px, 35px
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
              display: "flex",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white", mx: 1 }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
// pale yellow: 249, 250, 195
// oryell: 250, 230, 187
// peach orange: 250, 203, 122
// royal blue: 48, 73, 161
