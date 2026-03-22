import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import React from "react";
import RemainingBlock from "./RemainingBlock";
import { Link } from "react-router-dom";

export default function AuctionCard({
  elevation = 5,
  image,
  title,
  artist,
  price,
  linkUrl,
  width = 320,
  height = 510,
  timeLeft=5000,
}) {
  return (
    <Link to={linkUrl}>
      <Card
        elevation={elevation}
        sx={{
          minWidth: { xs: 270, sm: 330 },
          width: { xs: 270, sm: width },
          height: { xs: 350, sm: height },
          minHeight: { xs: 500, sm: 500 },

          color: "primary.chocolate",
          overflow: "visible",
          borderRadius: "12px",
          "&:hover": {
            transform: "scale(1.02)",
            transition: "all 300ms ease-in-out",
          },
          transition: "all 300ms ease-in-out",
        }}
      >
        <CardActionArea
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            height: "100%",
            width: "100%",
            "&:hover": { backgroundColor: "#62483a12" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              padding: 1,
              borderRadius: 1,
              backgroundColor: "primary.chocolate",
              color: "white",
              fontWeight: 700,
            }}
          >
            LIVE
          </Box>
          <CardMedia
            sx={{
              width: "100%",
              height: 310,
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
            image={image}
            title="auction"
          />
          <CardContent sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: { xs:"1.18rem", sm:"1.4rem"}, fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography gutterBottom sx={{ fontSize: { xs:"0.91rem", sm:"1.1rem"} }}>
              By {artist}
            </Typography>
            <Typography sx={{ fontSize: "1.35rem" }}>
              $
              {Number(price).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Typography>
          </CardContent>

          {/* REMAINING BLOCK */}
          <Box sx={{ position: "absolute", bottom: { xs:10, sm:15 }, left: { xs:-50, sm:10} }}>
            <RemainingBlock timeLeft={timeLeft} />
          </Box>
        </CardActionArea>
      </Card>
    </Link>
  );
}
