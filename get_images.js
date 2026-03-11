const https = require('https');

https.get('https://qapi.cz/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
    let match;
    const urls = new Set();
    while ((match = imgRegex.exec(data)) !== null) {
      urls.add(match[1]);
    }
    console.log(Array.from(urls).join('\n'));
  });
}).on('error', (err) => {
  console.error(err);
});
