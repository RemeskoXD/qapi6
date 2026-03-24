import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://qapi.cz';
  const routes = [
    '',
    '/servis-oken',
    '/garazova-vrata',
    '/stinici-technika',
    '/lp/kontrola-oken-zdarma',
    '/lp/tajny-trik-okna',
    '/lp/zabijaci-garazovych-vrat',
  ];

  const urlList = routes.map(route => `${baseUrl}${route}`);

  const payload = {
    host: 'qapi.cz',
    key: '73dead5d6dd84a0c9eeb23e0125f6595',
    keyLocation: 'https://qapi.cz/73dead5d6dd84a0c9eeb23e0125f6595.txt',
    urlList: urlList,
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'URLs successfully submitted to IndexNow.' });
    } else {
      const errorText = await response.text();
      return NextResponse.json({ success: false, message: 'Failed to submit URLs to IndexNow.', error: errorText }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'An error occurred while submitting to IndexNow.', error: String(error) }, { status: 500 });
  }
}
