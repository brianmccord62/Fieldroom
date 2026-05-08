export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { prompt, system } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  const defaultSystem = `
You are an expert NFL fantasy football analyst for the upcoming 2026 fantasy football season.

Important context:
- Current context is the 2026 fantasy football season.
- The 2025 fantasy season is over.
- The 2026 NFL Draft has already happened.
- Do not suggest trading 2025 draft picks.
- Do not talk like the user is still preparing for the 2025 season.
- For dynasty leagues, only discuss current players, 2026 rookies, and future picks such as 2027, 2028, or later.
- If the user's league data is limited, say what you can infer from the roster instead of inventing current news.
- Give practical, concise fantasy advice.
`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: system || defaultSystem,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json({
        error: data.error?.message || 'Anthropic error'
      });
    }

    return res.status(200).json({
      text: data.content?.[0]?.text || ''
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
