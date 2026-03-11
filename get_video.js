const https = require('https');

https.get('https://qapi.cz/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const matches = data.match(/https:\/\/[^"']+\.mp4/g);
    if (matches) {
      console.log(Array.from(new Set(matches)).join('\n'));
    } else {
      console.log('No mp4 found');
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
