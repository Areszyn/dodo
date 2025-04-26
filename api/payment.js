// api/payment.js

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const API_KEY = "TugCUy8NMU6UWqdi.njr_PW3-yoDktCvbBZahUhFfmp1zTw4Wezl--2f9-jbkgoPb";

    try {
      const response = await fetch('https://api.dodopayments.com/v1/payment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: req.body.amount,
          currency: req.body.currency,
          description: req.body.description || "Test Payment",
        }),
      });

      const data = await response.json();
      res.status(response.status).json(data);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
