import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

function BreadcrumbsNav({ links, currentPage }) {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 4, color: "#b89b85" }}
    >
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          style={{ color: "#b89b85", textDecoration: "none" }}
        >
          {link.label}
        </Link>
      ))}
      <Typography color="#5c3c2e">{currentPage}</Typography>
    </Breadcrumbs>
  );
}

export default BreadcrumbsNav;
