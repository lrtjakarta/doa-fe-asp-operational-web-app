import * as React from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import useStyles from "./Styles";

import { Link } from "react-router-dom";

const TabGreen = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: "linear-gradient(to left bottom, #068341, #005A2B)";
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #f2f2f2;
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #079b4d;
    color: #fff;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// tab blue
const TabBlue = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: #e0e0e0;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #f2f2f2;
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #5a6eff;
    color: #fff;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// tab red
const TabRed = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: #e0e0e0;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #f2f2f2;
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #ed1c24;
    color: #fff;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

export default function UnstyledTabsCustomized() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <Typography align="center" className={classes.mainTxt}>
        BERDASARKAN PEMERIKSAAN DIATAS, YANG BERSANGKUTAN DINYATAKAN
      </Typography>
      <TabsUnstyled defaultValue={0}>
        <TabsList>
          <TabGreen>
            <Typography className={classes.tabTxt}>FIT TO WORK</Typography>
          </TabGreen>
          <TabBlue>
            <Typography className={classes.tabTxt}>
              FIT TO WORK WITH NOTE
            </Typography>
          </TabBlue>
          <TabRed>
            <Typography className={classes.tabTxt}>UNFIT TO WORK</Typography>
          </TabRed>
        </TabsList>
        <TabPanel value={0}></TabPanel>
        <TabPanel value={1}>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Tulis catatan disini "
            sx={{ width: "99%", mt: 1 }}
            style={{ color: "#5a6eff" }}
            InputProps={{ disableUnderline: true }}
            fullWidth
          />
        </TabPanel>
        <TabPanel value={2}>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Tulis catatan disini "
            sx={{ width: "100%", mt: 1 }}
            InputProps={{ disableUnderline: true }}
            fullWidth
          />
        </TabPanel>
      </TabsUnstyled>
      <Box sx={{ mt: 0, mb: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          sx={{
            color: "#BB7E36",
            bgcolor: "#f2f2f2",
            border: 0.5,
            width: "30%",
            mr: 3,
            mt: 3,
            "&:hover": {
              backgroundColor: "#BB7E36",
              color: "#fff",
              border: "none",
            },
          }}
        >
          Cancel
        </Button>
        <Link to="/hasil" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              color: "#BB7E36",
              bgcolor: "#f2f2f2",
              border: 0.5,
              width: "30%",
              mr: 3,
              mt: 3,
              "&:hover": {
                backgroundColor: "#BB7E36",
                color: "#fff",
                border: "none",
              },
            }}
          >
            Submit
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
