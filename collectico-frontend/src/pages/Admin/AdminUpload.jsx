import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, TextField, Typography } from "@mui/material";

import details from "/newAsset/svg/details.svg";
import arts from "/newAsset/svg/arts.svg";
import settings from "/newAsset/svg/settings.svg";

export default function AdminUpload() {
  const [tabValue, setTabValue] = useState("1");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = () => {
    
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
            TabIndicatorProps={{
              style: { backgroundColor: "#6E5044" }, // ✅ Custom color for indicator line
            }}
            sx={{
              "& .MuiTab-root": { color: "primary.grayText" },
              "& .Mui-selected": { color: "primary.text" },
            }}
            aria-label="lab API tabs example"
          >
            <Tab
              label={
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <Box component="img" src={details} width={36} height={36} />
                  <Typography variant="body2">Details</Typography>
                </Box>
              }
              value="1"
            />
            <Tab label={
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <Box component="img" src={arts} width={36} height={36} />
                  <Typography variant="body2">Arts</Typography>
                </Box>
              } value="2" />
            <Tab label={
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <Box component="img" src={settings} width={36} height={36} />
                  <Typography variant="body2">Settings</Typography>
                </Box>
              } value="3" />
          </TabList>
        </Box>
        {/* First Tab */}
        <TabPanel value="1">
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="body2" component="label" htmlFor="title">
                    Title
                </Typography>
                <TextField
                    id="title"
                    placeholder="e.g. Sunset Boulevard"
                    variant="outlined"
                    label=""
                    InputLabelProps={{ shrink: false }}
                />
            </Box>
            <Button type="submit" variant="contained">Publish Art</Button>
          </Box>
        </TabPanel>
        {/* Second Tab */}
        <TabPanel value="2">Item Two</TabPanel>
        {/* Third Tab */}
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
