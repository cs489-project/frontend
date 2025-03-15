import { useState } from "react";
import { Container, TextField, Button, Paper, Tabs, Tab } from "@mui/material";
import QRCode from "../components/QRCode";
import { useNavigate } from "react-router-dom";

export default function UserSignUpLogin() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mfaStage, setMFAStage] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(
        emailRegex.test(e.target.value) ? "" : "Invalid email format"
      );
    }

    if (e.target.name === "password") {
      setPasswordError(
        e.target.value.length >= 10
          ? ""
          : "Password must be at least 10 characters"
      );
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMFAStage(true);
    // TODO
  };

  return (
    <Container>
      <h1>
        <span style={{ color: "darkblue" }}>Byte</span>
        <span
          style={{
            color: "purple",
          }}
        >
          Breakers
        </span>
      </h1>
      <h4>Bug bounty platform for you to show off your hacking skills</h4>
      <div style={{ height: "400px" }}>
        <Paper elevation={3} sx={{ width: 400, p: 4, margin: "40px auto" }}>
          {!mfaStage ? (
            <>
              <Tabs
                value={tab}
                onChange={(_e, newValue) => setTab(newValue)}
                centered
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
              <form
                onSubmit={handleSubmit}
                style={{ width: 300, margin: "auto" }}
              >
                {tab === 1 && (
                  <TextField
                    label="Full Name"
                    type="text"
                    name="username"
                    fullWidth
                    margin="normal"
                    value={form.username}
                    onChange={handleChange}
                    required
                    size="small"
                  />
                )}
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  fullWidth
                  margin="normal"
                  value={form.email}
                  onChange={handleChange}
                  required
                  error={!!emailError}
                  helperText={emailError}
                  size="small"
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  fullWidth
                  margin="normal"
                  value={form.password}
                  onChange={handleChange}
                  required
                  error={!!passwordError}
                  helperText={passwordError}
                  size="small"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  {tab === 1 ? "Sign Up" : "Login"}
                </Button>
              </form>
            </>
          ) : (
            <QRCode
              type={tab === 0 ? "login" : "signup"}
              goBack={() => setMFAStage(false)}
              submit2FA={() => navigate("/user/dashboard/opportunities")}
            />
          )}
        </Paper>
      </div>
    </Container>
  );
}
