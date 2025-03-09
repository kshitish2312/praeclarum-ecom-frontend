import { useState } from "react";
import { List, ListItem, ListItemText, Drawer } from "@mui/material";

const sections = ["Dashboard", "Products", "Orders", "Users"];

const AdminSidebar = ({
  onSelect,
}: {
  onSelect: (section: string) => void;
}) => {
  const [activeSection, setActiveSection] = useState("Dashboard"); // Default active section

  const handleSelect = (section: any) => {
    setActiveSection(section);
    onSelect(section);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          top: "64px",
        },
      }}
    >
      <List>
        {sections.map((text, index) => (
          <>
            <ListItem
              key={`${text}-${index}`}
              onClick={() => handleSelect(text)}
              sx={{
                cursor: "pointer",
                bgcolor:
                  activeSection === text ? "primary.main" : "transparent",
                color: activeSection === text ? "white" : "black",
                borderRadius: 1,
                "&:hover": { bgcolor: "primary.light" },
              }}
            >
              <ListItemText primary={text} />
            </ListItem>
          </>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
