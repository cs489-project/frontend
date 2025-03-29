import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, Typography, Paper, Divider, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { useUserInfoContext } from "../utils/Context";
import axios from "axios";
import { useSnackbar } from "./SnackBar";

type Props = {
    open: boolean,
    onClose: () => void,
}

const DEFAULT_FORM = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
};

export default function OrgProfile({ open, onClose }: Props) {
    const [pageMode, setPageMode] = useState<"main" | "logo" | "pw">("main");
    const [url, setUrl] = useState("");
    const [logoErr, setLogoErr] = useState("");
    const [form, setForm] = useState({ ...DEFAULT_FORM });
    const [newPwError, setNewPwError] = useState("");
    const [confirmNewPwError, setConfirmNewPwError] = useState("");
    const { showSnackbar } = useSnackbar();
    const meData = useUserInfoContext();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

        try {
            await axios.put("/api/users/change-password", {
                old_password: form.oldPassword,
                password: form.newPassword
            });
            onClose();
            setPageMode("main");
            showSnackbar("Password updated Successfully", "success");
            setForm({ ...DEFAULT_FORM });
        } catch (e: any) {
            showSnackbar(e?.response?.data?.error || "Error updating password. Try again later", "error");
        }
    };

    const handleUpdateLogo = async () => {
        if (url.length === 0) {
            setLogoErr("Please Provide a URL");
            return;
        } else {
            setLogoErr("");
        }

        try {
            await axios.put("/api/users/update-org-logo", {
                logo_url: url
            });
            onClose();
            setPageMode("main");
        } catch (e: any) {
            showSnackbar(e?.response?.data?.error || "Error updating Logo URL. Try again later", "error");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Paper sx={{ p: 2, width: 600 }}>
                {
                    pageMode === "pw" ? <>
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
                                <Button onClick={() => setPageMode("main")} color="primary" variant="outlined">Back</Button>
                            </DialogActions>
                        </form>
                    </> : <>
                        {
                            pageMode === "logo" ? <>
                                <DialogTitle>Changing Your Company Logo</DialogTitle>
                                <TextField
                                    label="Company Logo URL"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={url}
                                    error={!!logoErr}
                                    helperText={logoErr}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                    size="small"
                                />
                                <DialogActions>
                                    <Button onClick={handleUpdateLogo} type="submit" color="primary" variant="contained">Update Logo</Button>
                                    <Button onClick={() => setPageMode("main")} color="primary" variant="outlined">Back</Button>
                                </DialogActions>
                            </> : <>
                                <DialogTitle>Your Organization Profile</DialogTitle>
                                <DialogContent style={{ textAlign: "center", padding: 10, margin: "30px auto" }}>
                                    <div style={{ display: "flex", justifyContent: 'space-around' }}>
                                        <Avatar src={meData.metadata.logo_url || ""} alt={meData.name} sx={{ width: 80, height: 80 }} />
                                        <Divider orientation="vertical" flexItem />
                                        <div>
                                            <Typography variant="h6">{meData.name}</Typography>
                                            <br />
                                            <Typography variant="body1" color="textSecondary">{meData.email}</Typography>
                                        </div>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setPageMode("logo")} color="primary" variant="contained">Change Logo URL</Button>
                                    <Button onClick={() => setPageMode("pw")} color="primary" variant="contained">Change Password</Button>
                                    <Button onClick={onClose} color="primary" variant="outlined">Close</Button>
                                </DialogActions>
                            </>
                        }
                    </>
                }
            </Paper>
        </Dialog>
    );
};
