import fetch from "node-fetch";

const sheet1 = require("../../data/sheet1.json");

export async function handler(event, context) {
  try {
      const withCoords = sheet1.map(async (provider) => {
        const data = await (
          await fetch(
            `https://api.postcodes.io/postcodes/${provider["provider postcode"]}`
          )
        ).json();
        if (data.status === 200) {
          const { latitude, longitude } = data.result;
          const providerWithCoords = {
            ...provider,
            latitude: latitude,
            longitude: longitude,
          };
          return providerWithCoords;
        }
      });
      console.log(withCoords);
      const resolved = await Promise.all(withCoords);
      console.log(resolved);
    return {
      statusCode: 200,
      body: JSON.stringify(resolved),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
