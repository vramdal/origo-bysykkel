import React, { useEffect } from 'react';
import './App.css';
import classnames from 'classnames';
import { connect, useDispatch } from 'react-redux';
import { SystemState } from './Reducer';
import { doInitialFetch } from './Actions';
import { FetchState } from './Types';
import { DisplayStationStatusList, StationList } from './StationList';

const StateIndicator = (props: { fetchState: FetchState }): JSX.Element => {
  let indicatorType;
  let text;
  let role;
  switch (props.fetchState) {
    case FetchState.INITIALIZING:
      indicatorType = 'loading-indicator';
      text = 'Vent litt, henter data ...';
      break;
    case FetchState.FAILURE:
      indicatorType = 'failure-indicator';
      text = 'Beklager, det oppsto en feil';
      role = 'alert';
      break;
    default:
      indicatorType = 'success-indicator';
  }
  const className = classnames('state-indicator', indicatorType);
  return (
    <div data-testid={indicatorType} className={className} role={role}>
      {text}
    </div>
  );
};

function useSearchParam<T>(
  searchParamName: string,
  location: typeof window.location,
  defaultValue: string,
): [string, (newValue: string) => void] {
  const urlSearchParams = new URLSearchParams(location.search);
  const value = urlSearchParams.get(searchParamName) || defaultValue;
  const setValue = (newValue: string): void => {
    const url = new URL(window.location.href);
    url.searchParams.set(searchParamName, newValue);
    window.location.href = url.href;
  };
  return [value, setValue];
}

enum PAGES {
  MAP = 'MAP',
  LIST = 'LIST',
}

const SwitchPageButton = ({ page, switchPage }: { page: PAGES; switchPage: (page: PAGES) => void }): JSX.Element => {
  const toPage = page === PAGES.LIST ? PAGES.MAP : PAGES.LIST;
  return (
    <button type={'button'} onClick={(): void => switchPage(toPage)}>
      {page === PAGES.LIST ? 'Map' : 'List'}
    </button>
  );
};

const App = (props: AppProps): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doInitialFetch());
  }, [dispatch]);

  const [pageName, setPageName] = useSearchParam('page', window.location, 'LIST');

  const page = pageName as PAGES;

  return (
    <React.Fragment>
      <StateIndicator fetchState={props.fetchState} />
      <SwitchPageButton page={page} switchPage={setPageName} />
      <StationList stations={props.stations} fetchState={props.fetchState} />
    </React.Fragment>
  );
};

export interface AppProps {
  fetchState: FetchState;
  stations?: DisplayStationStatusList;
}

const mapStateToProps = (state: SystemState): AppProps => {
  return {
    fetchState: state.fetchState,
    stations: state.stationInfo?.map((stationInfo) => {
      const stationStatus = state.stationStatus?.find(
        (stationStatus) => stationStatus.station_id === stationInfo.station_id,
      );
      return {
        stationId: stationInfo.station_id,
        stationName: stationInfo.name,
        isRenting: stationStatus?.is_renting === 1 || false,
        isReturning: stationStatus?.is_returning === 1 || false,
        numBikes: stationStatus?.num_bikes_available,
        numLocks: stationStatus?.num_docks_available,
      };
    }),
  };
};

export default connect(mapStateToProps)(App);
