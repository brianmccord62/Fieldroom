export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const { path } = req.query;
  if (!path) return res.status(400).json({ error: 'Missing path' });
  try {
    const url = 'https://api.sleeper.app/v1/' + path;
    const r = await fetch(url, { headers: { 'User-Agent': 'FieldRoom/1.0' } });
    if (r.status === 404) return res.status(404).json({ error: 'not_found' });
    if (!r.ok) return res.status(r.status).json({ error: 'sleeper_error_' + r.status });
    const data = await r.json();
    // No caching for roster/transaction data so we always get live state
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    return res.status(200).json(data);
  } catch (err) { return res.status(500).json({ error: err.message }); }
}
