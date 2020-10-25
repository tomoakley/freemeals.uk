import GSheetReader from "g-sheets-api";
import sphereKnn from "sphere-knn";

const sheet1 = require("../../data/sheet1.json");

export async function handler(event, context) {
  try {
    const { location, coords } = event.queryStringParameters;
    console.log(location);
    const data = await new Promise((resolve, reject) => {
      GSheetReader(
        {
          sheetId: "1OaRn7UHsFpFLOfTeiUnIBr7ofjcemBEvf_gl5b1PoTY",
          sheetNumber: 5,
          returnAllResults: location === "All" ? true : false,
          filter: {
            "provider town/city": location,
          },
        },
        (results) => {
          const resultsWithSheet1 = [ ...results, ...sheet1 ].filter(result => result != null);
          if (coords != null) {
            const [latitude, longitude] = coords.split(",");

            const resultsWithCoords = resultsWithSheet1.map((provider) => {
              return {
                ...provider,
                latitude: Number(provider.latitude),
                longitude: Number(provider.longitude),
              };
            });

            const geolookupData = sphereKnn(resultsWithCoords);
            const geolocatedResults = geolookupData(latitude, longitude, 10);

            resolve(geolocatedResults);
          } else {
            resolve(resultsWithSheet1);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
