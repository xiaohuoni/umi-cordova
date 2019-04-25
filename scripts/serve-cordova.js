const path = require('path');
const process = require('process');
const childProcess = require('child_process');
const os = require('os');
const fs = require('fs');

if (process.argv.length < 3) {
  console.log('usage: node serve-cordova.js [platform] [cordovaPort=8001]');
  process.exit();
}

const baseDir = process.cwd();
const platform = process.argv[2];
const ip = os.networkInterfaces().en0.filter(item => item.family === 'IPv4')[0].address;
const cordovaPort = process.argv[3] || 8001;

const serveCordova = () => {
  const dirToServe = path.join('..', 'platforms', platform, 'platform_www');
  const serveProcess = childProcess.exec(
    'serve -l 8001',
    { stdio: 'inherit', cwd: dirToServe },
    (error, stdout, stderr) => {
      console.error(error.message);
      console.log(stdout.toString('utf8'));
    }
  );
  console.log(`cordova serve(pid:${serveProcess.pid}) on ${ip}:${cordovaPort}`);
};

const changeCordovaAddress = () => {
  const documentEjsPath = path.join(baseDir, '..', 'src', 'pages', 'document.ejs');
  let documentEjs = fs.readFileSync(documentEjsPath).toString();
  const regexPattern = `http://[^/]*(:[0-9]+)?/`;
  const regex = new RegExp(regexPattern);
  documentEjs = documentEjs.replace(regex, `http://${ip}:${cordovaPort}/`);
  fs.writeFileSync(documentEjsPath, documentEjs);
};

serveCordova()
changeCordovaAddress();
