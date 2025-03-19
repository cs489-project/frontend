import { useState } from "react";
import { AppBar, Toolbar, Tabs, Tab, IconButton, Menu, MenuItem, Typography, Box, Avatar } from "@mui/material";
import ApartmentIcon from '@mui/icons-material/Apartment';
import OrgProfile from "../components/OrgProfile";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function OrgDashboard() {
    const location = useLocation();
    const tabPaths = ["/org/dashboard/overview", "/org/dashboard/create-edit", "/org/dashboard/submissions"];
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [orgProfile, setOrgProfile] = useState(false);
    const currentTab = tabPaths.findIndex(path => location.pathname.startsWith(path));

    const handleProfileClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTabChange = (_e: never, value: number) => {
        navigate(tabPaths[value]); // Navigate to new tab path
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <OrgProfile open={orgProfile} onClose={() => setOrgProfile(false)} />
            <AppBar position="fixed">
                <Toolbar>
                    <Tabs value={currentTab} onChange={handleTabChange} textColor="inherit" indicatorColor="primary">
                        <Tab label="Overview" />
                        <Tab label="Create/Edit" />
                        <Tab label="Submissions" />
                    </Tabs>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography>Welcome back, Company Name</Typography>
                    <IconButton color="inherit" onClick={handleProfileClick} size="large">
                        <Avatar>
                            <ApartmentIcon />
                        </Avatar>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => setOrgProfile(true)}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <div style={{ flexGrow: 1 }}>
                <Outlet />
            </div>
        </Box>
    );
}
