import defaultTheme from "./default";

import { createTheme } from "@mui/material";

const overrides = {
  typography: {
    fontFamily: ['"Montserrat"', "sans-serif"],
    fontSize: 12,
    fontWeightRegular: 600,
  },
};

export default {
  default: createTheme({ ...defaultTheme, ...overrides }),
};
