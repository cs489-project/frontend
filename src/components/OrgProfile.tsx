import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, Typography, Paper, Divider } from "@mui/material";

type Props = {
    open: boolean,
    onClose: () => void,
}

export default function OrgProfile({ open, onClose }: Props) {
    return (
        <Dialog open={open} onClose={onClose}>
            <Paper sx={{ p: 2, width: 400 }}>
                <DialogTitle sx={{ margin: '10px auto' }}>Your Organization Profile</DialogTitle>
                <DialogContent style={{ textAlign: "center", padding: 10, margin: "30px auto" }}>
                    <div style={{ display: "flex", justifyContent: 'space-around' }}>
                        <Avatar src={"https://i.imgur.com/24AiUWA.jpeg"} sx={{ width: 80, height: 80 }} />
                        <Divider orientation="vertical" flexItem />
                        <div>
                            <Typography variant="h6" style={{ marginTop: "10px" }}>Org name</Typography>
                            <br />
                            <Typography variant="body1" color="textSecondary">Org email</Typography>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary" variant="outlined">Close</Button>
                </DialogActions>
            </Paper>
        </Dialog>
    );
};
