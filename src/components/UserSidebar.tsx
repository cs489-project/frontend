import { useState, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import InboxIcon from "@mui/icons-material/Inbox";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const drawerWidth = 280;

interface UserSidebarProps {
  selectedItem: string;
  onSelectItem: (item: string) => void;
}

export default function UserSidebar({ selectedItem, onSelectItem }: UserSidebarProps) {
  const profileRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { text: "Opportunities", icon: <TrackChangesIcon />, badge: 0 },
    { text: "Inbox", icon: <InboxIcon />, badge: 5 },
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
          paddingTop: 0,
          border: "none",
          borderRight: "1px solid #eaecef",
          boxShadow: "0 0 20px rgba(0,0,0,0.03)",
          background: "#FFFFFF",
          borderRadius: 0,
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 2, py: 1.5, mb: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer"
          }}
          onClick={() => onSelectItem("Opportunities")}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "8px",
              background: "linear-gradient(135deg, #3B82F6, #2563EB)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrackChangesIcon sx={{ color: "#fff", fontSize: "1.1rem" }} />
          </Box>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            sx={{
              fontSize: "0.95rem",
              color: "#111827",
            }}
          >
            ByteBreakers
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#eaecef", mb: 1.5 }} />

      {/* Navigation */}
      <Box sx={{ px: 2 }}>
        <List sx={{ p: 0 }}>
          {navItems.map(({ text, icon, badge }) => (
            <ListItem key={text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => onSelectItem(text)}
                selected={text === selectedItem}
                sx={{
                  height: "40px",
                  borderRadius: "6px",
                  transition: "all 0.2s ease",
                  px: 1.5,
                  "&.Mui-selected": {
                    backgroundColor: "#F3F4F6",
                    "& .MuiListItemText-primary": {
                      color: "#111827",
                      fontWeight: 600
                    },
                    "& .MuiListItemIcon-root": {
                      color: "#111827"
                    },
                  },
                  "&:hover": {
                    backgroundColor: "#F9FAFB",
                  },
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ListItemIcon
                    sx={{
                      color: text === selectedItem ? "#111827" : "#6B7280",
                      minWidth: 32,
                      mr: 0,
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.875rem",
                        color: text === selectedItem ? "#111827" : "#4B5563",
                      }
                    }}
                  />
                </Box>

                {badge > 0 && text === "Inbox" && (
                  <Badge
                    badgeContent={badge}
                    sx={{
                      mr: 0.5,
                      "& .MuiBadge-badge": {
                        fontSize: "0.65rem",
                        height: 18,
                        minWidth: 18,
                        paddingRight: "8px",
                        paddingLeft: "8px",
                        borderRadius: "9px",
                        backgroundColor: "#3B82F6",
                        color: "white",
                        fontWeight: 500,
                      }
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ borderColor: "#eaecef", mt: "auto", mb: 0 }} />

      <Box
        ref={profileRef}
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1.5,
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: "#F9FAFB",
          },
        }}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-controls="profile-menu"
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : "false"}
      >
        <Avatar
          src="/path-to-avatar.jpg"
          sx={{
            width: 36,
            height: 36,
            mr: 1.5,
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            fontWeight="500"
            fontSize="0.875rem"
            lineHeight={1.25}
            noWrap
            sx={{ color: "#111827" }}
          >
            John Doe
          </Typography>
          <Typography
            fontSize="0.75rem"
            color="text.secondary"
            lineHeight={1.25}
            noWrap
          >
            john@email.com
          </Typography>
        </Box>
        <IconButton size="small" sx={{ ml: 0.5 }}>
          <MoreVertIcon fontSize="small" sx={{ color: "#9CA3AF" }} />
        </IconButton>
      </Box>

      {/* Profile Menu */}
      <Menu
        id="profile-menu"
        anchorEl={profileRef.current}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        slotProps={{
          paper: {
            elevation: 2,
            sx: {
              width: 200,
              borderRadius: 2,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              "& .MuiMenuItem-root": {
                fontSize: "0.875rem",
                py: 1.2,
                fontWeight: 400,
              },
            },
          }
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        marginThreshold={0}
        sx={{
          "& .MuiMenu-paper": {
            ml: 1, // Add margin so it doesn't touch the sidebar
          }
        }}
      >
        <MenuItem onClick={() => { setMenuOpen(false); onSelectItem("Settings"); }}>
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="small" sx={{ color: "#4B5563" }} />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={() => { setMenuOpen(false); /* TODO: Handle logout */; }}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" sx={{ color: "#EF4444" }} />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </Drawer>
  );
}
