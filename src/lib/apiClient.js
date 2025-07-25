// src/lib/apiClient.js
// Utility to select API source based on environment

const isDev = import.meta.env.DEV;

// Localhost API for dev, Supabase for prod
export function getApiBaseUrl() {
  if (isDev) {
    return 'http://localhost:4000';
  }
  // In production, return null to use Supabase hooks
  return null;
}

// Example fetch wrapper for dev mode
export async function fetchFromApi(endpoint) {
  const base = getApiBaseUrl();
  if (!base) throw new Error('API base URL not set (should not call in prod)');
  const res = await fetch(`${base}/${endpoint}`);
  if (!res.ok) throw new Error('API error');
  return res.json();
}
