export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ODDS_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Odds API key not configured' });

  const { type, eventId } = req.query;

  try {
    let url;
    if (type === 'props' && eventId) {
      url = `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/${eventId}/odds?apiKey=${apiKey}&regions=us&markets=player_pass_yds,player_pass_tds,player_rush_yds,player_reception_yds,player_receiving_tds,player_rushing_tds&oddsFormat=american`;
    } else if (type === 'events') {
      url = `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events?apiKey=${apiKey}`;
    } else {
      url = `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?apiKey=${apiKey}&regions=us&markets=h2h,spreads,totals&oddsFormat=american&bookmakers=fanduel,draftkings,betmgm,caesars`;
    }

    const r = await fetch(url);
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.message || 'Odds API error' });
    res.setHeader('Cache-Control', 's-maxage=300');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
