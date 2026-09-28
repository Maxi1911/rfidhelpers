import { Box, Chip, Tab, Tabs, Typography, ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { lightMuiTheme } from "../theme/lightTheme";
import { darkMuiTheme } from "../theme/darkTheme";

import InventoryStatusUpdateModule from "./InventoryStatusUpdateModule";
import PopulateDeliveryItemsModule from "./PopulateDeliveryItemsModule";
import RfidScanPage from "./RfidScanPage";

const MODULES = [
  {
    id: "rfid-scan",
    label: "RFID Scan Data Helper",
    description:
      "Build RFID scan payloads from raw tags and submit them to POST /rfid/scan/data.",
    component: RfidScanPage,
  },
  {
    id: "populate-delivery-items",
    label: "Populate Delivery Items Helper",
    description:
      "Populate delivery request items from packing for visit IDs via POST /trips/visits/{visitId}/populate-delivery-items-from-packing.",
    component: PopulateDeliveryItemsModule,
  },
  {
    id: "inventory-status-update",
    label: "Bulk Inventory Status Update",
    description:
      "Construct and submit bulk inventory status update payloads with live review before API submission.",
    component: InventoryStatusUpdateModule,
  },
];

const MODULE_IDS = new Set(MODULES.map((module) => module.id));
const DEFAULT_MODULE_ID = MODULES[0].id;

export default function HelpersPage({ themeMode = 'light' }) {
  const [localActiveTab, setLocalActiveTab] = useState(DEFAULT_MODULE_ID);
  const isDark = themeMode === 'dark';
  const currentMuiTheme = isDark ? darkMuiTheme : lightMuiTheme;
  
  let searchParams = null;
  let setSearchParams = null;
  try {
    const res = useSearchParams();
    searchParams = res[0];
    setSearchParams = res[1];
  } catch {
    // Router fallback
  }

  const requestedModuleId = searchParams ? searchParams.get("module") : null;
  const activeModuleId = requestedModuleId && MODULE_IDS.has(requestedModuleId)
    ? requestedModuleId
    : localActiveTab;

  const activeModule = useMemo(
    () => MODULES.find((module) => module.id === activeModuleId) ?? MODULES[0],
    [activeModuleId]
  );

  const handleModuleChange = (_, nextModuleId) => {
    setLocalActiveTab(nextModuleId);
    if (setSearchParams) {
      const nextSearchParams =
        nextModuleId === DEFAULT_MODULE_ID ? {} : { module: nextModuleId };
      setSearchParams(nextSearchParams, { replace: true });
    }
  };

  const ActiveModuleComponent = activeModule.component;

  return (
    <ThemeProvider theme={currentMuiTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "80vh",
          bgcolor: isDark ? "transparent" : "#f8fafc",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* Module Header Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: 3,
            py: 2,
            bgcolor: isDark ? "rgba(15, 23, 42, 0.8)" : "#ffffff",
            borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e2e8f0",
            flexShrink: 0,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={800} sx={{ color: isDark ? "#f8fafc" : "#0f172a" }}>
              Linengrass ERP Operational Helpers
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
              Operational Workflow Modules & Payload Generators
            </Typography>
          </Box>
          <Chip label={`${MODULES.length} Active Modules`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 700 }} />
        </Box>

        {/* Tab Selector */}
        <Box
          sx={{
            px: 2,
            bgcolor: isDark ? "rgba(15, 23, 42, 0.6)" : "#ffffff",
            borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
            flexShrink: 0,
          }}
        >
          <Tabs
            value={activeModuleId}
            onChange={handleModuleChange}
            variant="scrollable"
            scrollButtons="auto"
            slotProps={{ indicator: { style: { backgroundColor: isDark ? "#00f2fe" : "#2563eb", height: 3 } } }}
          >
            {MODULES.map((module) => (
              <Tab 
                key={module.id} 
                value={module.id} 
                label={module.label} 
                sx={{ 
                  fontWeight: 700, 
                  fontSize: "0.875rem",
                  color: activeModuleId === module.id ? (isDark ? "#00f2fe" : "#2563eb") : (isDark ? "#94a3b8" : "#64748b") 
                }} 
              />
            ))}
          </Tabs>
        </Box>

        {/* Module Sub-Header Description */}
        <Box
          sx={{
            px: 3,
            py: 1.5,
            bgcolor: isDark ? "rgba(8, 12, 20, 0.6)" : "#f1f5f9",
            borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #e2e8f0",
            flexShrink: 0,
          }}
        >
          <Typography variant="body2" sx={{ color: isDark ? "#94a3b8" : "#475569" }}>
            {activeModule.description}
          </Typography>
        </Box>

        {/* Active Component Wrapper */}
        <Box sx={{ p: 3, overflowY: "auto", bgcolor: isDark ? "transparent" : "#f8fafc" }}>
          <ActiveModuleComponent key={activeModuleId} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
