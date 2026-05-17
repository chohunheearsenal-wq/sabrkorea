const SUPABASE_URL = 'https://suwyafmirxnmtaonxlqo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1d3lhZm1pcnhubXRhb254bHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTA3ODYsImV4cCI6MjA5Mzk4Njc4Nn0.I0CCH7oP-6BvNS1XTDk0G2tRbLooKGh7vyy8ziP6P5c';

module.exports = async (req, res) => {
  const colId = req.query.col;
  if (!colId) return res.status(400).send('Missing col');

  try {
    const apiRes = await fetch(
      `${SUPABASE_URL}/rest/v1/columns?id=eq.${encodeURIComponent(colId)}&select=thumbnail`,
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );
    const data = await apiRes.json();
    const thumbnail = data?.[0]?.thumbnail;

    if (!thumbnail) {
      return res.redirect('https://www.sabrkorea.com/logo.png');
    }

    // base64에서 이미지 타입과 데이터 추출
    const match = thumbnail.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) return res.redirect('https://www.sabrkorea.com/logo.png');

    const mimeType = match[1];
    const imgBuffer = Buffer.from(match[2], 'base64');

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(imgBuffer);
  } catch (e) {
    res.redirect('https://www.sabrkorea.com/logo.png');
  }
};
