const https = require('https');

function fetchImages(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
        let match;
        const urls = new Set();
        while ((match = imgRegex.exec(data)) !== null) {
          urls.add(match[1]);
        }
        resolve(Array.from(urls));
      });
    });
  });
}

Promise.all([
  fetchImages('https://qapi.cz/servis-oken/'),
  fetchImages('https://qapi.cz/stinici/')
]).then(([servis, stinici]) => {
  console.log('--- SERVIS ---');
  console.log(servis.join('\n'));
  console.log('--- STINICI ---');
  console.log(stinici.join('\n'));
});
