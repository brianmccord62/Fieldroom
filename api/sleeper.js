export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { path } = req.query;
  if (!path) return res.status(400).json({ error: 'Missing path' });

  try {
    const url = 'https://api.sleeper.app/v1/' + path;
    const r = await fetch(url, {
      headers: { 'User-Agent': 'FieldRoom/1.0' }
    });

    if (!r.ok) {
      if (r.status === 404) return res.status(404).json({ error: 'Not found — check your Sleeper username' });
      return res.status(r.status).json({ error: 'Sleeper API error: ' + r.status });
    }

    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=60');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
