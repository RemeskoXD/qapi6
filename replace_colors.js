const fs = require('fs');
const path = require('path');

const files = [
  'components/vrata-section.tsx',
  'components/servis-oken-section.tsx',
  'components/stinici-section.tsx',
  'components/kontakt-section.tsx',
  'components/hero.tsx',
  'components/services.tsx',
  'components/booking.tsx',
  'components/about.tsx',
  'components/partners.tsx',
  'components/garage-door-scroll.tsx',
  'components/navbar.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/rgba\(34,197,94/g, 'rgba(212,175,55');
    content = content.replace(/bg-primary text-background/g, 'bg-primary text-primary-foreground');
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
