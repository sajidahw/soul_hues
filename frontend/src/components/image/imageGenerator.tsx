// //ImageGenerator.tsx: React component for generating images from text prompts using DALL-E 3 API

import React, { useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const ImageGenerator = () => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null); // manipulate DOM for text input or w/o rerendering, HTMLInputElement
  const [generatedImage, setGeneratedImage] = useState("");

  const handleImageGeneration = async () => {
    const imagePrompt = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    } // clears input after user submits
    if (imagePrompt) {
      try {
        toast.loading("Generating image from mood colors...");
        const response = await axios.post("/images/get-image", {
          //get-image is inner folder dump (browser)
          prompt: imagePrompt, // needed key:value pair here to redirect
        });

        const image_url = response.data.image; // removed [0] bc of image-controllers.ts sent as
        //extracted to var as indiv obj & not [] element
        setGeneratedImage(image_url);
        window.open(image_url, "_blank", "noreferrer"); // opens up in a new pop up window
        toast.dismiss();
        toast.success("Your watercolor painting is on it's way!");
      } catch (error) {
        toast.dismiss();
        toast.error("Failed to generate an image.");
        console.error("Error generating image:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "auto", //100%
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
            display: "flex",
            width: "100%",
            height: "25vh", //80vh
            bgcolor: "rgb(33, 51, 117)", //blue
            borderRadius: 5,
            flexDirection: "column",
            flex: 4,
            mx: 3,
            my: 3,
            p: 1,
          }}
        >
          <Typography
            sx={{
              mx: 1,
              fontFamily: "work sans",
              p: 1,
              fontWeight: 600,
              bgcolor: "rgb(150, 18, 97)",
              borderRadius: 2,
            }}
          >
            ALLOW browser pop ups
          </Typography>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              width: "100%",
              height: "100%",
              mt: 3,
              gap: 1,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "90%",
                // padding: "20px",
                borderRadius: 8,
                backgroundColor: "rgb(105, 38, 13)", //dark orange
                //"rgb(150, 18, 148)",//light purple
                //   backgroundColor: "rgb(75, 32, 52)",
                display: "flex",
                margin: "auto",
                border: "solid white",
              }}
            >
              {/* <TextField
                inputRef={inputRef}//ref if input
                name="imagePrompt"
                type="text"
                label="Enter description for image"
                variant="outlined"
                fullWidth
                margin="normal" */}
              <textarea
                // height={"50 px"} //for input instead of textarea
                // width={"100%"} //input
                rows={6}
                cols={50}
                // wrap="soft"
                ref={inputRef}
                // type="text" // input
                placeholder="Paste description HERE for AI image generation by DALL-E..."
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  //   padding: "1px", // 10px, 50px
                  //   border: "1px solid white",
                  borderRadius: 7,
                  outline: "none",
                  color: "white",
                  fontSize: "13px", //20px
                  textAlign: "left",
                  border: "none",
                  padding: 2,
                }}
              />
            </div>
          </Box>
          <Button
            onClick={handleImageGeneration}
            sx={{
              width: "200px",
              my: 2,
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: "rgb(247, 7, 199)",
              ":hover": { bgcolor: "rgb(247, 99, 220)" },
            }} //245, 86, 215
          >
            Generate Image
          </Button>

          {generatedImage && (
            <Box mt={2} sx={{ display: "flex", p: 2, mx: "auto", my: "auto" }}>
              <img
                src={generatedImage}
                alt="AI Generated Image"
                style={{ maxWidth: "100%", borderRadius: 3 }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ImageGenerator;
