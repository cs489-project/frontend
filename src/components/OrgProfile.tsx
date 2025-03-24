import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, Typography, Paper, Divider, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { useUserInfoContext } from "../utils/Context";

type Props = {
    open: boolean,
    onClose: () => void,
}

export default function OrgProfile({ open, onClose }: Props) {
    const [resetPwPage, setResetPwPage] = useState(false);
    const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    const [newPwError, setNewPwError] = useState("");
    const [confirmNewPwError, setConfirmNewPwError] = useState("");
    const meData = useUserInfoContext();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.newPassword.length < 10) {
            setNewPwError("New password must be 10 characters long");
            return;
        } else {
            setNewPwError("");
        }

        if (form.newPassword !== form.confirmNewPassword) {
            setConfirmNewPwError("The new confirmed password does not match the new one above");
            return;
        } else {
            setConfirmNewPwError("");

        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Paper sx={{ p: 2, width: 400 }}>
                {
                    resetPwPage ? <>
                        <DialogTitle>Changing Your Password</DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Old password"
                                name="oldPassword"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={form.oldPassword}
                                onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
                                required
                                size="small"
                            />
                            <TextField
                                label="New password"
                                type="password"
                                name="newPassword"
                                fullWidth
                                margin="normal"
                                value={form.newPassword}
                                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                                required
                                error={!!newPwError}
                                helperText={newPwError}
                                size="small"
                            />
                            <TextField
                                label="Confirm your new password"
                                type="password"
                                name="confirmNewPassword"
                                fullWidth
                                margin="normal"
                                value={form.confirmNewPassword}
                                onChange={(e) => setForm({ ...form, confirmNewPassword: e.target.value })}
                                required
                                error={!!confirmNewPwError}
                                helperText={confirmNewPwError}
                                size="small"
                            />
                            <DialogActions>
                                <Button type="submit" color="primary" variant="contained">Change Password</Button>
                                <Button onClick={() => setResetPwPage(false)} color="primary" variant="outlined">Back</Button>
                            </DialogActions>
                        </form>
                    </> : <>
                        <DialogTitle>Your Organization Profile</DialogTitle>
                        <DialogContent style={{ textAlign: "center", padding: 10, margin: "30px auto" }}>
                            <div style={{ display: "flex", justifyContent: 'space-around' }}>
                                <Avatar src={"https://i.imgur.com/24AiUWA.jpeg"} sx={{ width: 80, height: 80 }} />
                                <Divider orientation="vertical" flexItem />
                                <div>
                                    <Typography variant="h6">{meData.name}</Typography>
                                    <br />
                                    <Typography variant="body1" color="textSecondary">{meData.email}</Typography>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setResetPwPage(true)} color="primary" variant="contained">Change Password</Button>
                            <Button onClick={onClose} color="primary" variant="outlined">Close</Button>
                        </DialogActions>
                    </>
                }
            </Paper>
        </Dialog>
    );
};
