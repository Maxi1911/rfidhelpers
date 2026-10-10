import axios from 'axios';
import { getDcid } from '../state/dcidStore';
import { getRouteId } from '../state/routeStore';

export const BASE_URL = import.meta.env.VITE_BASE_URL || '/api';

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function isPlainObjectData(data) {
  return data && typeof data === "object" && !Array.isArray(data) && !(data instanceof FormData);
}

function addToGetParams(config, key, value) {
  config.params = { ...(config.params || {}), [key]: value };
}

function addToBody(config, key, value) {
  if (isPlainObjectData(config.data)) {
    config.data = { ...config.data, [key]: value };
  } else if (config.data instanceof FormData) {
    config.data.append(key, value);
  } else if (!config.data) {
    config.data = { [key]: value };
  }
}

function injectValue(config, metaKey, paramKey, getterFn) {
  const include = Boolean(config.meta?.[metaKey]);
  const isLoginRoute = config.url?.includes("/auth/login");

  if (!include || isLoginRoute) return;

  const value = getterFn();
  if (value == null || (typeof value === "number" && isNaN(value)) || value === "") return;

  const method = (config.method || "get").toLowerCase();

  if (method === "get") {
    addToGetParams(config, paramKey, value);
  } else {
    addToBody(config, paramKey, value);
  }
}


apiService.interceptors.request.use(
  (config) => {
    const DEFAULT_AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXhpQGdtYWlsLmNvbSIsInVzZXJJZCI6MTAyMDIyLCJyb2xlIjoiQURNSU4iLCJ1c2VyVHlwZSI6IlRFQU0iLCJpYXQiOjE3ODQ3NTI4ODMsImV4cCI6MTc4OTkzNjg4M30.TUPpXrwjvsVER5kmqzOmX95af_ZsSGrARczX-ouVzQQ';
    const envToken = import.meta.env.VITE_AUTH_TOKEN;
    const token = envToken || localStorage.getItem("token") || DEFAULT_AUTH_TOKEN;
    const companyId = import.meta.env.VITE_COMPANY_ID || localStorage.getItem("companyId") || "100000";

    const isLoginRoute = config.url?.includes("/auth/login");

    if (!isLoginRoute && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!isLoginRoute) {
      config.headers["X-Company-ID"] = companyId;
      config.headers["x-company-id"] = companyId;
    }

    // 🟦 Inject dcid if requested
    injectValue(config, "includeDcid", "dcId", () => getDcid());

    // 🟩 Inject routeId if requested
    injectValue(config, "includeRouteId", "routeId", () => getRouteId());

    return config;
  },
  (error) => Promise.reject(error)
);


export default apiService;

// Global response interceptor
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

