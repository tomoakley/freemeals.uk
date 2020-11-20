import { getUniqueVenues } from "./getUniqueVenues";

const data = [
  {
    "provider name": "Athena B",
    "provider town/city": "London"
  },
  {
    "provider name": "Athena B",
    "provider town/city": "London"
  },
  {
    "provider name": "Sam's Cafe",
    "provider town/city": "Bristol"
  },
];

const uniqueData = [
  {
    "provider name": "Athena B",
    "provider town/city": "London"
  },
  {
    "provider name": "Sam's Cafe",
    "provider town/city": "Bristol"
  }
];

it('Removes duplicate objects', () => {
  expect(getUniqueVenues(data)).toStrictEqual(uniqueData)
  expect(getUniqueVenues(data).length).toBe(data.length - 1)
})
