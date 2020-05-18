export interface AutoDiscoveryFeedType {
  last_updated: Seconds1970;
  ttl: Seconds;
  data: {
    nb: {
      feeds: [
        {
          url: string;
          name: 'system_information';
        },
        {
          url: string;
          name: 'station_information';
        },
        {
          url: string;
          name: 'station_status';
        },
      ];
    };
  };
}

export type Seconds1970 = number;
export type Seconds = number;

export interface SystemInformationFeedType {
  last_updated: Seconds1970;
  ttl: Seconds;
  data: {
    system_id: string;
    language: string;
    name: string;
    operator: string;
    timezone: string;
    phone_number: string;
    email: string;
  };
}

export interface StationInfoType {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
}

export interface StationInformationFeedType {
  last_updated: Seconds1970;
  ttl: Seconds;
  data: {
    stations: [StationInfoType];
  };
}

export interface StationStatusType {
  is_installed: number;
  is_renting: number;
  num_bikes_available: number;
  num_docks_available: number;
  last_reported: Seconds1970;
  is_returning: number;
  station_id: string;
}

export interface StationStatusFeedType {
  last_updated: Seconds1970;
  ttl: Seconds;
  data: {
    stations: [StationStatusType];
  };
}

export enum FetchState {
  INITIALIZING = 'INITIALIZING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}
