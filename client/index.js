var map;
var service;
var infowindow;

async function initMap() {
  const leeds = new google.maps.LatLng(53.801277, -1.548567);
  infowindow = new google.maps.InfoWindow({});

  map = new google.maps.Map(document.getElementById("map"), {
    center: leeds,
    zoom: 15,
  });
  service = new google.maps.places.PlacesService(map);
  const results = await fetch("http://localhost:5000/location")
    .then((resp) => resp.json())
    .then(({ formatedData }) => formatedData);

  for (var item in results) {
    const location = results[item];
    const requestText = {
      query: location["name"],
      fields: ["name", "geometry", "formatted_address", "types", "rating"],
      locationBias: leeds,
    };
    service.findPlaceFromQuery(requestText, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    });
    await sleep(500);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createMarker(place) {
  const contentString =
    `<h1">${place.name}</h1>` +
    `<p>Rating: ${place.rating}</p>` +
    `<p>Hospitality: ${place.types[0]}</p>` +
    `${place.formatted_address}`;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}
