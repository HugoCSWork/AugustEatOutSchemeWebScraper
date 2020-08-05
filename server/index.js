const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const app = express();

app.use(volleyball);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Location API!",
  });
});

app.get("/location", async (req, res, next) => {
  const url =
    "https://www.tax.service.gov.uk/eat-out-to-help-out/find-a-restaurant/results?postcode=LS1+2FH";
  const browser = await puppeteer.launch();
  await browser
    .newPage()
    .then((page) => {
      return page.goto(url).then(() => {
        return page.content();
      });
    })
    .then((html) => {
      const $ = cheerio.load(html);
      const restaurantData = [];
      const formatedData = [];
      $("#main-content > div > div > ol > li").each(function () {
        restaurantData.push($(this).text());
      });
      restaurantData.forEach((item, index) => {
        const formattedItem = item.replace("\n", "").split("\n");
        formatedData.push({
          name: formattedItem[0].trim(),
          distance: formattedItem[1].trim(),
          location: formattedItem[2].trim(),
        });
      });
      res.json({ formatedData });
    })
    .catch((err) => next(new Error(`Error retrieving data: ${err}`)));
  browser.close();
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found - " + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
