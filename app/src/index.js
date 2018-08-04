const puppeteer = require('puppeteer');
const request = require('request-promise-native');
const getContainerIP = require('./util/getContainerIP');

(async () => {
  // Workaround for https://github.com/GoogleChrome/puppeteer/issues/2242
  const chrome = await getContainerIP('chrome');

  const options = {
    uri: `http://${chrome}:9222/json/version`,
    json: true,
    resolveWithFullResponse: true
  };

  request(options)
    .then((res) => {
      let webSocket = res.body.webSocketDebuggerUrl;
      console.log(`WebsocketUrl: ${webSocket}`);

      (async () => {
        try {
          const browser = await puppeteer.connect({browserWSEndpoint: webSocket});
          const page    = await browser.newPage();

          page.setJavaScriptEnabled(true);
          await page.goto(`https://www.google.com`, { waitUntil: 'networkidle0' });
        }
        catch(e) {
          console.log(e);
        }
      })();
    })
    .catch((err) => {
      console.log(err.message);
    });
})();