const path = require('path');
const process = require('process');
const os = require('os');
const fs = require('fs');

if (process.argv.length >= 3 && process.argv[2] == 'help') {
  console.log('usage: node serve-cordova.js [isDebug:bool=true] [webProt=8000]');
  process.exit();
}

const baseDir = process.cwd();
const ip = os.networkInterfaces().en0.filter(item => item.family === 'IPv4')[0].address;
const ENV = { debug: 'debug', production: 'production' };
const env = (process.argv[2] || 'true') === 'true' ? ENV.debug : ENV.production;
const webPort = process.argv[3] || 8000;

const changeConfigXml = () => {
  const webUrl = env === ENV.debug ? `http://${ip}:${webPort}` : 'index.html';
  const configPath = path.join(baseDir, '..', 'config.xml');
  let content = fs.readFileSync(configPath).toString();
  const contentPattern = `<content (.*)src="[^"]*"(.*)/>`;
  const contentRegex = new RegExp(contentPattern);
  content = content.replace(contentRegex, `<content $1src="${webUrl}"$2/>`);
  // console.log(content);
  if (env === ENV.debug) {
    const navPattern = `(<allow-navigation .*)href="[^"]*"(.*/>)`;
    const navRegex = new RegExp(navPattern);
    content = content.replace(navRegex, `$1href="${webUrl}"$2`);
  }
  // console.log(content);
  fs.writeFileSync(configPath, content);
};

changeConfigXml();
process.exit();
