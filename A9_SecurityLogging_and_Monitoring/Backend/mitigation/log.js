const fs = require('fs');

fs.readFile('logger.log', 'UTF-8', (err, data) => {
  const len1 = data.match(/"level"."warn"/g) == null ? 0 : data.match(/"level"."warn"/g).length;
  const len2 = data.match(/"level"."error"/g) == null ? 0 : data.match(/"level"."error"/g).length;
  const len3 = data.match(/"level"."info"/g) == null ? 0 : data.match(/"level"."info"/g).length;
  console.log('     Log File Analysis  ');
  console.log('----------------------------');
  console.log(' warns  errors  infos ');
  console.log(`   ${len1}      ${len2}      ${len3} `);
  console.log('----------------------------');
  if (len1 > 30) {
    console.log('Immediate attention required');
  }
});
