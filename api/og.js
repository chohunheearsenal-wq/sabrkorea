const fs = require('fs');
const path = require('path');
const url = require('url');

const SUPABASE_URL = 'https://suwyafmirxnmtaonxlqo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1d3lhZm1pcnhubXRhb254bHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTA3ODYsImV4cCI6MjA5Mzk4Njc4Nn0.I0CCH7oP-6BvNS1XTDk0G2tRbLooKGh7vyy8ziP6P5c';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

module.exports = async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathMatch = (parsed.pathname || '').match(/^\/col\/(.+)$/);
  const colId = pathMatch ? pathMatch[1] : (parsed.query.col || req.query?.col);

  const indexPath = path.join(process.cwd(), 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  if (colId) {
    try {
      const apiRes = await fetch(
        `${SUPABASE_URL}/rest/v1/columns?id=eq.${encodeURIComponent(colId)}&select=title_ko,title_en,summary_ko,summary_en`,
        { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
      );
      const data = await apiRes.json();

      if (data && data[0]) {
        const col = data[0];
        const title   = escapeHtml(col.title_ko   || col.title_en   || 'SABR Korea');
        const desc    = escapeHtml(col.summary_ko  || col.summary_en || 'SABR 한국 챕터 칼럼');
        const pageUrl = `https://www.sabrkorea.com/col/${colId}`;
        const imgUrl  = `https://www.sabrkorea.com/api/thumb?col=${colId}`;

        html = html
          .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`)
          .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${desc}">`)
          .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${imgUrl}">`)
          .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${pageUrl}">`)
          .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`)
          .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${desc}">`);
      }
    } catch (e) {}
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.send(html);
};
