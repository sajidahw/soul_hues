// shared component for input fields

// import React from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// to override the customized input field selection's color; embed during return
const theme = createTheme({
  palette: {
    primary: {
      main: "#f5d3a9", // light orange
    },
  },
}); // index.css now overshadowing this via class

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        margin="normal"
        InputLabelProps={{ style: { color: "white" } }}
        name={props.name}
        type={props.type}
        label={props.label}
        inputProps={{
          style: {
            width: "400px",
            borderRadius: 20,
            fontSize: 20,
            color: "white",
          },
        }}
      />
    </ThemeProvider>
  );
};

export default CustomizedInput;
