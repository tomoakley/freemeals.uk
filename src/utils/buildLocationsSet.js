export const buildLocationsSet = (providerData) => {
  const locationsSet = new Set();
  providerData.forEach((provider) => {
    locationsSet.add(provider["provider town/city"]);
  });
  return locationsSet;
}