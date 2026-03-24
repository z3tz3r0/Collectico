import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteColor {
    text?: string;
    grayText?: string;
    brown?: string;
    gray?: string;
    blue?: string;
    charcoal?: string;
    darkCocoa?: string;
    softGray?: string;
    hoverText?: string;
    bgButton?: string;
    cream?: string;
    darkCream?: string;
    fontGray?: string;
    backgroundImgae?: string;
    buttonUpImage?: string;
    buttonUpImageHover?: string;
    inputBorder?: string;
    formRegister?: string;
    mainSectionRegister?: string;
    headerRegister?: string;
    lightBrown?: string;
    chocolate?: string;
    lightChocolate?: string;
  }

  interface SimplePaletteColorOptions {
    text?: string;
    grayText?: string;
    brown?: string;
    gray?: string;
    blue?: string;
    charcoal?: string;
    darkCocoa?: string;
    softGray?: string;
    hoverText?: string;
    bgButton?: string;
    cream?: string;
    darkCream?: string;
    fontGray?: string;
    backgroundImgae?: string;
    buttonUpImage?: string;
    buttonUpImageHover?: string;
    inputBorder?: string;
    formRegister?: string;
    mainSectionRegister?: string;
    headerRegister?: string;
    lightBrown?: string;
    chocolate?: string;
    lightChocolate?: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFF",
      text: "#1B1B1B",
      grayText: "#4b5563",
      brown: "#6E5044",
      gray: "#373737",
      blue: "#1e4ae9",
      charcoal: "#4D4D4D",
      darkCocoa: "#4B362D",
      softGray: "#EDEDED",
      hoverText: "#49352a",
      bgButton: "#62483a3b",
      cream: "#f0e0d0",
      darkCream: "#e9e2d6",
      fontGray: "#757575",
      backgroundImgae: "#d9d9d9",
      buttonUpImage: "#667080",
      buttonUpImageHover: "#6670804c",
      inputBorder: "#9f8e84",
      formRegister: "#f9f7f3",
      mainSectionRegister: "#f2eee7",
      headerRegister: "#f8e4d4",
      lightBrown: "#c2a78f",
      chocolate: "#62483a",
      lightChocolate: "#62483acc",
    },
    secondary: {
      main: "#806248",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    body1: {
      fontFamily: "Poppins, sans-serif",
      color: "#1B1B1B",
      fontWeight: "300",
      fontSize: "0.625rem",
      "@media (min-width:600px)": {
        fontSize: "1rem",
      },
    },
    body2: {
      fontFamily: "Poppins, sans-serif",
      color: "#1B1B1B",
      fontWeight: "500",
      fontSize: "0.875rem",
      "@media (min-width:600px)": {
        fontSize: "0.875rem",
      },
    },
    h1: {
      fontFamily: "Aremat, serif",
      color: "#1B1B1B",
      textTransform: "uppercase",
      fontSize: "1.25rem",
      "@media (min-width:600px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontFamily: "Aremat, serif",
      color: "#1B1B1B",
      textTransform: "uppercase",
      fontSize: "1.25rem",
      "@media (min-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    h3: {
      fontFamily: "Aremat, serif",
      color: "#1B1B1B",
      fontSize: "1rem",
      "@media (min-width:600px)": {
        fontSize: "1.25rem",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "9999px",
          height: "28px",
          fontWeight: 600,
          fontSize: "12px",
          "@media (min-width:600px)": {
            height: "42px",
            fontSize: "16px",
          },
        },
      },
    },
  },
});

export default theme;
