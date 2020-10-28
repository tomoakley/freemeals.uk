import GSheetReader from "g-sheets-api";
import sphereKnn from "sphere-knn";
import { getUniqueVenues } from "../utils/getUniqueVenues";

const sheet1 = require("../../data/sheet1.json");

export async function handler(event, context) {
  try {
    const { location, coords } = event.queryStringParameters;
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
          // first result from google sheets is null
          const [_, ...resultsNoNull] = results
          const allResults = [ ...resultsNoNull, ...sheet1 ].filter((provider) => provider !== null);
          const uniqueAllResults = getUniqueVenues(allResults);

          if (coords != null) {
            const [latitude, longitude] = coords.split(",");
            const resultsWithCoords = uniqueAllResults.map((provider) => {
              return {
                ...provider,
                latitude: Number(provider.latitude),
                longitude: Number(provider.longitude),
              };
            });

            const geolookupData = sphereKnn(resultsWithCoords);
            const uniqueGeolocatedResults = geolookupData(latitude, longitude, 10);

            resolve(uniqueGeolocatedResults);
          } else {
            resolve(uniqueAllResults);
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
