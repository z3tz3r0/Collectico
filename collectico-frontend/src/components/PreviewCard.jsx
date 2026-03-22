import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import ButtonSubmit from "./ButtonSubmit";

export default function PreviewCard({
  elevation = 4,
  image = "https://i.pinimg.com/736x/4f/b8/95/4fb8951ee4abaaf4f159d9db98718bfa.jpg",
  title = "Portrait Painting",
  artist = "By AAA BBB",
  price = 450,
  auction,
  minBidPrice = 1000,
  days = 2,
  hours = 4,
  min = 0,
  dimensions,
  material,
  yearCreated,
  tags,
  description,
}) {
  return (
    <Card
      elevation={elevation}
      sx={{
        width: {xs: '270px', sm:'400px'},
        color: "primary.chocolate",
        borderRadius: 2,
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
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          "&:hover": {
            backgroundColor: "#62483a12",
          },
        }}
      >
        {/* Auction status */}
        {auction && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              padding: 1,
              borderRadius: 1,
              border: "3px solid",
              borderColor: "primary.text",
              backgroundColor: "#62483a7f",
              color: "white",
              fontWeight: 700,
            }}
          >
            AUCTION
          </Box>
        )}
        {/* Time Remaining */}
        {auction && (
          <Box
            sx={{
              position: "absolute",
              top: 230,
              right: 10,
              paddingX: 1,
              borderRadius: 1,
              border: "3px solid",
              borderColor: "primary.text",
              backgroundColor: "#62483a7f",
              color: "white",
              fontWeight: 700,
            }}
          >
            {days} days {hours} hrs {min} min left
          </Box>
        )}

        {/* Product Picture */}
        <CardMedia
          sx={{ width: "100%", height: 280, borderTopRadius: 2 }}
          image={image}
          title="auction"
        />

        {/* Product Content */}
        <CardContent
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <Stack>
            <Typography sx={{ fontSize: {xs: '1.12rem', sm:'1.4rem'}, fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography sx={{ fontSize: {xs: '0.9rem', sm:'0.97rem'}, py: "9px" }}>
              By {artist}
            </Typography>

            {/* Fixed Price */}
            {price && (
              <Typography sx={{ fontSize: {xs: '1.1rem', sm:'1.35rem'} }}>
                $
                {Number(price).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </Typography>
            )}

            {/* Auction */}
            {minBidPrice && (
              <Typography sx={{ fontSize: "1.13rem" }}>
                Starting Price: $
                {Number(minBidPrice).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </Typography>
            )}
          </Stack>

          {/* DESCRIPTION */}
          <Paper
            elevation="4"
            sx={{
              padding: "12px",
              color: "primary.main",
              bgcolor: "#f0e0d070",
              marginY: "3px",
            }}
          >
            <Typography sx={{ fontWeight: "600" }}>Description: </Typography>
            <Typography sx={{whiteSpace: "normal", wordBreak: "break-word"}}>{description}</Typography>
          </Paper>

          {/* Other Detail */}
          <Paper
            elevation="4"
            sx={{
              display: "flex",
              flexDirection: {xs: 'column', sm: 'row'},
              justifyContent: "space-between",
              gap: {xs: '10px', sm: '0px'},
              padding: "12px",
              color: "primary.main",
              bgcolor: "#f0e0d08b",
            }}
          >
            <Stack spacing="3px">
              <Stack direction="row" spacing="4px">
                <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  Dimensions:
                </Typography>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  {dimensions}
                </Typography>
              </Stack>
              <Stack direction="row" spacing="4px">
                <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  Material:
                </Typography>
                <Typography sx={{ fontSize: "0.9rem" }}>{material}</Typography>
              </Stack>
              <Stack direction="row" spacing="4px">
                <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  Year Created:
                </Typography>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  {yearCreated}
                </Typography>
              </Stack>
            </Stack>

            <hr className='text-gray-400 border-2 opacity-30' />

            {/* Tags */}
            <Stack  spacing="3px">
              <Typography sx={{ fontSize: "0.9rem", fontWeight: "600" }}>
                Tags
              </Typography>
              {tags.map((tag) => {
                return (
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    {tag.title}
                  </Typography>
                );
              })}
            </Stack>
          </Paper>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
