import { Avatar, Paper, Rating, Typography, Stack } from "@mui/material";
import React from "react";
import StarRounded from "@mui/icons-material/StarRounded";
import StarOutlineRounded from "@mui/icons-material/StarOutlineRounded";

export default function ReviewCard({ star, text, profilePic, name, position }) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: { xs: "100%", sm: "400px" },
        gap: 2,
        px: 2,
        py: 3,
        backgroundColor: "primary.white",
        color: "primary.lightBrown",
        borderRadius: "0.5rem",
        "&:hover": {
          transform: "scale(1.03)",
          transition: "all 300ms ease-in-out",
        },
        transition: "all 300ms ease-in-out",
      }}
      elevation={3}
    >
      <Rating
        sx={{ color: "#C2A78F", fontSize: "28px" }}
        icon={<StarRounded fontSize="inherit" />}
        emptyIcon={<StarOutlineRounded fontSize="inherit" />}
        defaultValue={star}
        readOnly
      />
      <Typography
        sx={{
          width: "100%",
          fontStyle: "italic",
          fontSize: "0.95rem",
          whiteSpace: "normal",
        }}
      >
        {text}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Avatar
          src={profilePic}
          sx={{ backgroundColor: "primary.lightBrown" }}
        />
        <Stack>
          <Typography sx={{ fontWeight: "600", color: "primary.chocolate" }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: "0.95rem" }}>{position}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
