import { Card, Chip, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSnackbar } from "./SnackBar";

const StatusMap: Record<string, "default" | "error" | "info" | "success" | "warning"> = {
    "created": "default",
    "submitted": "info",
    "rejected": "error",
    "approved": "success",
    "archived": "warning"
};

type PostingProp = {
    id: number,
    company: string,
    datePosted: string,
    title: string,
    detailedDescription: string,
    previewDescription: string,
    responsibleDisclosureUrl: string,
    state: string,
    tags: string[],
}

function OrgPosting(props: PostingProp) {
    const { title, previewDescription, state, datePosted, tags } = props;

    return <Card sx={{ m: 2, p: 2, borderRadius: 2 }} elevation={4}>
        <Typography align="left" variant="h6">{title}</Typography>

        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography align="left" variant="body2">{previewDescription}</Typography>
            <Typography variant="body2">Last Updated On: {datePosted}</Typography>
        </div>
        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <div>
                {
                    tags.map(tag => {
                        return <Chip sx={{ marginRight: "8px" }} size="small" label={tag} color="secondary" variant="outlined" />
                    })
                }
            </div>
            <Chip sx={{ marginLeft: "8px" }} size="small" label={state.toUpperCase()} color={StatusMap[state] || "default"} />
        </div>
    </Card>
}

export default function OrgPostingList() {
    const [postings, setPostings] = useState<PostingProp[]>([]);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchPostings = async () => {
            try {
                const response = await axios.get("/api/requests/get-all");
                setPostings(response.data.requests);
            } catch (e: any) {
                showSnackbar(e?.response?.data?.error || "Error fetching postings right now. Try again later", "error");
            }
        };

        fetchPostings();
    }, []);


    return <div style={{ paddingTop: "64px" }}>
        <Typography sx={{ p: 2 }} align="left" variant="h4">Your bounty postings</Typography>
        {
            postings.length > 0 ? postings.map(data => {
                return <OrgPosting {...data} />
            }) :
                <>
                    <Typography align="center">You have no posting requests so far, go create some!</Typography>
                </>
        }
    </div>;
}
