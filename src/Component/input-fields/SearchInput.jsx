import { InputBase, styled } from "@mui/material";
import SearchIcon from "../../Icons/SearchIcon";
// styled component
const StyledInputBase = styled(InputBase)(({
  theme,
  bordered
}) => ({
  height: 40,
  fontSize: 16,
  width: "100%",
  maxWidth: 350,
  fontWeight: 500,
  padding: "0 1rem",
  borderRadius: "8px",
  color: theme.palette.text.primary,
  // backgroundColor: theme.palette.background.paper,
  border: bordered ? `1px solid ${theme.palette.action.disabled}` : "none",
  [theme.breakpoints.down(500)]: {
    maxWidth: "100%"
  },
  "::placeholder": {
    color: theme.palette.text.disabled
  }
})); // ------------------------------------------------------------

// ------------------------------------------------------------
const SearchInput = props => {
  const {
    icon_style = {},
    bordered = true
  } = props;
  return <StyledInputBase bordered={bordered ? 1 : 0} startAdornment={<SearchIcon sx={{
    fontSize: 18,
    marginRight: 1,
    color: "#7E8299",
    ...icon_style
  }} />} {...props} />;
};

export default SearchInput;