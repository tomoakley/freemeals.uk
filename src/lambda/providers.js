import GSheetReader from "g-sheets-api";
import sphereKnn from "sphere-knn";

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
            "provider town/city": location
          }
        },
        results => {
          if (coords != null) {
            const [latitude, longitude] = "53.0688228,-3.056984".split(",");

            const resultsWithCoords = results.map(provider => {
              return {
                ...provider,
                latitude: Number(provider.latitude),
                longitude: Number(provider.longitude)
              };
            });

            const geolookupData = sphereKnn(resultsWithCoords);
            const geolocatedResults = geolookupData(latitude, longitude, 10);

            resolve(geolocatedResults);
          } else {
            resolve(results);
          }
        },
        error => {
          reject(error);
        }
      );
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
