/* eslint-disable @typescript-eslint/camelcase */
import { AutoDiscoveryFeedType, StationInformationFeedType, StationStatusFeedType } from '../Types';

export const stationInformationFeedUrl = 'url-to-station-information-feed';
export const systemInformationFeedUrl = 'url-to-system-information-feed';
export const stationStatusFeedUrl = 'url-to-station-status-feed';

export const autoDiscoveryFeedContents: AutoDiscoveryFeedType = {
  last_updated: 1,
  data: {
    nb: {
      feeds: [
        {
          url: systemInformationFeedUrl,
          name: 'system_information',
        },
        {
          url: stationInformationFeedUrl,
          name: 'station_information',
        },
        {
          url: stationStatusFeedUrl,
          name: 'station_status',
        },
      ],
    },
  },
  ttl: 10,
};

export const stationInformationFeedContents: StationInformationFeedType = {
  last_updated: 1,
  ttl: 10,
  data: {
    stations: [
      { lat: 5, lon: 6, capacity: 7, address: 'Gata 1', name: 'Stasjon 1', station_id: '1' },
      { lat: 8, lon: 9, capacity: 10, address: 'Veien 2', name: 'Stasjon 2', station_id: '2' },
    ],
  },
};

export const stationStatusFeedContents: StationStatusFeedType = {
  last_updated: 1,
  ttl: 10,
  data: {
    stations: [
      {
        station_id: '1',
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        last_reported: 1,
        num_bikes_available: 7,
        num_docks_available: 8,
      },
      {
        station_id: '2',
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        last_reported: 1,
        num_bikes_available: 3,
        num_docks_available: 2,
      },
    ],
  },
};
