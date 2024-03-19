// import React from "react";

// const Signup = () => {
//   return <div>Signup</div>;
// };

// export default Signup;

import { Box, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import CustomizedInput from "../components/shared/CustomizedInput"; // to use shared input field
import { MdOutlineLogin } from "react-icons/md"; // login button icon
import { toast } from "react-hot-toast"; // to show notifications
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { FaRegAddressCard } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  // using form data w/o handling state
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent refreshing page from submitting
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // console.log(email, password); // to check if form data is being captured
    // will show notifications via Hot Toast
    try {
      toast.loading("Signing Up...", {
        id: "signup",
        icon: <TfiWrite />,
        // icon: <FaRegAddressCard />,
      }); // icon for registration "🔑"
      await auth?.signup(name, email, password);
      toast.success("Signed Up successfully!", { id: "signup" });
    } catch (err) {
      console.log(err);
      toast.error("Uhoh, unable to sign up!", { id: "signup" });
    }
  };
  // redirect user to chat page if already logged in
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box
        padding={8}
        mt={8}
        // mx={6}
        display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img
          className="image-inverted3" // added to circulate
          src="/pointing_hand.png"
          alt="AI hand pointing to signup form"
          style={{
            width: "440px",
            height: "440px",
            borderRadius: "260px",
            border: " 1px solid purple",
          }} //450px, 15px, 300/300
        />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #223e45", //dark teal, #467a87 mid teal, #000 black
            borderRadius: "10px",
            border: "none", //none
            backgroundColor: "rgba(128, 52, 128, 0.8)", // light purple
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign={"center"}
              padding={2}
              fontWeight={600}
            >
              Signup
            </Typography>

            <CustomizedInput type="text" name="name" label="Name:" />
            <CustomizedInput type="email" name="email" label="Email:" />
            <CustomizedInput
              type="password"
              name="password"
              label="Password:"
            />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 10,
                bgcolor: "#3c6873", // mid teal
                color: "#f5d3a9", // light orange
                ":hover": { bgcolor: "#f5d3a9", color: "#3c6873" },
              }}
              endIcon={<MdOutlineLogin />}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
