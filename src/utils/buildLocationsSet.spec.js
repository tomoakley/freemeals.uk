import { buildLocationsSet } from './buildLocationsSet'

const data = [
  {
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
},
{
    "provider name": "Matthews Yard",
    "provider address 1": "166 North End",
    "provider address 2": "",
    "provider town/city": "Croydon",
    "provider postcode": "CR0 1UF",
    "provider county": "",
    "phone contact": "",
    "provider url": "https://matthewsyard.com",
    "opening time": "8:00:00 AM",
    "closing time": "4:00:00 PM",
    "offer days": "Tuesday, Wednesday, Thursday, Friday",
    "FIELD12": "",
    "offer description": "Many of us know all too well how vital free school meals are. Both our founders benefited from them as children and both experienced hunger when that safety net was not available. \n \n Next week, we are offering up to 250 free meals for local children who need them (eat in or take away) and to help families have a half term treat, their parents or carers can pay just 50% for their own food and eat out as a family for as little as £4 in total. \n \n Choice of a cheeze and tomato sandwich, with a banana and a packet of crisps plus a glass of fresh orange or apple juice (available to eat in or take-away) or a kid's burger and fries with a glass of apple or orange juice to eat in.\n \n Both options are 100% vegan. \n \n Available from 10am until 3pm Tuesday 27th to Friday 30th October.",
    "how to claim": "Ask for it on arrival, or ask for the family meal deal if adults would like 50% offer.",
    "FIELD15": "",
    "provider source url": "https://www.facebook.com/297281256998607/posts/3611741948885838/",
    "latitude": 51.378265,
    "longitude": -0.102635
},
{
    "provider name": "Wonderberrys",
    "provider address 1": "Bursledon Brickworks Museum",
    "provider address 2": "Swanwick Lane",
    "provider town/city": "Southampton",
    "provider postcode": "SO31 7GW",
    "provider county": "Hampshire",
    "phone contact": "7825058868",
    "provider url": "https://instagram.com/wonderberrys",
    "opening time": "9:30:00 AM",
    "closing time": "4:00:00 PM",
    "offer days": "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
    "FIELD12": "",
    "offer description": "If you are struggling with lunches for your child next week we would like to provide a packed lunch for you to collect from our shop in Burseldon. These will be daily and on a first come first served basis, we can cater for 100 children over the course of the week. We are a small business still affected by the Corona lockdown but will help where we can.\n \n Lunches will consist of a cheese or ham sandwich, crisps, drink, fruit and chocolate bar.",
    "how to claim": "Please call 07825058868 between 2:30pm - 4pm the day before and your packed lunch will be ready to collect any time between 11:00-13:00 the next day.",
    "FIELD15": "",
    "provider source url": "https://www.instagram.com/p/CGr8qC4pZYa/?utm_source=ig_web_copy_link",
    "latitude": 50.887429,
    "longitude": -1.290277
},
]

it('Should return the provider town/city', () => {
  expect(buildLocationsSet(data).has('Portslade')).toBe(true)
  expect(buildLocationsSet(data).has('Croydon')).toBe(true)
  expect(buildLocationsSet(data).has('Southampton')).toBe(true)
  expect(buildLocationsSet(data).size).toBe(3)
})