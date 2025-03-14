import { Paper } from "@mui/material";

export default function PendingSignUp() {
    return <Paper elevation={3} sx={{ width: 600, p: 4, margin: "200px auto" }}>
        <h2>Your account has been created and will be reviewed</h2>
        <p>Our team will be contacting you shortly to verify you and your organization's identity, using contacts
            you provided during sign up
        </p>
    </Paper>
}