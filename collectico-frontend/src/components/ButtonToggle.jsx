import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";

export default function ButtonToggle({ label1, label2, label3 ,showPending, showOnGoing , showCompleted }) {
  const [value, setValue] = useState("pending");   //to change color of active button
 

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
    };

    switch (newValue) {
      case "pending":
        showPending();
        break;
      case "ongoing":
        showOnGoing();
        break;
      case "completed":
        showCompleted();
        break;
      default:
        break;
    }
  }
  return (
    <div>
      <ToggleButtonGroup  sx={{height: "42px",}} value={value} exclusive onChange={handleChange}>
        <ToggleButton
          value="pending"
          sx={{
            color: "primary.main", // default text color
            "&.Mui-selected": {
              backgroundColor: "primary.main", // selected background
              color: "white", // selected text color
              "&:hover": {
                backgroundColor: "primary.dark", // hover when selected
              },
            },
          }}
        >
          {label1}
        </ToggleButton>
        <ToggleButton
          value="ongoing"
          sx={{
            color: "primary.main", // default text color
            "&.Mui-selected": {
              backgroundColor: "primary.main", // selected background
              color: "white", // selected text color
              "&:hover": {
                backgroundColor: "primary.dark", // hover when selected
              },
            },
          }}
        >
          {label2}
        </ToggleButton>
        <ToggleButton
          value="completed"
          sx={{
            color: "primary.main", // default text color
            "&.Mui-selected": {
              backgroundColor: "primary.main", // selected background
              color: "white", // selected text color
              "&:hover": {
                backgroundColor: "primary.dark", // hover when selected
              },
            },
          }}
        >
          {label3}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
