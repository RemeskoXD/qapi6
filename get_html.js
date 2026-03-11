const https = require('https');
const fs = require('fs');

https.get('https://qapi.cz/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('qapi.html', data);
    console.log('Saved to qapi.html');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
