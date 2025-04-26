// api/payment.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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
}
