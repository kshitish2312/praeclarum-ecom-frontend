import { Link } from "react-router-dom";
import { Container, Typography } from "@mui/material";

function NotFound() {
  return (
    <Container sx={{ textAlign: "center", mt: 20 }}>
      <Typography variant="h4" color="error">
        404 - Page Not Found
      </Typography>
      <Link to="/">Go Home</Link>
    </Container>
  );
}

export default NotFound;
