import csv from "csvtojson";
import fetch from "node-fetch";
import {
  NAME,
  CLOSE_TIME,
  OPEN_TIME,
  INSTRUCTIONS,
  PROVIDER_SOURCE_URL,
  OFFERS,
  OFFER_DAYS,
  URL,
} from "../constants";

export async function handler(event, context) {
  return csv()
    .fromFile("/Users/tomoakley/Downloads/Kids Meals Form Data 1 - Sheet1.csv")
    .then(async (json) => {
      try {
        const convertedSheet = [];
        json.map((j) => {
          const trimAndGetAttrFromJ = (attr) => (j[attr] ? j[attr].trim() : "");
          convertedSheet.push({
            [NAME]: trimAndGetAttrFromJ("Org Name"),
            "provider address 1": trimAndGetAttrFromJ(
              "Street Address 1 (building number + street)"
            ),
            "provider address 2": trimAndGetAttrFromJ("Street Address 2"),
            "provider town/city": trimAndGetAttrFromJ("Town/City"),
            "provider postcode": trimAndGetAttrFromJ("Postcode"),
            "provider county": trimAndGetAttrFromJ("County"),
            "phone contact": trimAndGetAttrFromJ(
              "What is the organisation's phone number? Please include the area code."
            ),
            [URL]: trimAndGetAttrFromJ(
              "The website of the organisation giving the free meals"
            ),
            [OPEN_TIME]: trimAndGetAttrFromJ(
              "What time does the organisation open?"
            ),
            [CLOSE_TIME]: trimAndGetAttrFromJ(
              "What time does the organisation close?"
            ),
            [OFFER_DAYS]: trimAndGetAttrFromJ(
              "Which days are the meals available?"
            ),
            [OFFERS]: trimAndGetAttrFromJ(
              "Other info or description about the free meals"
            ),
            [INSTRUCTIONS]: trimAndGetAttrFromJ("How to claim the meal"),
            [PROVIDER_SOURCE_URL]: trimAndGetAttrFromJ(
              "The URL of their announcement"
            ),
          });
        });

        const withCoords = convertedSheet.map(async (provider) => {
          try {
            const data = await (
              await fetch(
                `https://api.postcodes.io/postcodes/${provider[
                  "provider postcode"
                ].trim()}`
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
          } catch (err) {
            console.log(err, provider);
          }
        });
        const resolved = await Promise.all(withCoords);
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
    })
    .catch((err) => {
      console.log(err);
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
      };
    });
}
