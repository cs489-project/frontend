import { Button, TextField } from "@mui/material";
import { useState } from "react";
import MarkdownWrapper from "./MarkdownWrapper";
import { useSnackbar } from "./SnackBar";

const INITIAL_STATE = {
    title: "",
    description: "",
    summary: "",
    responsibleDisclosureUrl: "",
};

export default function PostingBuilder() {
    const [form, setForm] = useState({ ...INITIAL_STATE });
    const { showSnackbar } = useSnackbar();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!form.title) {
            showSnackbar("Title to a posting is required", "error");
            return;
        } else if (!form.responsibleDisclosureUrl) {
            showSnackbar("Responsible Disclosure URL of a posting is required", "error");
            return;
        } else if (!form.summary) {
            showSnackbar("Summary of a posting is required", "error");
            return;
        } else if (!form.description) {
            showSnackbar("Detailed Descriptions to a posting is required", "error");
            return;
        }
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
            <TextField
                sx={{ textAlign: "left", marginTop: 2, marginBottom: 2 }}
                variant="standard"
                label="Summary"
                required
                size="small"
                value={form.summary}
                type="text"
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                placeholder="Write a short summary on what this posting is about"
                fullWidth
            ></TextField>
            <TextField
                sx={{ textAlign: "left", marginBottom: 2 }}
                variant="standard"
                label="responsible Disclosure URL"
                required
                size="small"
                value={form.responsibleDisclosureUrl}
                type="text"
                onChange={(e) => setForm({ ...form, responsibleDisclosureUrl: e.target.value })}
                placeholder="Enter your company's Responsible Disclosure Site Link Here"
                fullWidth
            ></TextField>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <textarea
                    style={{ resize: "none", width: 500, height: 400 }}
                    placeholder="Enter your detailed description in markdown here, the rendered results will show up to the right"
                    value={form.description}
                    required
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                ></textarea>
                <div style={{ flex: 1, marginLeft: 8, border: "1px solid black", overflow: "auto" }}>
                    <MarkdownWrapper value={form.description}></MarkdownWrapper>
                </div>
            </div>
            <br />
            <Button fullWidth variant="contained" type="submit" onClick={handleSubmit}>Create Posting</Button>
        </form>
    </div>
}