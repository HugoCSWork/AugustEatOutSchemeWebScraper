# Eat Out August Scheme - Web Scraper

## **Description**

Map displaying all discounts for August scheme in my area. Data is scraped from <https://www.tax.service.gov.uk/eat-out-to-help-out/find-a-restaurant/>

## **Setup**

- Create a Google API Key restricting it to Maps Javascript and Places, retrieving this data does cost money.
- Replace APIKEY in HTML file with API Key.

### **Technologies**

#### Frontend

- HTML
- CSS
- JavaScript
- Google Maps API

#### Backend

- Express
- JavaScript
- Puppeteer & cheerio for web scraping

### Goals -

- [x] Create server
- [x] Create Location Router
- [x] Web scrape specified page
- [x] Create Google Maps API Key (Javascript and Places)
- [x] Create basic UI connected to google maps
- [x] Connect client to server
- [x] Create markers based on data retrieved from API
- [x] Markers with details when clicked

### Stretch -

- [ ] User can search for location to find discounts
  - [ ] Send a post request to backend to web scrape specified area
  - [ ] Move map to where searched
  - [ ] Modify LocationBias so it searched for discounts in that area
