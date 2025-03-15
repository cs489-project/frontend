import { Box, Typography, Paper } from "@mui/material";

export default function UDSettings() {
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: "center",
          border: "1px dashed #e0e0e0",
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: "#637381" }}>
          Settings Coming Soon
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This feature is currently under development. Check back later for updates.
        </Typography>
      </Paper>
    </Box>
  );
} 
