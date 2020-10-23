import GSheetReader from "g-sheets-api";

export async function handler(event, context) {
  try {
    const { location } = event.queryStringParameters
    console.log(location)
    const data = await new Promise((resolve, reject) => {
      GSheetReader(
        {
          sheetId: "1OaRn7UHsFpFLOfTeiUnIBr7ofjcemBEvf_gl5b1PoTY",
          sheetNumber: 5,
          returnAllResults: location === 'All' ? true : false,
          filter: {
            'provider town/city': location
          }
        },
        (results) => {
          resolve(results);
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
