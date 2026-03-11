import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  const apiKey = process.env.MAPKEY;

  if (!apiKey) {
    console.error('MAPKEY environment variable is not set');
    return NextResponse.json({ error: 'MAPKEY environment variable is not set' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${encodeURIComponent(q)}&countrycodes=cz&limit=5&format=json`);
    
    if (!response.ok) {
      throw new Error(`LocationIQ API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json({ error: 'Failed to fetch location data' }, { status: 500 });
  }
}
