import { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";
import KeyIcon from "@mui/icons-material/Key";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import { formatHelperApiError } from "./formatHelperApiError";
import { helperService } from "../services/helperService";

const FALLBACK_DEFAULT_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGFyYW5zcmlyYW0xMjA3QGdtYWlsLmNvbSIsInVzZXJJZCI6MTAyNjI4LCJyb2xlIjoiQURNSU4iLCJ1c2VyVHlwZSI6IlRFQU0iLCJpYXQiOjE3ODk1NTQ4NjUsImV4cCI6MTc5NDczODg2NX0.Kj6W5nO_YFacERouWwhqJSO3W1-ITdsiB12_UZ0CKZo";

function parseJwtPayload(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonStr = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

export default function PopulateDeliveryItemsModule() {
  const [visitId, setVisitId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  // Token Management State
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [tokenValue, setTokenValue] = useState(() => {
    return localStorage.getItem("token") || FALLBACK_DEFAULT_TOKEN;
  });
  const [tokenInputText, setTokenInputText] = useState("");

  // Parse current token
  const parsedToken = useMemo(() => parseJwtPayload(tokenValue), [tokenValue]);
  const isTokenExpired = useMemo(() => {
    if (!parsedToken?.exp) return false;
    return Date.now() >= parsedToken.exp * 1000;
  }, [parsedToken]);

  const handleOpenTokenModal = () => {
    setTokenInputText(tokenValue);
    setTokenModalOpen(true);
  };

  const handleSaveToken = () => {
    const trimmed = tokenInputText.trim();
    if (!trimmed) return;
    localStorage.setItem("token", trimmed);
    setTokenValue(trimmed);
    setTokenModalOpen(false);
    setSnackMsg("Authentication token updated successfully!");
    setSnackOpen(true);
  };

  const handleResetToDefaultToken = () => {
    localStorage.setItem("token", FALLBACK_DEFAULT_TOKEN);
    setTokenValue(FALLBACK_DEFAULT_TOKEN);
    setTokenModalOpen(false);
    setSnackMsg("Token reset to valid default admin token!");
    setSnackOpen(true);
  };

  const handleSubmit = useCallback(async () => {
    const trimmedVisitId = visitId.trim();

    if (!trimmedVisitId || submitting) {
      return;
    }

    setSubmitting(true);
    setApiResponse(null);
    setApiError(null);

    try {
      const data = await helperService.populateDeliveryItemsFromPacking(
        trimmedVisitId
      );
      setApiResponse(data);
    } catch (error) {
      setApiError(formatHelperApiError(error));
    } finally {
      setSubmitting(false);
    }
  }, [submitting, visitId]);

  const handleReset = useCallback(() => {
    setVisitId("");
    setApiResponse(null);
    setApiError(null);
  }, []);

  const handleCopy = useCallback(() => {
    if (!apiResponse) {
      return;
    }

    navigator.clipboard.writeText(JSON.stringify(apiResponse, null, 2));
    setSnackMsg("Response copied to clipboard");
    setSnackOpen(true);
  }, [apiResponse]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      {/* Top Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          px: 3,
          py: 1.5,
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          Populate Items in Delivery Request
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
          <Chip label="POST" size="small" color="primary" variant="outlined" />
          <Chip
            label="/trips/visits/{visit_id}/populate-delivery-items-from-packing"
            size="small"
            variant="outlined"
          />
        </Stack>
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            width: "100%",
            maxWidth: 760,
            p: 3,
            alignSelf: "flex-start",
          }}
        >
          <Stack spacing={2.5}>
            {/* Token Status Banner */}
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: isTokenExpired ? "#fef2f2" : "#f0fdf4",
                border: "1px solid",
                borderColor: isTokenExpired ? "#fecaca" : "#bbf7d0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <VpnKeyIcon
                  sx={{
                    color: isTokenExpired ? "error.main" : "success.main",
                    fontSize: 22,
                  }}
                />
                <Box>
                  <Typography variant="body2" fontWeight={700}>
                    Active Bearer Token:{" "}
                    <span style={{ fontWeight: 500 }}>
                      {parsedToken?.sub || "Custom Token"} (ID: {parsedToken?.userId || "N/A"})
                    </span>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {parsedToken?.exp
                      ? `Expires: ${new Date(parsedToken.exp * 1000).toLocaleString()}`
                      : "No expiration date found"}
                  </Typography>
                </Box>
              </Box>

              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={isTokenExpired ? "Token Expired" : "Token Active"}
                  color={isTokenExpired ? "error" : "success"}
                  size="small"
                  variant="filled"
                  sx={{ fontWeight: 700 }}
                />
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleOpenTokenModal}
                  startIcon={<KeyIcon />}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Manage Token
                </Button>
              </Stack>
            </Box>

            <Alert severity="info" variant="outlined">
              Enter a visit ID to populate all delivery request items from the
              associated packing jobs for that visit.
            </Alert>

            <TextField
              label="Visit ID"
              value={visitId}
              onChange={(event) => setVisitId(event.target.value)}
              placeholder="e.g. 147410"
              fullWidth
              InputLabelProps={{ shrink: true }}
              helperText="Visit ID associated with the trip and packing jobs"
            />

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Button
                variant="contained"
                startIcon={
                  submitting ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <SendIcon />
                  )
                }
                onClick={handleSubmit}
                disabled={!visitId.trim() || submitting}
                sx={{ minWidth: 160 }}
              >
                {submitting ? "Populating Items…" : "Populate Items"}
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<RestartAltIcon />}
                onClick={handleReset}
                disabled={submitting}
              >
                Reset
              </Button>
              <Button
                variant="text"
                startIcon={<ContentCopyIcon />}
                onClick={handleCopy}
                disabled={!apiResponse}
              >
                Copy Response
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>

      {/* Response Box */}
      {(apiResponse || apiError) && (
        <Box
          sx={{
            flexShrink: 0,
            borderTop: "3px solid",
            borderTopColor: apiError ? "error.main" : "success.main",
            bgcolor: "#fff",
            maxHeight: 260,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 1.25,
              bgcolor: apiError ? "#fff5f5" : "#f0faf0",
              borderBottom: "1px solid #e2e8f0",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {apiError ? (
                <ErrorIcon color="error" fontSize="small" />
              ) : (
                <CheckCircleIcon color="success" fontSize="small" />
              )}
              <Typography
                variant="subtitle2"
                fontWeight={700}
                color={apiError ? "error.main" : "success.main"}
              >
                {apiError
                  ? "API ERROR"
                  : `API SUCCESS (HTTP ${apiResponse?.statusCode || 200})`}
              </Typography>
            </Box>

            {apiResponse && (
              <Chip
                label={`Visit ID: ${apiResponse.visitId || visitId}`}
                size="small"
                color="success"
                variant="outlined"
                sx={{ fontWeight: 700 }}
              />
            )}
          </Box>

          <Box
            component="pre"
            sx={{
              display: "block",
              m: 0,
              px: 3,
              py: 2,
              fontSize: "0.82rem",
              fontFamily: "'Fira Code', 'Cascadia Code', monospace",
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {apiError ? apiError : JSON.stringify(apiResponse, null, 2)}
          </Box>
        </Box>
      )}

      {/* Token Management Dialog */}
      <Dialog
        open={tokenModalOpen}
        onClose={() => setTokenModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Manage Authentication Bearer Token
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5}>
            <Typography variant="body2" color="text.secondary">
              Paste a valid JWT Bearer token below. This token will be saved to{" "}
              <code>localStorage</code> and used for all requests made by this
              RFID helper.
            </Typography>

            <TextField
              label="Bearer Token (JWT)"
              multiline
              rows={5}
              value={tokenInputText}
              onChange={(e) => setTokenInputText(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiJ9..."
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            {parseJwtPayload(tokenInputText) && (
              <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f8fafc" }}>
                <Typography variant="caption" fontWeight={700} display="block" gutterBottom>
                  DECODED TOKEN INFO:
                </Typography>
                <Typography variant="caption" component="div">
                  • <b>Subject:</b> {parseJwtPayload(tokenInputText)?.sub}
                </Typography>
                <Typography variant="caption" component="div">
                  • <b>User ID:</b> {parseJwtPayload(tokenInputText)?.userId}
                </Typography>
                <Typography variant="caption" component="div">
                  • <b>Role:</b> {parseJwtPayload(tokenInputText)?.role}
                </Typography>
                <Typography variant="caption" component="div">
                  • <b>Expires:</b>{" "}
                  {new Date(
                    (parseJwtPayload(tokenInputText)?.exp || 0) * 1000
                  ).toLocaleString()}
                </Typography>
              </Paper>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            color="inherit"
            onClick={handleResetToDefaultToken}
            sx={{ mr: "auto" }}
          >
            Reset to Valid Default
          </Button>
          <Button color="inherit" onClick={() => setTokenModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveToken}
            disabled={!tokenInputText.trim()}
          >
            Save & Apply Token
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2500}
        onClose={() => setSnackOpen(false)}
        message={snackMsg}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
