import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

export default function CollectionCardLanding({
  widthPerCent = "550%",
  maxWidth = 345,
  image1 = "",
  name = "",
  detail = "Explore Collection.",
  linkURL = "https://www.google.com/",
  altDetail = "",
  prices = false,
  minHeightImage = "350px",
  ...prop
}) {
  const pricesValue = Number(prices);
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: widthPerCent },
        minWidth: { xs: "100%", sm: 320 },
        maxWidth: maxWidth,
        minHeight: 300,
        height: "350px",
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        "&:hover .cardImage": {
          transform: "scale(1.1)",
          transition: "transform 0.7s",
          objectFit: "cover",
        },
        "&:hover .cardDetail": { opacity: { sm: 1 } },
        ...prop,
      }}
    >
      <Link to={linkURL}>
        <CardActionArea sx={{ height: "100%", position: "relative" }}>
          <Box
            sx={{ height: "100%", overflow: "hidden", position: "relative" }}
          >
            <CardMedia
              component="img"
              image={image1}
              alt={altDetail}
              className="cardImage"
              sx={{
                width: "100%",
                height: "100%",
                minHeight: { xs: "auto", sm: minHeightImage },
                objectFit: "cover",
              }}
            />

            <CardContent
              className="cardDetail"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                background: {
                  sm: "linear-gradient(to top, #62483ac4, transparent)",
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                opacity: 0,
                transition: "opacity 0.3s",
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ color: "#ffffff", fontWeight: "bold", mb: "16px" }}
              >
                {name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", mb: "16px" }}>
                By {detail}
              </Typography>
              {pricesValue && (
                <Typography
                  variant="body2"
                  sx={{ color: "#ffffff", mb: "16px" }}
                >
                  $
                  {pricesValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </Typography>
              )}
            </CardContent>
          </Box>
        </CardActionArea>
      </Link>
    </Card>
  );
}
