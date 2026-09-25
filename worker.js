export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== '/api/visits') return new Response('Not found', { status: 404 });
    if (request.method !== 'GET' && request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
    const country = /^[A-Z]{2}$/.test(request.cf?.country ?? '') ? request.cf.country : 'XX';
    const statements = [env.DB.prepare('CREATE TABLE IF NOT EXISTS visits (country TEXT PRIMARY KEY, count INTEGER NOT NULL)')];
    if (request.method === 'POST') statements.push(env.DB.prepare('INSERT INTO visits VALUES (?, 1) ON CONFLICT(country) DO UPDATE SET count = count + 1').bind(country));
    statements.push(env.DB.prepare('SELECT country, count FROM visits ORDER BY count DESC'));
    const results = await env.DB.batch(statements);
    return Response.json(results.at(-1).results, { headers: { 'Cache-Control': 'no-store' } });
  },
};
