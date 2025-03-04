import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import InboxIcon from "@mui/icons-material/Inbox";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

const drawerWidth = 240;

export default function Sidebar({ selectedItem, onSelectItem }) {
  const navItems = [
    { text: "Opportunities", icon: <TrackChangesIcon /> },
    { text: "Inbox", icon: <InboxIcon /> },
    { text: "Leaderboard", icon: <LeaderboardIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          paddingTop: "8px",
        },
      }}
    >
      {/* Main Navigation */}
      <List sx={{ px: 1 }}>
        {navItems.map(({ text, icon }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => onSelectItem(text)}
              selected={text === selectedItem}
              sx={{
                height: "42px",
                gap: "8px",
                borderRadius: "8px",
                mb: 0.5,
                "&.Mui-selected": {
                  backgroundColor: "#f0f0f5",
                  "& .MuiListItemText-primary": { fontWeight: "bold" },
                  "& .MuiListItemIcon-root": { color: "black" },
                },
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: text === selectedItem ? "black" : "gray",
                  minWidth: 0,
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  color: text === selectedItem ? "black" : "gray",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* User Profile */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1,
          mt: "auto",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Avatar
          src="/path-to-avatar.jpg"
          sx={{ width: 32, height: 32, mr: 1.5 }}
        />
        <Box py={"4px"}>
          <Typography
            fontWeight="bold"
            fontSize="0.875rem"
            align="left"
            lineHeight={1.25}
          >
            John Doe
          </Typography>
          <Typography
            fontSize="0.75rem"
            color="text.secondary"
            align="left"
            lineHeight={1.25}
          >
            john@email.com
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
