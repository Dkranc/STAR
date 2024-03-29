import { createTheme } from "@mui/material";

export const themeLogin = createTheme({
  typography: {
    fontFamily: `"Assistant-Bold","Assistant-Regular", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    text: {
      primary: "rgb(0,0,0)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "rgb(245,255,255)",
          backgroundImage: `linear-gradient(71deg, rgba(245,255,255,1) 47%, rgba(173,225,229,1) 100%)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "100%",
        },
      },
    },
  },
});

export const themeLight = createTheme({
  typography: {
    fontFamily: `"Assistant-Bold","Assistant-Regular", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    color: "#000000",
  },
  components: {
    overrides: {
      MuiButton: {
        label: {
          color: "#rgb(255,255,255)",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F3F3F3",
        },
      },
    },
  },
  palette: {
    text: {
      primary: "rgb(0,0,0)",
    },
  },
});

export const themeDark = createTheme({
  MuiButton: {
    root: {
      color: "white",
      backgroundColor: "black",
    },
    style: {
      color: "white",
      backgroundColor: "black",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "rgb(0,0,0)",
        },
      },
    },
  },
  palette: {
    text: {
      primary: "#ffffff",
    },
  },
});
