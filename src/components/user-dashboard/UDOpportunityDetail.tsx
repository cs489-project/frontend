import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Skeleton,
  Alert,
  Chip,
  Container,
  useTheme,
  alpha
} from "@mui/material";
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SecurityIcon from "@mui/icons-material/Security";
import { Opportunity, opportunityService } from "../../services/opportunityService";
import { getRelativeTimeString } from "../../utils/timeUtils";
import { useNavigate, useParams } from "react-router-dom";
import DisclosureModal from "./DisclosureModal";

export default function UDOpportunityDetail() {
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Disclosure modal state
  const [disclosureModalOpen, setDisclosureModalOpen] = useState(false);

  // Memoize the back handler to ensure scroll position is properly restored
  const handleBackClick = useCallback(() => {
    // Scroll to top of detail view before navigating back
    window.scrollTo(0, 0);

    // Use browser history navigation instead of direct URL navigation
    // This will preserve all URL parameters including the search query
    navigate(-1);
  }, [navigate]);

  const fetchOpportunityData = useCallback(async () => {
    if (!opportunityId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await opportunityService.getById(opportunityId);
      if (data) {
        setOpportunity(data);
      } else {
        setError("Opportunity not found");
      }
    } catch (err) {
      setError("Failed to load opportunity details. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [opportunityId]);

  useEffect(() => {
    // Reset scroll position when viewing a new opportunity
    window.scrollTo(0, 0);

    fetchOpportunityData();
  }, [fetchOpportunityData]);

  // Handle disclosure modal open/close
  const handleOpenDisclosureModal = useCallback(() => {
    setDisclosureModalOpen(true);
  }, []);

  const handleCloseDisclosureModal = useCallback(() => {
    setDisclosureModalOpen(false);
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="text" width="60%" height={36} />
            <Skeleton variant="text" width="40%" height={24} />
          </Box>
        </Box>
        <Skeleton variant="rectangular" height={200} sx={{ mb: 3, borderRadius: 2 }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
          }}
        >
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          variant="outlined"
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500
          }}
        >
          Back to Opportunities
        </Button>
      </Container>
    );
  }

  if (!opportunity) {
    return null;
  }

  // Calculate relative time
  const relativeTime = getRelativeTimeString(opportunity.datePosted);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* Back button and submit vulnerability button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          variant="text"
          sx={{
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 500,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.04)
            }
          }}
        >
          Back to opportunities
        </Button>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<SecurityIcon sx={{ fontSize: '1.1rem' }} />}
            onClick={handleOpenDisclosureModal}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.875rem",
              py: 0.75,
              px: 2,
              borderColor: alpha(theme.palette.primary.main, 0.5),
              backgroundColor: alpha(theme.palette.primary.main, 0.02),
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                borderColor: theme.palette.primary.main,
                boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.15)}`
              },
              transition: 'all 0.2s ease'
            }}
          >
            Submit Disclosure
          </Button>
        </Box>
      </Box>

      {/* Header with logo and title */}
      <Box sx={{ display: "flex", alignItems: "flex-start", mb: 4 }}>
        <Box
          sx={{
            minWidth: 64,
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 3,
            borderRadius: "12px",
            backgroundColor: "#f5f7fa",
            padding: "12px",
            border: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
            alignSelf: "center"
          }}
        >
          <img
            src={opportunity.logo}
            alt={opportunity.company}
            style={{
              maxWidth: "100%",
              width: 40,
              height: 40,
              objectFit: "contain"
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{
              color: "#1a2027",
              mb: 1,
              fontSize: { xs: "1.5rem", sm: "2rem" },
              letterSpacing: "-0.01em"
            }}
          >
            {opportunity.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#4B5563",
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {opportunity.company}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#6B7280',
                bgcolor: 'transparent',
                border: '1px solid',
                borderColor: '#E5E7EB',
                px: 1.25,
                py: 0.5,
                borderRadius: '12px',
                height: 24,
                '&:hover': {
                  backgroundColor: alpha('#6B7280', 0.04),
                },
              }}
            >
              <AccessTimeIcon sx={{ fontSize: '0.75rem', mr: 0.5, color: '#9CA3AF' }} />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 500,
                  fontSize: "0.7rem",
                  color: '#6B7280',
                  lineHeight: 1.2,
                }}
              >
                Posted {relativeTime}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Tags/Categories */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
        {opportunity.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            size="small"
            sx={{
              backgroundColor: 'transparent',
              color: '#6B7280',
              fontWeight: 500,
              fontSize: '0.75rem',
              height: 24,
              border: '1px solid',
              borderColor: '#E5E7EB',
              px: 0.75,
              '&:hover': {
                backgroundColor: alpha('#6B7280', 0.04),
              }
            }}
          />
        ))}
      </Box>

      {/* Description markdown */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 4 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
        }}
      >
        <Box
          sx={{
            textAlign: 'left',
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              fontWeight: 600
            },
            '& h1': { fontSize: '1.5rem' },
            '& h2': { fontSize: '1.3rem' },
            '& h3': { fontSize: '1.1rem' },
            '& h4, & h5, & h6': { fontSize: '1rem' }
          }}
        >
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
            {opportunity.detailedDescription}
          </ReactMarkdown>
        </Box>
      </Paper>

      {/* Disclosure Modal */}
      <DisclosureModal
        open={disclosureModalOpen}
        onClose={handleCloseDisclosureModal}
        opportunityId={opportunityId || ''}
        companyName={opportunity.company}
        responsibleDisclosureUrl={opportunity.responsibleDisclosureUrl}
      />
    </Container>
  );
}
