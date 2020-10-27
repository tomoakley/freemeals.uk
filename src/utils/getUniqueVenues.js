export const getUniqueVenues = (data) => {
  const providerData = data.filter((venue, index) => {
    const _venue = JSON.stringify(venue);
    return index === data.findIndex(obj => {
      return JSON.stringify(obj) === _venue;
    });
  });
  return providerData;
}