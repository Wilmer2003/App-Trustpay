const fs = require('fs');
let text = fs.readFileSync('js/data.js', 'utf8');

const images = {
  103: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80',
  104: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
  105: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
  106: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
  107: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80',
  108: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=80',
  109: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
  110: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80',
  201: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
  202: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
  203: 'https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?auto=format&fit=crop&w=800&q=80',
  204: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&w=800&q=80',
  205: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
  206: 'https://images.unsplash.com/photo-1610381014841-f76ea10c4d81?auto=format&fit=crop&w=800&q=80',
  207: 'https://images.unsplash.com/photo-1584820927498-cafe5c152a00?auto=format&fit=crop&w=800&q=80',
  208: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=800&q=80',
  209: 'https://images.unsplash.com/photo-1559591937-beaae02c1186?auto=format&fit=crop&w=800&q=80',
  210: 'https://images.unsplash.com/photo-1631730486784-5456119f69ae?auto=format&fit=crop&w=800&q=80',
  301: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
  302: 'https://images.unsplash.com/photo-1550572017-edb799988225?auto=format&fit=crop&w=800&q=80',
  303: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80',
  304: 'https://images.unsplash.com/photo-1586942368476-0fbf6da921a9?auto=format&fit=crop&w=800&q=80',
  305: 'https://images.unsplash.com/photo-1577401239170-897940551f78?auto=format&fit=crop&w=800&q=80',
  306: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&q=80',
  307: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80'
};

const lines = text.split('\\n');
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  for (const [id, url] of Object.entries(images)) {
    if (line.includes(\`id: \${id}\`) && !line.includes('img:')) {
      // Find the last single quote which should be the emoji closing quote
      const lastQuote = line.lastIndexOf(\"'\");
      if (lastQuote !== -1) {
        // Insert img property before the closing brace
        // format is emoji: '🍕' } 
        // We want emoji: '🍕', img: 'url' }
        line = line.replace(/}\\s*,?\\s*$/, \`, img: '\${url}' }\`);
        // if there's a comma at the end, preserve it
        if (lines[i].trim().endsWith(',')) {
            line += ',';
        }
        lines[i] = line;
      }
    }
  }
}

fs.writeFileSync('js/data.js', lines.join('\\n'));
