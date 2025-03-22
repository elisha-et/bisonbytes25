import { createTheme } from "@mui/material";

const Theme = createTheme({
    palette: {
        mintGreen: {
            light: "#86CB92",
            main: "#71B48D",
            dark: "#404E7C",
            contrastText: "#fff"
        },

        navyBlue: {
            main: "#283044",
            contrastText: "#fff"
        }
    },

    typography: {
    },
});

export default Theme;
