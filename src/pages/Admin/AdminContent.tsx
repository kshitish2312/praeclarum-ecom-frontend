import { Box, Typography } from "@mui/material";
import AdminProducts from "./Products/AdminProducts";

const AdminContent = ({ selectedSection }: { selectedSection: string }) => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4">{selectedSection}</Typography>
      {selectedSection === "Products" ? <AdminProducts /> : <Typography>This is the {selectedSection} section.</Typography>}
    </Box>
  );
};

export default AdminContent;
