import type { NextApiRequest, NextApiResponse } from 'next';

const API_BASE_URL = "https://api.sl.se/api2/LineData.json";
const API_KEY = process.env.TRAFIKLAB_API_KEY;

export const config = {
  api: {
    responseLimit: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = `${API_BASE_URL}?key=${API_KEY}&model=jour&DefaultTransportModeCode=BUS`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bus line stops' });
  }
}
