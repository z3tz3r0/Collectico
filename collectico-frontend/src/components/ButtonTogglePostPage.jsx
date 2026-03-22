import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";

export default function ButtonTogglePostPage({ label1, label2, onClick1, onClick2, toggleValue="auction" }) {
  const [value, setValue] = useState("");   //to change color of active button

  useEffect(() => {
    setValue(toggleValue)
  }, [toggleValue])
  
  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
    }
  };
  return (
    <div>
      <ToggleButtonGroup sx={{height: "42px",}} value={value} exclusive onChange={handleChange}>
        <ToggleButton
          value="fixPrice"
          onClick={onClick1}
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
          value="auction"
          onClick={onClick2}
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
      </ToggleButtonGroup>
    </div>
  );
}