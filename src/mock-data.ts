/* eslint-disable */
export const stationStatus1 = {
  last_updated: 1589788935,
  ttl: 10,
  data: {
    stations: [
      {
        station_id: '1755',
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        last_reported: 1589788935,
        num_bikes_available: 11,
        num_docks_available: 22,
      },
      {
        station_id: '1101',
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        last_reported: 1589788931,
        num_bikes_available: 5,
        num_docks_available: 19,
      },
    ],
  },
};

export const stationStatus2 = {
  last_updated: 1589788955,
  ttl: 10,
  data: {
    stations: [
      {
        station_id: '1755',
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        last_reported: 1589788935,
        num_bikes_available: 0,
        num_docks_available: 33,
      },
      {
        station_id: '1101',
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        last_reported: 1589788931,
        num_bikes_available: 24,
        num_docks_available: 0,
      },
    ],
  },
};

const URL_STATION_INFORMATION = 'http://gbfs.urbansharing.com/oslobysykkel.no/station_information.json';
const URL_STATION_STATUS = 'http://gbfs.urbansharing.com/oslobysykkel.no/station_status.json';

export const autoDiscoveryResponse = {
  last_updated: 1589749490,
  ttl: 10,
  data: {
    nb: {
      feeds: [
        {
          name: 'system_information',
          url: 'http://gbfs.urbansharing.com/oslobysykkel.no/system_information.json',
        },
        {
          name: 'station_information',
          url: URL_STATION_INFORMATION,
        },
        {
          name: 'station_status',
          url: URL_STATION_STATUS,
        },
      ],
    },
  },
};

export const stationInformationResponse = {
  last_updated: 1589788529,
  ttl: 10,
  data: {
    stations: [
      {
        station_id: '1755',
        name: 'Aker Brygge',
        address: 'Aker Brygge',
        lat: 59.91118372188379,
        lon: 10.730034556850455,
        capacity: 33,
      },
      {
        station_id: '1101',
        name: 'Stortingstunellen',
        address: 'R\u00e5dhusgata 34',
        lat: 59.91065301806209,
        lon: 10.737365277561025,
        capacity: 24,
      },
    ],
  },
};
