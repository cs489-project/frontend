import { useState } from "react";
import { Container, TextField, Button, Paper, Tabs, Tab } from "@mui/material";

export default function UserLogin() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(e.target.value) ? "" : "Invalid email format");
    }

    if (e.target.name === "password") {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      setPasswordError(passwordRegex.test(e.target.value) ? "" : "Password must be at least 8 characters, include a number, a letter, and a special character");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(tab === 0 ? "Signing Up..." : "Logging In...", form);
  };

  return (
    <Container>
      <h1><span style={{ color: "darkblue" }}>Byte</span><span style={{
        color: "purple"
      }}>Breakers</span></h1>
      <h4>Bug Bounty platform for you to show off your hacking skills</h4>
      <div style={{ height: "400px" }}>
        <Paper elevation={3} sx={{ m: 6, p: 4, width: "400px", margin: "auto" }}>
          <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
            <Tab label="Sign Up" />
            <Tab label="Login" />
          </Tabs>
          <form onSubmit={handleSubmit}>
            {
              tab === 0 && <TextField
                label="Full Name"
                type="text"
                name="username"
                fullWidth
                margin="normal"
                value={form.username}
                onChange={handleChange}
                required
              />
            }
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
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              {tab === 0 ? "Sign Up" : "Login"}
            </Button>
          </form>
        </Paper>
      </div>
    </Container>
  );
}
