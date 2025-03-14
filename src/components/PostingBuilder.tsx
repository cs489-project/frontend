import { Button, TextField } from "@mui/material";
import { useState } from "react";
import MarkdownWrapper from "./MarkdownWrapper";

const INITIAL_STATE = {
    title: "",
    description: "",
    points: 100
};

export default function PostingBuilder() {
    const [form, setForm] = useState({ ...INITIAL_STATE });

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // TODO: CALL API
        setForm({ ...INITIAL_STATE });
    }

    return <div style={{ padding: 12 }}>
        <form>
            <TextField
                fullWidth
                variant="standard"
                label="Posting Title"
                required
                size="small"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Give a short descriptive title for your job request posting"
            ></TextField>
            <div style={{ display: "flex", marginTop: 20, marginBottom: 12 }}>
                <TextField
                    sx={{ textAlign: "left" }}
                    variant="standard"
                    label="Points"
                    required
                    size="small"
                    value={form.points}
                    type="number"
                    onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
                ></TextField>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <textarea
                    style={{ resize: "none", width: 400, height: 400 }}
                    placeholder="Enter your detailed description in markdown here"
                    value={form.description}
                    required
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                ></textarea>
                <div style={{ flex: 1, marginLeft: 8 }}>
                    <MarkdownWrapper value={form.description}></MarkdownWrapper>
                </div>
            </div>
            <br />
            <Button fullWidth variant="contained" type="submit" onClick={handleSubmit}>Create Posting</Button>
        </form>
    </div>
}