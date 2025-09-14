const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export async function fetchTranslations() {
  const res = await fetch(`${API_BASE}/api/ax-tracker/bible?translations=true`, {
    headers: { 'X-Client-Name': 'ax-bibles' },
  });
  return res.json();
}