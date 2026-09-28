export const ALLOWED_HELPERS_USERS = ['charan', 'rohit kavuluri'];

/**
 * Extracts and normalizes the current user identifier from localStorage.
 * Handles JSON object ({ name: ... }), JSON string ("..."), and raw plain strings.
 *
 * @returns {string} The raw user name or candidate, or empty string if not found.
 */
export const getCurrentUserName = () => {
  try {
    const raw = localStorage.getItem('currentUser');
    if (!raw) return '';

    let candidate = '';
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'string') {
        candidate = parsed;
      } else if (parsed && typeof parsed === 'object') {
        candidate =
          parsed.name ||
          parsed.username ||
          parsed.userName ||
          (typeof parsed.user === 'string' ? parsed.user : parsed.user?.name) ||
          parsed.currentUser ||
          '';
      }
    } catch {
      // In case the value was stored as a raw unquoted string like "Charan"
      candidate = raw;
    }

    if (!candidate || typeof candidate !== 'string') {
      return '';
    }

    // Strip leading/trailing quotes or escape characters and trim
    return candidate.replace(/^["'\\]+|["'\\]+$/g, '').trim();
  } catch {
    return '';
  }
};

/**
 * Checks whether the current user is authorized to access the `/helpers` route and sub-routes.
 * Only "Charan" and "Rohit Kavuluri" are permitted.
 *
 * @returns {boolean}
 */
export const isUserAuthorizedForHelpers = () => {
  const userName = getCurrentUserName();
  if (!userName) return false;
  return ALLOWED_HELPERS_USERS.includes(userName.toLowerCase());
};
