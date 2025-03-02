import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent } from "@mui/material";

type Props = {
  qrCodeStr: string,
}

const QRCodeGenerator = ({ qrCodeStr }: Props) => {
  return (
    <Card elevation={0} sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2, textAlign: "center" }}>
      <h4>For your security, 2FA with Google Authenticator is required when signing up</h4>
      <h4>Scan the QR code below and enter the code into the field on the left</h4>
      <CardContent>
        {qrCodeStr && <QRCodeSVG value={qrCodeStr} size={200} />}
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
