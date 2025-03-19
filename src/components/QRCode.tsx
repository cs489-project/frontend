import { QRCodeSVG } from "qrcode.react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "./SnackBar";

type Props = {
  goBack: () => void,
  type: "login" | "signup",
  onSuccess: () => void,
}

const QRCodeGenerator = ({ type, goBack, onSuccess }: Props) => {
  const [oneTimeCode, setOneTimeCode] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [codeErr, setCodeErr] = useState("");
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    async function asyncFetchQRCode() {
      const response = await axios.post("/api/users/register-mfa");
      setQRCode(response.data.uri);
    }

    if (type === "signup") {
      asyncFetchQRCode();
    }
  }, []);

  const handleSubmit = async () => {
    if (oneTimeCode.length) {
      setCodeErr("");
      try {
        await axios.post("/api/users/login-mfa", {
          code: oneTimeCode
        });
        showSnackbar("Logged in successfully", "success");
        onSuccess();
      } catch (e: any) {
        showSnackbar(e?.response?.data?.error || "Error verifying one time code. Try again later", "error");
      }
    } else {
      setCodeErr("One time code is required");
    }
  };

  return (
    <Card elevation={0} sx={{ maxWidth: 400, mx: "auto", p: 2, textAlign: "center" }}>
      <h4 style={{ margin: 0 }}>{
        type === "signup"
          ? "For your security, 2FA with Google Authenticator is required when signing up. Scan the QR code and enter the security code below"
          : "Please enter your Authenticator's one time code"
      }</h4>
      <CardContent>
        {qrCode && type === "signup" && <QRCodeSVG value={qrCode} size={200} />}
        <TextField
          label="2FA Code"
          placeholder="Enter the 6 digit Google Authenticator Code Here"
          type="text"
          name="twoFaCode"
          fullWidth
          margin="normal"
          value={oneTimeCode}
          onChange={(e) => {
            setOneTimeCode(e.target.value);
            setCodeErr(e.target.value.length > 0 ? "" : "One time code is required")
          }}
          required
          error={!!codeErr}
          helperText={codeErr}
          size="small"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <Button onClick={goBack} variant="outlined" color="primary">Go Back</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        </div>
      </CardContent>
    </Card >
  );
};

export default QRCodeGenerator;
