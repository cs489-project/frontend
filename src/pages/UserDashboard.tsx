import { useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import UserSidebar from "../components/UserSidebar";
import OpportunityRow from "../components/OpportunityCard";

const opportunities = [
  {
    title: "Messenger Payment Security",
    company: "Facebook",
    posted: "1 hour ago",
    description:
      "Assist Facebook's security team in identifying vulnerabilities in their payment processing system to ensure secure transactions.",
    reward: "$7,000 - $15,000",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  },
  {
    title: "iCloud API Rate Limits",
    company: "Apple",
    posted: "3 hours ago",
    description:
      "Help Apple discover potential bypasses or abuse vectors in the iCloud API rate-limiting system.",
    reward: "$10,000 - $20,000",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    title: "AWS Identity Management",
    company: "Amazon",
    posted: "1 day ago",
    description:
      "Conduct penetration testing on AWS IAM flows to identify privilege escalation and misconfiguration issues.",
    reward: "$8,000 - $16,000",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    title: "User Authentication Flows",
    company: "Netflix",
    posted: "2 days ago",
    description:
      "Perform security assessments of Netflix's authentication and Single Sign-On processes to uncover potential credential leaks or session fixation attacks.",
    reward: "$6,000 - $12,000",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg",
  },
  {
    title: "Workspace File Sharing",
    company: "Google",
    posted: "3 days ago",
    description:
      "Help Google identify access control weaknesses and potential data leakage issues within Google Workspace file sharing.",
    reward: "$9,000 - $18,000",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
];

export default function UserDashboard() {
  const [selectedItem, setSelectedItem] = useState("Opportunities");

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <UserSidebar selectedItem={selectedItem} onSelectItem={setSelectedItem} />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 3,
          bgcolor: "#f9f9fb",
        }}
      >
        <Container sx={{ paddingLeft: 0, paddingRight: 0 }}>
          {/* Page Title */}
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: "left" }}
          >
            {selectedItem}
          </Typography>

          {/* Conditional Content */}
          {selectedItem === "Opportunities" && (
            <Stack spacing={1}>
              {opportunities.map((opportunity) => (
                <OpportunityRow key={opportunity.title} {...opportunity} />
              ))}
            </Stack>
          )}

          {selectedItem === "Inbox" && (
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              Inbox content goes here.
            </Typography>
          )}

          {selectedItem === "Leaderboard" && (
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              Leaderboard content goes here.
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
}
