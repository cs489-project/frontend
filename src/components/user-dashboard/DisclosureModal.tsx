import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CircularProgress,
  useTheme,
  alpha,
  Paper,
  Fade,
  Tooltip,
  FormControlLabel,
  Checkbox,
  Link,
  Snackbar,
} from "@mui/material";
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import CloseIcon from "@mui/icons-material/Close";
import MarkdownIcon from "@mui/icons-material/Code";
import SendIcon from "@mui/icons-material/Send";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { disclosureService } from "../../services/disclosureService";

// Initial markdown template for the disclosure submission
const INITIAL_DISCLOSURE_TEMPLATE = `## Vulnerability Description

Describe the vulnerability in detail...

## Steps to Reproduce

1. First step
2. Second step
3. ...

## Impact

Explain the potential impact...

## Suggested Fix

If you have suggestions for fixing the issue...
`;

// LocalStorage key for saving disclosure content
const DISCLOSURE_CONTENT_KEY = "savedDisclosureContent";

interface DisclosureModalProps {
  open: boolean;
  onClose: () => void;
  opportunityId: string;
  companyName: string;
  responsibleDisclosureUrl: string;
}

const DisclosureModal: React.FC<DisclosureModalProps> = ({
  open,
  onClose,
  opportunityId,
  companyName,
  responsibleDisclosureUrl
}) => {
  const theme = useTheme();
  const [disclosureContent, setDisclosureContent] = useState(INITIAL_DISCLOSURE_TEMPLATE);
  const [submitting, setSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Use unique localStorage key per opportunity
  const localStorageKey = `${DISCLOSURE_CONTENT_KEY}_${opportunityId}`;

  // Load saved content from localStorage when modal opens
  useEffect(() => {
    if (open) {
      const savedContent = localStorage.getItem(localStorageKey);
      if (savedContent) {
        setDisclosureContent(savedContent);
      }
    }
  }, [open, localStorageKey]);

  // Handle disclosure modal close with saving content
  const handleClose = useCallback(() => {
    if (!submitting) {
      // Save content to localStorage before closing
      localStorage.setItem(localStorageKey, disclosureContent);

      onClose();

      // Only reset agreed to terms, not content
      setAgreedToTerms(false);
    }
  }, [onClose, submitting, disclosureContent, localStorageKey]);

  // Handle disclosure content change
  const handleDisclosureContentChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setDisclosureContent(newContent);
    // Save to localStorage on each change
    localStorage.setItem(localStorageKey, newContent);
  }, [localStorageKey]);

  // Handle agreement checkbox change
  const handleAgreementChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToTerms(event.target.checked);
  }, []);

  // Handle disclosure submission
  const handleSubmitDisclosure = useCallback(async () => {
    setSubmitting(true);
    setErrorMessage(null);

    try {
      // Call the disclosureService to submit the disclosure
      await disclosureService.submitDisclosure(opportunityId, disclosureContent);

      // On successful submission, reset the content to the template
      localStorage.setItem(localStorageKey, INITIAL_DISCLOSURE_TEMPLATE);

      // Show success message
      setSuccessMessage(`Disclosure successfully submitted to ${companyName}`);

      // Close modal
      setTimeout(() => {
        onClose();

        // Reset form after close animation completes
        setTimeout(() => {
          setDisclosureContent(INITIAL_DISCLOSURE_TEMPLATE);
          setAgreedToTerms(false);
        }, 300);
      }, 1000);
    } catch (error) {
      console.error('Error submitting disclosure:', error);
      setErrorMessage('There was an error submitting your disclosure. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [opportunityId, disclosureContent, onClose, companyName, localStorageKey]);

  // Handle closing the alert messages
  const handleCloseSuccessMessage = useCallback(() => {
    setSuccessMessage(null);
  }, []);

  const handleCloseErrorMessage = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        slots={{ transition: Fade }}
        transitionDuration={250}
        keepMounted={false}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1),
              height: '85vh',
              maxHeight: '900px',
              m: { xs: 1, sm: 2 },
              backgroundColor: theme.palette.background.paper,
              backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 100%)',
              backdropFilter: 'blur(10px)'
            }
          }
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(4px)',
            backgroundColor: alpha('#fff', 0.6),
          }
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.1),
            px: 3,
            py: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.5),
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                borderRadius: '8px',
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                p: 0.75,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.primary.main
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600} fontSize="1.1rem" sx={{ letterSpacing: '-0.01em' }}>
                Security Disclosure
              </Typography>
              <Typography color="text.secondary" variant="body2" fontSize="0.85rem">
                {companyName}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={handleClose}
            disabled={submitting}
            aria-label="Close modal"
            size="small"
            sx={{
              color: 'text.secondary',
              borderRadius: '10px',
              '&:hover': { backgroundColor: alpha(theme.palette.divider, 0.1) },
              transition: 'all 0.2s ease'
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: alpha(theme.palette.divider, 0.1) }}>
            <Paper
              elevation={0}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: '12px',
                p: 2,
                border: '1px solid',
                borderColor: alpha(theme.palette.primary.main, 0.1)
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LightbulbOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                <Box>
                  <Typography fontWeight={500} fontSize="0.9rem" mb={0.5}>
                    Create a detailed security disclosure
                  </Typography>
                  <Typography color="text.secondary" fontSize="0.85rem">
                    Provide clear reproduction steps, impact analysis, and any technical details
                    that will help the security team understand and validate the vulnerability.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Header tabs */}
          <Box sx={{
            display: 'flex',
            borderBottom: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.15),
            position: 'relative'
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              px: 3,
              py: 1.5,
              borderRight: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.15),
              width: '50%'
            }}>
              <MarkdownIcon
                fontSize="small"
                sx={{
                  color: alpha(theme.palette.text.secondary, 0.7),
                  fontSize: '0.85rem',
                  mr: 1
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: alpha(theme.palette.text.secondary, 0.9),
                  fontWeight: 500,
                  fontSize: '0.85rem'
                }}
              >
                Markdown Editor
              </Typography>

              <Tooltip title="Markdown supported" arrow placement="top">
                <IconButton
                  size="small"
                  sx={{
                    color: alpha(theme.palette.text.secondary, 0.7),
                    padding: '4px',
                    borderRadius: '6px',
                    ml: 'auto'
                  }}
                >
                  <HelpOutlineIcon sx={{ fontSize: '0.85rem' }} />
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              px: 3,
              py: 1.5,
              width: '50%'
            }}>
              <Typography
                variant="body2"
                sx={{
                  color: alpha(theme.palette.text.secondary, 0.9),
                  fontWeight: 500,
                  fontSize: '0.85rem'
                }}
              >
                Preview
              </Typography>
            </Box>
          </Box>

          <Box sx={{
            display: 'flex',
            flexGrow: 1,
            height: 'calc(100% - 182px)',
            borderTop: 'none'
          }}>
            {/* Left panel - Markdown editor */}
            <Box sx={{
              width: '50%',
              height: '100%',
              bgcolor: theme.palette.background.paper,
              borderRight: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.15)
            }}>
              <TextField
                multiline
                fullWidth
                value={disclosureContent}
                onChange={handleDisclosureContentChange}
                placeholder="Describe your security finding..."
                variant="standard"
                disabled={submitting}
                slotProps={{
                  input: {
                    disableUnderline: true,
                    sx: {
                      height: '100%',
                      maxHeight: '100%',
                      p: 0,
                      overflow: 'auto'
                    }
                  }
                }}
                sx={{
                  flexGrow: 1,
                  height: '100%',
                  backgroundColor: theme.palette.background.paper,
                  '& .MuiInputBase-root': {
                    height: '100%',
                    alignItems: 'flex-start',
                    fontFamily: '"SF Mono", "Menlo", "Monaco", "Courier", monospace',
                    fontSize: '0.875rem',
                    p: 2.5,
                    lineHeight: 1.6,
                    color: alpha('#000', 0.9)
                  },
                  '& .MuiInputBase-input': {
                    height: '100%',
                    overflow: 'auto',
                  },
                  transition: 'background-color 0.2s ease'
                }}
              />
            </Box>

            {/* Right panel - Markdown preview */}
            <Box sx={{
              width: '50%',
              height: '100%',
              bgcolor: theme.palette.background.paper
            }}>
              <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
                px: 2.5,
                py: 2.5,
                textAlign: 'left',
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  fontWeight: 600
                },
                '& h1': { fontSize: '1.5rem' },
                '& h2': { fontSize: '1.3rem' },
                '& h3': { fontSize: '1.1rem' },
                '& h4, & h5, & h6': { fontSize: '1rem' }
              }}>
                <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                  {disclosureContent}
                </ReactMarkdown>
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{
          p: 3,
          borderTop: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          justifyContent: 'space-between',
          backgroundColor: alpha(theme.palette.background.default, 0.3)
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Terms agreement checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreedToTerms}
                  onChange={handleAgreementChange}
                  size="small"
                  sx={{
                    color: alpha(theme.palette.text.secondary, 0.7),
                    '&.Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                    padding: '2px',
                    borderRadius: '2px',
                    width: 16,
                    height: 16,
                    '& .MuiSvgIcon-root': {
                      fontSize: '1rem',
                      borderRadius: '2px'
                    }
                  }}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="caption" color="text.secondary" sx={{
                    fontSize: '0.75rem',
                    lineHeight: 1.5,
                    opacity: 0.9
                  }}>
                    I agree to {companyName}'s{' '}
                    <Link
                      href={responsibleDisclosureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        '&:hover': {
                          color: theme.palette.primary.main
                        }
                      }}
                    >
                      responsible disclosure policy
                      <OpenInNewIcon sx={{ fontSize: '0.75rem', ml: 0.5 }} />
                    </Link>
                  </Typography>
                </Box>
              }
              sx={{
                margin: 0,
                '.MuiFormControlLabel-label': {
                  fontSize: '0.75rem'
                },
                '& .MuiCheckbox-root': {
                  marginRight: 0.5
                }
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={submitting}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 500,
                borderColor: alpha(theme.palette.divider, 0.5),
                px: 2.5,
                py: 0.75,
                minHeight: '36px',
                fontSize: '0.875rem',
                color: theme.palette.text.primary,
                '&:hover': {
                  borderColor: alpha(theme.palette.divider, 0.8),
                  backgroundColor: alpha(theme.palette.divider, 0.08)
                }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitDisclosure}
              disabled={submitting || !disclosureContent.trim() || !agreedToTerms}
              startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : <SendIcon sx={{ fontSize: '0.9rem' }} />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 500,
                px: 2.5,
                py: 0.75,
                minHeight: '36px',
                fontSize: '0.875rem',
                boxShadow: 'none',
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.25)}`
                },
                '&:active': {
                  boxShadow: 'none',
                  transform: 'translateY(1px)'
                },
                transition: 'all 0.15s ease'
              }}
            >
              {submitting ? 'Submitting...' : 'Submit Disclosure'}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      {successMessage && (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          onClose={handleCloseSuccessMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            '& .MuiSnackbarContent-root': {
              minWidth: 'auto',
              boxShadow: 'none'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              px: 2.2,
              py: 1.1,
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
              backgroundColor: alpha(theme.palette.background.paper, 0.85),
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              border: '1px solid',
              borderColor: alpha('#E8FEF0', 0.6),
              color: theme.palette.text.primary,
              width: 'auto',
              transition: 'all 0.2s ease-out',
              animation: 'fadeInUp 0.3s ease-out',
              '@keyframes fadeInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(10px)'
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)'
                }
              }
            }}
          >
            <Box
              sx={{
                width: 22,
                height: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(theme.palette.success.main, 0.12),
                color: theme.palette.success.main,
                borderRadius: '50%',
                flexShrink: 0
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 10,
                  height: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem'
                }}
              >
                ✓
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: alpha(theme.palette.text.primary, 0.95),
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}
            >
              {successMessage}
            </Typography>
            <IconButton
              size="small"
              onClick={handleCloseSuccessMessage}
              sx={{
                width: 22,
                height: 22,
                color: alpha(theme.palette.text.secondary, 0.6),
                padding: 0,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.divider, 0.05)
                }
              }}
            >
              <CloseIcon fontSize="small" sx={{ fontSize: '0.75rem' }} />
            </IconButton>
          </Box>
        </Snackbar>
      )}
      {errorMessage && (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          onClose={handleCloseErrorMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            '& .MuiSnackbarContent-root': {
              minWidth: 'auto',
              boxShadow: 'none'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              px: 2.2,
              py: 1.1,
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
              backgroundColor: alpha(theme.palette.background.paper, 0.85),
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              border: '1px solid',
              borderColor: alpha('#FEE8E8', 0.6),
              color: theme.palette.text.primary,
              width: 'auto',
              transition: 'all 0.2s ease-out',
              animation: 'fadeInUp 0.3s ease-out'
            }}
          >
            <Box
              sx={{
                width: 22,
                height: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(theme.palette.error.main, 0.12),
                color: theme.palette.error.main,
                borderRadius: '50%',
                flexShrink: 0
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 10,
                  height: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}
              >
                !
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: alpha(theme.palette.text.primary, 0.95),
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}
            >
              {errorMessage}
            </Typography>
            <IconButton
              size="small"
              onClick={handleCloseErrorMessage}
              sx={{
                width: 22,
                height: 22,
                color: alpha(theme.palette.text.secondary, 0.6),
                padding: 0,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.divider, 0.05)
                }
              }}
            >
              <CloseIcon fontSize="small" sx={{ fontSize: '0.75rem' }} />
            </IconButton>
          </Box>
        </Snackbar>
      )}
    </>
  );
};

export default DisclosureModal; 
