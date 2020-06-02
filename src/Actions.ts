/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  FETCH_AUTODISCOVERY,
  FETCH_FAILED,
  FETCH_STATION_INFORMATION,
  FETCH_STATION_STATUS,
  SystemState,
} from './Reducer';
import { fetchJson, URL_AUTODISCOVERY } from './OsloBysykkelApi';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Seconds, StationInformationFeedType, StationStatusFeedType } from './Types';

type FetchableFeed = StationStatusFeedType | StationInformationFeedType;

export const doFetchFeed = (
  actionName: typeof FETCH_STATION_INFORMATION | typeof FETCH_STATION_STATUS,
): ThunkAction<void, SystemState, unknown, Action<string>> => (
  dispatch,
  getState,
): ReturnType<typeof fetchJson | typeof dispatch> => {
  const fName = actionName === FETCH_STATION_INFORMATION ? 'stationInfo' : 'stationStatus';
  const url = getState().urls[fName];
  if (!url) {
    // Skjer ved bruk av Redux Dev Tools i Chrome
    return dispatch({
      type: 'NO_OP',
    });
  }
  return fetchJson<FetchableFeed>(url)
    .then((body: FetchableFeed) => {
      dispatch({
        type: actionName,
        payload: body,
      });
      dispatch(reschedule(actionName));
    })
    .catch((error: Error) => {
      console.error(`Error fetching ${fName} from ${url}`, error);
      dispatch({
        type: FETCH_FAILED,
        actionName: actionName,
      });
      dispatch(reschedule(actionName));
    });
};

function reschedule(actionName: typeof FETCH_STATION_INFORMATION | typeof FETCH_STATION_STATUS) {
  return (dispatch: ThunkDispatch<SystemState, unknown, Action<string>>, getState: () => SystemState): void => {
    const nextFetch: Seconds = getState().ttl[actionName];
    if (nextFetch < Infinity) {
      setTimeout(() => {
        dispatch(doFetchFeed(actionName));
      }, nextFetch * 1000);
    }
  };
}

export const doInitialFetch = (): ThunkAction<void, SystemState, unknown, Action<string>> => (
  dispatch,
): ReturnType<typeof fetchJson> => {
  return fetchJson(URL_AUTODISCOVERY)
    .then((r) => {
      dispatch({
        type: FETCH_AUTODISCOVERY,
        payload: r,
      });
      dispatch(doFetchFeed(FETCH_STATION_INFORMATION));
      dispatch(doFetchFeed(FETCH_STATION_STATUS));
    })
    .catch((error: Error) => {
      console.error('Error doing autodiscovery', error);
      dispatch({
        type: FETCH_FAILED,
        actionName: FETCH_AUTODISCOVERY,
      });
    });
};

export const _testing = { reschedule };
