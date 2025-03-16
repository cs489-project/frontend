import { Box, Card, CardActionArea, Drawer, Typography } from "@mui/material";
import { useState } from "react";
import MarkdownWrapper from "./MarkdownWrapper";

const submissions = [
    {
        userId: "userid1",
        postingId: "Bounty Posting 1",
        submissionDetails: `

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
    },
    {
        userId: "userid2",
        postingId: "Bounty Posting 1",
        submissionDetails: `
# Cross-Site Scripting (XSS) Exploitation on a Web Form

## **Target:**
- A web application’s input field (e.g., a search bar, comment box, or contact form) that does not properly sanitize user input.

## **Steps to Reproduce:**
1. **Find a User Input Field**
   - Navigate to a page where user input is reflected on the page.
   - Example:  
     \`\`\`
     https://example.com/search?q=test
     \`\`\`

2. **Inject a Malicious Script**
   - Instead of entering normal text, inject the following JavaScript payload:
     \`\`\`html
     <script>alert('XSS Exploited!')</script>
     \`\`\`
   - Full URL:  
     \`\`\`
     https://example.com/search?q=<script>alert('XSS Exploited!')</script>
     \`\`\`

3. **Observe Execution**
   - If vulnerable, the browser will execute the script and display an alert box with \`"XSS Exploited!"\`.

## **Why It Works:**
- The vulnerable web page includes user input in its HTML response without encoding it:
  \`\`\`html
  <p>Search Results for: <b><%= userInput %></b></p>

`,
    },
];

export default function UserSubmissions() {
    const [currentSubmission, setCurrentSubmission] = useState<null | any>(null);



    return <Box sx={{ display: "flex" }}>
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
                        <Typography>{submission.postingId}</Typography>
                        <Typography>By: {submission.userId}</Typography>
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
                <>
                    <Card elevation={5} sx={{ borderRadius: 0, padding: 2 }}>
                        <Typography>Submission: {currentSubmission.postingId}</Typography>
                        <Typography>Submitted By: {currentSubmission.userId}</Typography>
                    </Card>
                    <MarkdownWrapper value={currentSubmission.submissionDetails}></MarkdownWrapper>
                </>
            ) : (
                <div>Select a submission to the left to view the details</div>
            )}
        </Box>
    </Box>
}
