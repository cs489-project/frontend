import { Avatar, Box, Button, Card, CardActionArea, Drawer, Paper, Typography } from "@mui/material";
import { useState } from "react";
import MarkdownWrapper from "./MarkdownWrapper";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';

const messages = [
    {
        sent_on: "02/25/2025",
        content: `

# SQL Injection Exploitation on a Login Page

## **Target:**
- Web application login form vulnerable to SQL injection.

## **Steps to Reproduce:**
1. **Visit the Login Page**
    - Open the target web application in a browser.
    - Navigate to the login form (e.g., \`https://example.com/login\`).

2. **Enter Malicious SQL Payload in the Username Field**
    - Use the following input in the **Username** field:
        \`\`\`sql
        ' OR 1=1 --
        \`\`\`
    - Enter any value in the password field (or leave it empty).

3. **Submit the Form**
    - Click the **Login** button.
    - If successful, you will bypass authentication and log in as an administrative user.

## **Why It Works:**
- The vulnerable login query might look like this:
    \`\`\`sql
    SELECT * FROM users WHERE username = 'USER_INPUT' AND password = 'PASSWORD_INPUT';
`,
        sent_by: "USER"
    },
    {
        sent_on: "02/25/2025",
        content: "sounds good, taking a look",
        sent_by: "ORG"
    },
    {
        sent_on: "02/25/2025",
        content: "sure, *lmk*",
        sent_by: "USER"
    },
];

const submissions = [
    {
        userId: "userid1",
        postingId: "Bounty Posting 1",
        messages: messages,
    },
    {
        userId: "userid2",
        postingId: "Bounty Posting 2",
        messages: messages,
    },
];

type Props = {
    submission: {
        userId: string,
        postingId: string,
        messages: {
            sent_on: string,
            content: string,
            sent_by: string,
        }[]
    }
}
function SubmissionChat(props: Props) {
    const [message, setMessage] = useState("");

    return <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ flexGrow: 1, padding: "64px 0 16px", overflowY: "auto" }}>
            {
                props.submission.messages.map(message => {
                    return <div style={{ display: "flex", flexDirection: message.sent_by === "USER" ? "row" : "row-reverse", padding: "16px" }}>
                        <div style={{ padding: "0 16px" }}>
                            <Avatar>
                                {message.sent_by === "USER" ? <AccountCircleIcon /> : <ApartmentIcon />}
                            </Avatar>
                        </div>
                        <div>
                            <Paper sx={{ flexGrow: 1, overflow: "auto", maxWidth: 600 }} elevation={2}>
                                <div style={{ padding: 8 }}>
                                    <MarkdownWrapper value={message.content} />
                                </div>
                            </Paper>
                        </div>
                        <div style={{ width: "100px" }}></div>
                    </div>
                })
            }
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <textarea
                style={{ resize: "none", width: 500, height: 200 }}
                placeholder="Enter your message here, you can use Markdown and the results are rendered to the right"
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div style={{ flex: 1, border: "1px solid black" }}>
                <MarkdownWrapper value={message}></MarkdownWrapper>
            </div>
        </div>
        <Button fullWidth variant="contained" sx={{ borderRadius: 0 }}>Send Message</Button>
    </div>;
}

export default function UserSubmissions() {
    const [currentSubmission, setCurrentSubmission] = useState<null | any>(null);

    return <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Sidebar Drawer */}
        <Drawer
            variant="permanent"
            sx={{
                width: 400,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 400, marginTop: "64px" }, // Ensure it aligns with AppBar height
            }}
        >
            {submissions.map(submission => (
                <Card key={submission.postingId} elevation={0}>
                    <CardActionArea
                        sx={{ border: "1px solid lightgrey", borderRadius: 0, padding: 2 }}
                        onClick={() => setCurrentSubmission(submission)}
                    >
                        <Typography>{submission.postingId} (By: {submission.userId})</Typography>
                    </CardActionArea>
                </Card>
            ))}
        </Drawer>

        {/* Main Content */}
        <Box
            component="main"
            sx={{ flexGrow: 1 }} // Push content to the right
        >
            {currentSubmission ? (
                <SubmissionChat submission={currentSubmission} />
            ) : (
                <>
                    <div style={{ height: "64px" }}></div>
                    <div style={{ margin: 24 }}>Click on a record on the left to see the submissions</div>
                </>
            )}
        </Box>
    </Box>
}
