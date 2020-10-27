import {buildAddressString} from './buildAddressString'

const data = {
  "provider name": "Athena B",
  "provider address 1": "27",
  "provider address 2": "Station Road",
  "provider town/city": "Portslade",
  "provider postcode": "Bn41 1gb",
  "provider county": "East Sussex",
  "phone contact": "01273 414803",
  "provider url": "https://www.athenab.co.uk/",
  "opening time": "11:00:00 AM",
  "closing time": "10:00:00 PM",
  "offer days": "Monday, Tuesday, Wednesday, Thursday",
  "FIELD12": "",
  "offer description": "Fish & Chips - 1 meal per child a day. Up to 3 per household.",
  "how to claim": "",
  "FIELD15": "",
  "provider source url": "https://twitter.com/thesimonsound/status/1319609645095374849?s=20",
  "latitude": 50.83366,
  "longitude": -0.207274
}

it('returns a formatted address string', () => {
  expect(buildAddressString(data)).toBe('27, Station Road, East Sussex, Portslade, Bn41 1gb')
})