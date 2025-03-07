import { QRCodeSVG } from "qrcode.react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import * as OTPAuth from "otpauth";

type Props = {
  goBack: () => void,
  submit2FA: (code: string) => void,
  type: "login" | "signup",
}

const QRCodeGenerator = ({ type, goBack, submit2FA }: Props) => {
  const [oneTimeCode, setOneTimeCode] = useState("");
  const [twoFAOPT, setTwoFaOpt] = useState<{ secret: string, qrCode: string } | null>(null);
  const [codeErr, setCodeErr] = useState("");

  useEffect(() => {
    const secret = new OTPAuth.Secret().base32;
    let totp = new OTPAuth.TOTP({
      secret,
      label: "2FA",
      issuer: "ByteBreakers",
    });
    setTwoFaOpt({ secret, qrCode: totp.toString() });
  }, []);

  const handleSubmit = () => {
    if (oneTimeCode.length) {
      submit2FA(oneTimeCode)
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
        {twoFAOPT?.qrCode && type === "signup" && <QRCodeSVG value={twoFAOPT.qrCode} size={200} />}
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
