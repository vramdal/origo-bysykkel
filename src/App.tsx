import React, { useEffect } from 'react';
import './App.css';
import classnames from 'classnames';
import { connect, useDispatch } from 'react-redux';
import { SystemState } from './Reducer';
import { doInitialFetch } from './Actions';
import { FetchState } from './Types';
import { DisplayStationStatusList, StationList } from './StationList';
import { MapBoxMap } from './MapBoxMap';
import { TabBar, Tabs } from './TabBar';
import { useSearchParam } from './searchParam';

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

const tabs: Tabs = new Map([
  ['map', 'Map'],
  ['list', 'List'],
]);

const TabContent = (props: AppProps & { tabId: string; stations: DisplayStationStatusList }): JSX.Element => {
  switch (props.tabId) {
    case 'map':
      return <MapBoxMap stations={props.stations} fetchState={props.fetchState} />;
    case 'list':
      return <StationList stations={props.stations} fetchState={props.fetchState} />;
    default:
      throw new Error('Invalid tab id: ' + props.tabId);
  }
};

const App = (props: AppProps): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doInitialFetch());
  }, [dispatch]);

  const [tabId, gotoTab] = useSearchParam('tab', window.location, 'map');

  return (
    <React.Fragment>
      <StateIndicator fetchState={props.fetchState} />
      <TabBar tabs={tabs} activeId={tabId} switchTab={gotoTab} />

      {props.stations && <TabContent fetchState={props.fetchState} tabId={tabId} stations={props.stations} />}
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
        lat: stationInfo.lat,
        lon: stationInfo.lon,
      };
    }),
  };
};

export default connect(mapStateToProps)(App);
