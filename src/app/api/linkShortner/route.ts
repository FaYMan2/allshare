import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { url } = await req.json(); // Extract `url` from the request body
  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.tinyurl.com/create?api_token=${process.env.TINY_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        domain: 'tinyurl.com',
        description: 'Shortened upload link',
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to shorten URL', details: data }, { status: 500 });
    }

    return NextResponse.json({ shortenedUrl: data.data.tiny_url }, { status: 200 });
  } catch (error) {
    console.error('Error calling TinyURL API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
