import { createTheme } from "@mui/material";

export const themeLight = createTheme({
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

export const themeDark = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "rgb(0,0,0)",
          backgroundImage: `linear-gradient(71deg, rgba(0,0,0,1) 5%, rgba(33,48,125,1) 100%);`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "100%",
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
