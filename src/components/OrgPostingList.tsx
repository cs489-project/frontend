import { Card, Chip, Typography } from "@mui/material";

type PostingProp = {
    title: string,
    overview: string,
    points: number,
    status: string,
    date_posted: string,
}

const mock_data = [
    {
        title: "Bounty number one",
        overview: "a high level description of the posting",
        points: 4000,
        status: "Under Review",
        date_posted: "02/25/2025"
    }, {
        title: "Bounty number one",
        overview: "a high level description of the posting",
        points: 4000,
        status: "Under Review",
        date_posted: "02/25/2025"
    }, {
        title: "Bounty number one",
        overview: "a high level description of the posting",
        points: 4000,
        status: "Under Review",
        date_posted: "02/25/2025"
    }
];

function OrgPosting(props: PostingProp) {
    const { title, overview, points, status, date_posted } = props;

    return <Card sx={{ m: 2, p: 2, borderRadius: 2 }} elevation={4}>
        <Typography align="left" variant="h6">{title}</Typography>
        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography align="left" variant="body2">{overview}</Typography>
            <div>
                <Chip sx={{ margin: '0 4px 0' }} size="small" label={status} color="primary" />
                <Chip sx={{ margin: '0 4px 0' }} size="small" label={date_posted} color="primary" variant="outlined" />
                <Chip sx={{ margin: '0 4px 0' }} size="small" label={"Point: " + points} />
            </div>
        </div>
    </Card>
}

export default function OrgPostingList() {
    return <div>
        <Typography sx={{ p: 1 }} align="left" variant="h4">Your bounty postings</Typography>
        {
            mock_data.map(data => {
                return <OrgPosting {...data} />
            })
        }
    </div>;
}