const https = require('https');

https.get('https://qapi.cz/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const matches = data.match(/<video[^>]*>[\s\S]*?<\/video>/gi);
    if (matches) {
      console.log(matches.join('\n'));
    } else {
      console.log('No video found');
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
