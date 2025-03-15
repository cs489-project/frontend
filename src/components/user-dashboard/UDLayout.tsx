import { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Breadcrumbs, Link } from "@mui/material";
import UserSidebar from "../UserSidebar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate, useParams, useLocation, Outlet } from "react-router-dom";

interface UDLayoutProps {
  defaultTab?: string;
}

export default function UDLayout({ defaultTab = "Opportunities" }: UDLayoutProps) {
  const [selectedItem, setSelectedItem] = useState(defaultTab);
  const navigate = useNavigate();
  const location = useLocation();
  const { opportunityId } = useParams<{ opportunityId?: string }>();
  const previousTabRef = useRef<string>(defaultTab);

  // Update the selected item when the URL changes
  useEffect(() => {
    if (location.pathname.includes("/user/dashboard/opportunities")) {
      setSelectedItem("Opportunities");
    } else if (location.pathname.includes("/user/dashboard/inbox")) {
      setSelectedItem("Inbox");
    } else if (location.pathname.includes("/user/dashboard/leaderboard")) {
      setSelectedItem("Leaderboard");
    } else if (location.pathname.includes("/user/dashboard/settings")) {
      setSelectedItem("Settings");
    }
  }, [location.pathname]);

  // Save scroll position when changing tabs
  useEffect(() => {
    const mainContentArea = document.getElementById('main-content-area');

    if (mainContentArea && previousTabRef.current !== selectedItem) {
      // Save the scroll position for the previous tab
      sessionStorage.setItem(`scrollPosition_${previousTabRef.current}`, mainContentArea.scrollTop.toString());

      // Update the previous tab reference
      previousTabRef.current = selectedItem;

      // Restore scroll position for the current tab if it exists
      const savedPosition = sessionStorage.getItem(`scrollPosition_${selectedItem}`);
      if (savedPosition && !opportunityId) {
        setTimeout(() => {
          mainContentArea.scrollTop = parseInt(savedPosition, 10);
        }, 0);
      } else {
        // Reset scroll position for new tabs or when viewing opportunity details
        mainContentArea.scrollTop = 0;
      }
    }
  }, [selectedItem, opportunityId]);

  // Function to handle sidebar item selection
  const handleSelectItem = (item: string) => {
    setSelectedItem(item);

    // Update URL based on selected item
    switch (item) {
      case "Opportunities":
        navigate("/user/dashboard/opportunities");
        break;
      case "Inbox":
        navigate("/user/dashboard/inbox");
        break;
      case "Leaderboard":
        navigate("/user/dashboard/leaderboard");
        break;
      case "Settings":
        navigate("/user/dashboard/settings");
        break;
      default:
        navigate("/user/dashboard");
    }
  };

  // Function to handle breadcrumb navigation
  const handleBreadcrumbClick = (path: string) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <UserSidebar selectedItem={selectedItem} onSelectItem={handleSelectItem} />

      {/* Main Content Area */}
      <Box
        id="main-content-area"
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 3,
          bgcolor: "#f9f9fb",
        }}
      >
        <Container sx={{ paddingLeft: 0, paddingRight: 0 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
              mb: 3,
              "& .MuiBreadcrumbs-ol": {
                alignItems: "center"
              }
            }}
          >
            {/* Dashboard is never clickable */}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                fontSize: "0.875rem",
                color: "text.secondary",
                display: "flex",
                alignItems: "center"
              }}
            >
              Dashboard
            </Typography>

            {/* Opportunities is a link when viewing details, otherwise it's the current item */}
            {opportunityId && selectedItem === "Opportunities" ? (
              <Link
                component="button"
                variant="body2"
                onClick={handleBreadcrumbClick("/user/dashboard/opportunities")}
                sx={{
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  color: "text.secondary",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    textDecoration: "underline",
                    color: "primary.main"
                  }
                }}
              >
                Opportunities
              </Link>
            ) : (
              <Typography
                color="text.primary"
                sx={{
                  fontWeight: opportunityId ? 500 : 600,
                  fontSize: "0.875rem",
                  color: opportunityId ? "text.secondary" : "text.primary",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {selectedItem}
              </Typography>
            )}

            {/* Details is always the current item when present */}
            {opportunityId && selectedItem === "Opportunities" && (
              <Typography
                color="text.primary"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                Details
              </Typography>
            )}
          </Breadcrumbs>

          {/* Outlet */}
          <Outlet context={{ opportunityId }} />
        </Container>
      </Box>
    </Box>
  );
}
