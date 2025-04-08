import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B8B", 
      light: "#FF8FA3",
      dark: "#FF4757",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFB8B8", 
      light: "#FFD3D3",
      dark: "#FF9E9E",
    },
    background: {
      default: "#FFF5F5", 
      paper: "#FFFFFF", 
    },
    text: {
      primary: "#5A3A3A", 
      secondary: "#8B5D5D", 
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: {
      fontWeight: 600,
      color: "#5A3A3A",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          padding: "10px 20px",
          boxShadow: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(255, 107, 139, 0.3)",
            transform: "translateY(-1px)",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #FF6B8B 0%, #FF8FA3 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #FF4757 0%, #FF6B8B 100%)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "& fieldset": {
              borderColor: "#FFD3D3",
            },
            "&:hover fieldset": {
              borderColor: "#FF8FA3",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FF6B8B",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#8B5D5D",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#FF6B8B",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(255, 107, 139, 0.1)",
          border: "1px solid #FFE5E5",
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPaginationItem-root": {
            color: "#8B5D5D",
            "&.Mui-selected": {
              backgroundColor: "#FF6B8B",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#FF4757",
              },
            },
            "&:hover": {
              backgroundColor: "#FFE5E5",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFD3D3",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FF8FA3",
          },
        },
      },
    },
  },
});