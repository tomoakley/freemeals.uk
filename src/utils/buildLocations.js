export const buildLocationSet = (providerData) => {
  const locationSet = new Set();
  providerData.forEach((provider) => {
    console.log(provider);
    locationSet.add(provider["provider town/city"]);
  });
  return locationSet;
}