const SB_URL = 'https://suwyafmirxnmtaonxlqo.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1d3lhZm1pcnhubXRhb254bHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTA3ODYsImV4cCI6MjA5Mzk4Njc4Nn0.I0CCH7oP-6BvNS1XTDk0G2tRbLooKGh7vyy8ziP6P5c';
const HEADERS = {
  'apikey': SB_KEY,
  'Authorization': `Bearer ${SB_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

export async function fetchColumns() {
  const res = await fetch(
    `${SB_URL}/rest/v1/columns?select=id,title_ko,title_en,author,category,created_at,thumbnail&order=created_at.desc`,
    { headers: HEADERS }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function fetchColumn(id) {
  const res = await fetch(
    `${SB_URL}/rest/v1/columns?id=eq.${encodeURIComponent(id)}&select=*`,
    { headers: { ...HEADERS, 'Accept': 'application/vnd.pgrst.object+json' } }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function insertColumn(payload) {
  const res = await fetch(`${SB_URL}/rest/v1/columns`, {
    method: 'POST', headers: HEADERS, body: JSON.stringify(payload)
  });
  const data = await res.json();
  return { data, error: res.ok ? null : data };
}

export async function updateColumn(id, payload) {
  const res = await fetch(`${SB_URL}/rest/v1/columns?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH', headers: HEADERS, body: JSON.stringify(payload)
  });
  const data = await res.json();
  return { data, error: res.ok ? null : data };
}

export async function deleteColumn(id) {
  const res = await fetch(`${SB_URL}/rest/v1/columns?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE', headers: HEADERS
  });
  return { error: res.ok ? null : new Error(res.status) };
}

export { SB_URL, SB_KEY, HEADERS };
