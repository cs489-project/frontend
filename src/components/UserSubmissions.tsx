import { Avatar, Box, Button, Card, CardActionArea, Drawer, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MarkdownWrapper from "./MarkdownWrapper";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import axios from "axios";
import { useSnackbar } from "./SnackBar";

type Report = {
    commentCount: number,
    id: number,
    jobRequestTitle: string,
    logo: string,
    status: string, // TODO type here
    unread: true, // how to impl this?
    user: string
};

type Comment = {
    message: string,
    senderName: string,
    timestamp: string
}

type Props = {
    report: Report
}
function SubmissionChat(props: Props) {
    const { report } = props;
    const { showSnackbar } = useSnackbar();
    const [comments, setComments] = useState<Comment[]>([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function getComments() {
            try {
                const response = await axios.get("/api/reports/get-by-id", {
                    params: {
                        report_id: report.id
                    }
                });
                setComments(response.data.report.comments);
            } catch (e: any) {
                showSnackbar(e?.response?.data?.error || "Error getting data . Try again later", "error");
            }
        }
        getComments();
    }, [report]);

    return <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ flexGrow: 1, padding: "64px 0 16px", overflowY: "auto" }}>
            {
                comments.map(comment => {
                    return <div style={{ display: "flex", flexDirection: comment.senderName === "USER" ? "row" : "row-reverse", padding: "16px" }}>
                        <div style={{ padding: "0 16px" }}>
                            <Avatar>
                                {comment.senderName === "USER" ? <AccountCircleIcon /> : <ApartmentIcon />}
                            </Avatar>
                        </div>
                        <div>
                            <Paper sx={{ flexGrow: 1, overflow: "auto", maxWidth: 600 }} elevation={2}>
                                <div style={{ padding: 8 }}>
                                    <MarkdownWrapper value={comment.message} />
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
    const [currentReport, setCurrentReport] = useState<null | Report>(null);
    const [reports, setReports] = useState<Report[]>([]);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        async function getReports() {
            try {
                const response = await axios.get("/api/reports/get-all");
                setReports(response.data.reports);
            } catch (e: any) {
                showSnackbar(e?.response?.data?.error || "Error getting data. Try again later", "error");
            }
        }
        getReports();
    }, []);

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
            {reports.map(report => (
                <Card key={report.id} elevation={0}>
                    <CardActionArea
                        sx={{ border: "1px solid lightgrey", borderRadius: 0, padding: 2 }}
                        onClick={() => setCurrentReport(report)}
                    >
                        <Typography>{report.jobRequestTitle} (By: {report.user})</Typography>
                    </CardActionArea>
                </Card>
            ))}
        </Drawer>

        {/* Main Content */}
        <Box
            component="main"
            sx={{ flexGrow: 1 }} // Push content to the right
        >
            {currentReport ? (
                <SubmissionChat report={currentReport} />
            ) : (
                <>
                    <div style={{ height: "64px" }}></div>
                    <div style={{ margin: 24 }}>Click on a record on the left to see the report</div>
                </>
            )}
        </Box>
    </Box>
}
