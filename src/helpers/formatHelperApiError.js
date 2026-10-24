export function formatHelperApiError(error) {
  const status = error?.response?.status;
  const data = error?.response?.data;

  if (status === 401) {
    const backendMsg = data?.message || (typeof data === "string" ? data : "Token has expired or is invalid.");
    return `HTTP 401 Unauthorized: ${backendMsg}\n\n👉 Resolution: Click 'Manage Token' above and paste a fresh Bearer token from the ERP session.`;
  }

  if (status && data !== undefined) {
    return `HTTP ${status}: ${typeof data === "object" ? JSON.stringify(data, null, 2) : data}`;
  }

  if (status) {
    return `HTTP ${status}`;
  }

  return error?.message || "Network error";
}
