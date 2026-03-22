import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductCard({onDelete, wantDelete=false, elevation, image, title, artist, price, minWidth="300px", width="320px"}) {

  return (
    <Card
      elevation={elevation}
      sx={{
        minWidth: minWidth,
        width: width,
        height: 460,
        color: "primary.chocolate",
        borderRadius: 2,
        overflow: "visible",
      }}
    >
      <CardActionArea>
        {/* Delete Button */}
        {wantDelete && (
          <Stack
            onClick={onDelete}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 20,
              backgroundColor: "primary.text",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "primary.dark", // hover when selected
                color: "primary.text",
              },
            }}
          >
            <IconButton
              aria-label="delete"
              sx={{
                color: "primary.dark",
                "&:hover": {
                  color: "primary.text",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        )}

        <CardMedia
          sx={{ height: 330, borderRadius: 2 }}
          image={image}
          title="auction"
        />
        <CardContent>
          <Typography sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography gutterBottom sx={{ fontSize: "1.1rem" }}>
            {artist}
          </Typography>
          <Typography sx={{ fontSize: "1.35rem" }}>
            ${Number(price).toLocaleString("en-Us", { minimumFractionDigits: 2 })}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
