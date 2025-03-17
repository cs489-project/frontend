import { Card, Chip, Typography } from "@mui/material";

type PostingProp = {
    title: string,
    overview: string,
    status: string,
    date_posted: string,
    keywords: string[],
}

const mock_data = [
    {
        title: "Bounty number one",
        overview: "a high level description of the posting",
        status: "Under Review",
        date_posted: "02/25/2025",
        keywords: ["XSS", "Authentication"],
    }, {
        title: "Bounty number one",
        overview: "a high level description of the posting",
        status: "Under Review",
        date_posted: "02/25/2025",
        keywords: ["DDOS", "Session Replay"],
    }, {
        title: "Bounty number one",
        overview: "a high level description of the posting",
        status: "Under Review",
        date_posted: "02/25/2025",
        keywords: ["QA", "CSRF", "SQL Injection", "Broken RBAC"],
    }
];

function OrgPosting(props: PostingProp) {
    const { title, overview, status, date_posted, keywords } = props;

    return <Card sx={{ m: 2, p: 2, borderRadius: 2 }} elevation={4}>
        <Typography align="left" variant="h6">{title}</Typography>

        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography align="left" variant="body2">{overview}</Typography>
            <div>Last Updated On: {date_posted}</div>
        </div>
        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                {
                    keywords.map(keyword => {
                        return <Chip sx={{ marginRight: "8px" }} size="small" label={keyword} color="secondary" variant="outlined" />
                    })
                }
            </div>
            <Chip sx={{ marginLeft: "8px" }} size="small" label={status} color="primary" />
        </div>
    </Card>
}

export default function OrgPostingList() {
    return <div>
        <Typography sx={{ p: 2 }} align="left" variant="h4">Your bounty postings</Typography>
        {
            mock_data.map(data => {
                return <OrgPosting {...data} />
            })
        }
    </div>;
}
