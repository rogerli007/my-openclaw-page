// netlify/functions/search.js
const fetch = require('node-fetch');
exports.handler = async function(event, context) {
  const key = process.env.BRAVE_API_KEY;
  if (!key) return { statusCode: 500, body: 'Missing BRAVE_API_KEY' };
  const q = event.queryStringParameters?.q;
  if (!q) return { statusCode: 400, body: 'Missing query param q' };

  const url = `https://search.brave.com/api/search?count=5&query=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
  if (!res.ok) return { statusCode: res.status, body: 'Error from Brave API' };
  const json = await res.json();
  const results = json.data.map(item => ({ title: item.title, url: item.url, description: item.snippet ?? '' }));
  return { statusCode: 200, body: JSON.stringify({ results }), headers: { 'Content-Type': 'application/json' } };
};