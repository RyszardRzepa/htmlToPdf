const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const puppeteer = require('puppeteer')
const hb = require('handlebars')
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post("/", async (req, res) => {
  const { emailHtml } = req.body || {};
  
  if(!emailHtml) {
    res.status(400).send("Missing emailHtml")
    return;
  }

  const data = {};
  const template = hb.compile(email, { strict: true });
  const result = template(data);
  const html = result;

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(html)
  const pdf = await page.pdf({ path: 'email.pdf' })
  await browser.close()

  res.status(200).json({ pdf })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
