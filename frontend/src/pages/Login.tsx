import { Box, Typography, Button } from "@mui/material";
import React from "react";
import CustomizedInput from "../components/shared/CustomizedInput"; // to use shared input field
import { MdOutlineLogin } from "react-icons/md"; // login button icon
import { toast } from "react-hot-toast"; // to show notifications
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const auth = useAuth();
  // using form data w/o handling state
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent refreshing page from submitting
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // console.log(email, password); // to check if form data is being captured
    // will show notifications via Hot Toast
    try {
      toast.loading("Logging in...", { id: "login", icon: "🔑" });
      await auth?.login(email, password);
      toast.success("Logged in successfully!", { id: "login" });
    } catch (err) {
      console.log(err);
      toast.error("Uhoh, unable to login!", { id: "login" });
    }
  };
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img
          src="/sh_login.png"
          alt="Emotions with Ai"
          style={{ width: "450px", borderRadius: "15px" }} //400px
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
              Login
            </Typography>

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
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
