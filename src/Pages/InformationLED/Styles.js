import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const infoStyles = {
  width: "100%",
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: 1.5,
    borderColor: "#fff",
    borderRadius: 5,
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
};

export const CarouselInformations = styled(Box)(({ theme }) => ({
  width: "100%",
  height: `${window.innerHeight / 2 - 60}px`,
}));
