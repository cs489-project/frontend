import { useEffect, useState } from "react";
import { Container, TextField, Button, Paper, Tabs, Tab } from "@mui/material";
import QRCode from "../components/QRCode";
import * as OTPAuth from "otpauth";

export default function OrgSignUpLogin() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ orgname: "", email: "", password: "", twoFaCode: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [twoFAOPT, setTwoFaOpt] = useState<{ secret: string, qrCode: string } | null>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(e.target.value) ? "" : "Invalid email format");
    }

    if (e.target.name === "password") {
      setPasswordError(e.target.value.length >= 10 ? "" : "Password must be at least 10 characters");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(tab === 0 ? "Signing Up..." : "Logging In...", form);
  };

  useEffect(() => {
    const secret = new OTPAuth.Secret().base32;
    let totp = new OTPAuth.TOTP({
      secret,
      label: "2FA",
      issuer: "ByteBreakers",
    });
    setTwoFaOpt({ secret, qrCode: totp.toString() });
  }, []);

  return (
    <Container>
      <h1><span style={{ color: "darkblue" }}>Byte</span><span style={{
        color: "purple"
      }}>Breakers</span></h1>
      <h4>Bug bounty platform for your organization to hire top security talents</h4>
      <div style={{ height: "400px" }}>
        <Paper elevation={3} sx={{ m: 6, p: 2, margin: "auto" }}>
          <Tabs value={tab} onChange={(_e, newValue) => setTab(newValue)} centered>
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit}>
              {
                tab === 1 && <TextField
                  label="Organization Name"
                  type="text"
                  name="orgname"
                  fullWidth
                  margin="normal"
                  value={form.orgname}
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
              <TextField
                label="2FA Code"
                placeholder="Enter the 6 digit Google Authenticator Code Here"
                type="text"
                name="twoFaCode"
                fullWidth
                margin="normal"
                value={form.twoFaCode}
                onChange={handleChange}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                {tab === 1 ? "Sign Up" : "Login"}
              </Button>
            </form>
            {
              tab === 1 && <QRCode qrCodeStr={twoFAOPT?.qrCode || ""} />
            }
          </div>
        </Paper>
      </div>
    </Container>
  );
}
