const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const puppeteer = require('puppeteer')
const hb = require('handlebars')
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post("/", async (req, res) => {
  try {
    const data = {};
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const template = hb.compile(`<div>123</div>`, { strict: true });
    const html = template(data);

    await page.setContent(html);
    const pdf = await page.pdf({ path: "email.pdf" });
    await page.close();
    res.status(200).json({ pdf });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
