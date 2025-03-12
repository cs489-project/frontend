import { useState } from "react";
import { AppBar, Toolbar, Tabs, Tab, IconButton, Menu, MenuItem, Typography, Box, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import OrgProfile from "../components/OrgProfile";
import OrgPostingList from "../components/OrgPostingList";
import PostingBuilder from "../components/PostingBuilder";

export default function OrgDashboard() {
    const [tabIndex, setTabIndex] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [orgProfile, setOrgProfile] = useState(false);

    const handleTabChange = (_event: any, newValue: number) => {
        setTabIndex(newValue);
    };

    const handleProfileClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <OrgProfile open={orgProfile} onClose={() => setOrgProfile(false)} />
            <AppBar position="static">
                <Toolbar>
                    <Tabs value={tabIndex} onChange={handleTabChange} textColor="inherit" indicatorColor="primary">
                        <Tab label="Overview" />
                        <Tab label="Create" />
                    </Tabs>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="inherit" onClick={handleProfileClick}>
                        <Avatar>
                            <AccountCircleIcon />
                        </Avatar>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => setOrgProfile(true)}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: 2 }}>
                {tabIndex === 0 && <Typography variant="h4"><OrgPostingList /></Typography>}
                {tabIndex === 1 && <Typography variant="h4"><PostingBuilder /></Typography>}
            </Box>
        </Box>
    );
}
