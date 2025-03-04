import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function OpportunityCard({
  title,
  company,
  posted,
  description,
  reward,
  logo,
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderRadius: "12px",
        borderColor: "#e0e0e0",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Left: Logo + Main Info */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={logo}
            alt={company}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0, textAlign: "left" }}>
          <Typography fontWeight="600" fontSize="1rem" noWrap>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {company}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              height: "36px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>

      {/* Right: Posted Time + Reward */}
      <Box sx={{ textAlign: "right", minWidth: 200 }}>
        <Typography variant="body2" fontWeight="500" sx={{ color: "#0073e6" }}>
          {reward}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1,
            mt: 0.5,
          }}
        >
          <AccessTimeIcon fontSize="small" sx={{ color: "#888" }} />
          <Typography variant="caption" color="text.secondary" noWrap>
            {posted}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
