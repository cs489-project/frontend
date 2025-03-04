import { QRCodeSVG } from "qrcode.react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import * as OTPAuth from "otpauth";

type Props = {
  goBack: () => void,
  submit2FA: (code: string) => void
}

const QRCodeGenerator = ({ goBack, submit2FA }: Props) => {
  const [form, setForm] = useState({ oneTimeCode: "" });
  const [twoFAOPT, setTwoFaOpt] = useState<{ secret: string, qrCode: string } | null>(null);

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
    <Card elevation={0} sx={{ maxWidth: 400, mx: "auto", p: 2, textAlign: "center" }}>
      <h4>For your security, 2FA with Google Authenticator is required when signing up. Scan the QR code and enter the security code below</h4>
      <CardContent>
        {twoFAOPT?.qrCode && <QRCodeSVG value={twoFAOPT.qrCode} size={200} />}
        <form>
          <TextField
            label="2FA Code"
            placeholder="Enter the 6 digit Google Authenticator Code Here"
            type="text"
            name="twoFaCode"
            fullWidth
            margin="normal"
            value={form.oneTimeCode}
            onChange={(e) => setForm({ ...form, oneTimeCode: e.target.value })}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            <Button onClick={goBack} variant="outlined" color="primary">Go Back</Button>
            <Button onClick={() => submit2FA(form.oneTimeCode)} variant="contained" color="primary">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card >
  );
};

export default QRCodeGenerator;
