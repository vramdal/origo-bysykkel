import {
  AutoDiscoveryFeedType,
  FetchState,
  Seconds,
  Seconds1970,
  StationInformationFeedType,
  StationInfoType,
  StationStatusFeedType,
  StationStatusType,
} from './Types';
import { getFeedUrl } from './OsloBysykkelApi';

export const FETCH_AUTODISCOVERY = 'AUTODISCOVERY_COMPLETE';
export const FETCH_STATION_INFORMATION = 'STATION_INFORMATION_FETCHED';
export const FETCH_STATION_STATUS = 'STATION_STATUS_FETCHED';
export const FETCH_FAILED = 'FETCH_FAILED';

export const NEVER = -1;

export interface SystemState {
  urls: {
    stationInfo?: string;
    stationStatus?: string;
  };
  lastUpdated: {
    [FETCH_AUTODISCOVERY]: Seconds1970;
    [FETCH_STATION_INFORMATION]: Seconds1970;
    [FETCH_STATION_STATUS]: Seconds1970;
  };
  ttl: {
    [FETCH_AUTODISCOVERY]: Seconds;
    [FETCH_STATION_INFORMATION]: Seconds;
    [FETCH_STATION_STATUS]: Seconds;
  };
  fetchStates: {
    [FETCH_AUTODISCOVERY]: FetchState;
    [FETCH_STATION_INFORMATION]: FetchState;
    [FETCH_STATION_STATUS]: FetchState;
  };
  fetchState: FetchState;
  stationInfo?: Array<StationInfoType>;
  stationStatus?: Array<StationStatusType>;
}

export interface AutoDiscoveryCompleteAction {
  type: typeof FETCH_AUTODISCOVERY;
  payload: AutoDiscoveryFeedType;
}

export interface StationInformationFetchedAction {
  type: typeof FETCH_STATION_INFORMATION;
  payload: StationInformationFeedType;
}

export interface StationStatusFetchedAction {
  type: typeof FETCH_STATION_STATUS;
  payload: StationStatusFeedType;
}

export interface FetchErrorAction {
  type: typeof FETCH_FAILED;
  actionName: typeof FETCH_STATION_STATUS | typeof FETCH_STATION_INFORMATION | typeof FETCH_AUTODISCOVERY;
}

const defaultState: SystemState = {
  urls: {
    stationInfo: undefined,
    stationStatus: undefined,
  },
  lastUpdated: {
    [FETCH_AUTODISCOVERY]: NEVER,
    [FETCH_STATION_INFORMATION]: NEVER,
    [FETCH_STATION_STATUS]: NEVER,
  },
  ttl: {
    [FETCH_AUTODISCOVERY]: Infinity,
    [FETCH_STATION_INFORMATION]: 60,
    [FETCH_STATION_STATUS]: 20,
  },
  fetchStates: {
    [FETCH_AUTODISCOVERY]: FetchState.INITIALIZING,
    [FETCH_STATION_INFORMATION]: FetchState.INITIALIZING,
    [FETCH_STATION_STATUS]: FetchState.INITIALIZING,
  },
  fetchState: FetchState.INITIALIZING,
  stationInfo: undefined,
  stationStatus: undefined,
};

export type FetchSuccessActionTypes =
  | AutoDiscoveryCompleteAction
  | StationInformationFetchedAction
  | StationStatusFetchedAction;

export type ActionTypes = FetchSuccessActionTypes | FetchErrorAction;

export function reducer(state = defaultState, action: ActionTypes): SystemState {
  if (action.type === FETCH_FAILED) {
    const fetchStates = { ...state.fetchStates, [action.actionName]: FetchState.FAILURE };
    return {
      ...state,
      fetchState: FetchState.FAILURE,
      fetchStates,
    };
  }
  if (!action.payload || state.lastUpdated[action.type] >= action.payload.last_updated) {
    return state;
  } else {
    const lastUpdated = { ...state.lastUpdated, [action.type]: action.payload.last_updated };
    const ttl = { ...state.ttl, [action.type]: action.payload.ttl };
    const fetchStates = { ...state.fetchStates, [action.type]: FetchState.SUCCESS };
    const fetchState =
      (fetchStates[FETCH_STATION_STATUS] === FetchState.SUCCESS &&
        fetchStates[FETCH_STATION_INFORMATION] === FetchState.SUCCESS &&
        fetchStates[FETCH_AUTODISCOVERY] === FetchState.SUCCESS &&
        FetchState.SUCCESS) ||
      ((fetchStates[FETCH_STATION_STATUS] === FetchState.FAILURE ||
        fetchStates[FETCH_STATION_INFORMATION] === FetchState.FAILURE ||
        fetchStates[FETCH_AUTODISCOVERY] === FetchState.FAILURE) &&
        FetchState.FAILURE) ||
      FetchState.INITIALIZING;
    const updatedState = { ...state, lastUpdated, fetchState, ttl, fetchStates };
    switch (action.type) {
      case FETCH_AUTODISCOVERY:
        return {
          ...updatedState,
          urls: {
            stationInfo: getFeedUrl(action.payload, 'station_information'),
            stationStatus: getFeedUrl(action.payload, 'station_status'),
          },
        };
      case FETCH_STATION_INFORMATION:
        return {
          ...updatedState,
          stationInfo: action.payload.data.stations.sort((station1, station2) =>
            station1.name < station2.name ? -1 : 1,
          ),
        };
      case FETCH_STATION_STATUS:
        return {
          ...updatedState,
          stationStatus: action.payload.data.stations,
        };
      default:
        return state;
    }
  }
}
