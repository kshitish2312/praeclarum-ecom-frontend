import { Box } from "@mui/material";
import AdminSidebar from "./AdminSideBar";
import AdminContent from "./AdminContent";
import { useState } from "react";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Dashboard");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Main Content Below Header */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <AdminSidebar onSelect={setSelectedSection} />
        <AdminContent selectedSection={selectedSection} />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
