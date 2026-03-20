/** App-wide configuration values and environment mappings. */

export const APP_CONFIG = {
  name: 'Red Defence',
  description: 'Advanced Cybersecurity Platform',
  version: '1.0.0',
} as const;

/** LocalStorage keys used across the application. */
export const STORAGE_KEYS = {
  AUTH: 'red-defence-auth',
} as const;
