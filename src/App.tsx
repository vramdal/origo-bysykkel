import React, { useEffect } from 'react';
import './App.css';
import classnames from 'classnames';
import { connect, useDispatch } from 'react-redux';
import { SystemState } from './Reducer';
import { doInitialFetch } from './Actions';
import { FetchState } from './Types';
import { Cell, ColumnHeader, Row, RowGroup, Table } from './Layout';

type DisplayStationStatus = {
  stationId: string;
  stationName: string;
  numBikes?: number;
  numLocks?: number;
  isReturning: boolean;
  isRenting: boolean;
};

type DisplayStationStatusList = Array<DisplayStationStatus>;

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

const StationRow = ({ station }: { station: DisplayStationStatus }): JSX.Element => (
  <Row>
    <Cell>{station.stationName}</Cell>
    <Cell className={classnames({ disabled: !station.isReturning, exhausted: station.numLocks === 0 })}>
      {station.numLocks}
    </Cell>
    <Cell className={classnames({ disabled: !station.isRenting, exhausted: station.numBikes === 0 })}>
      {station.numBikes}
    </Cell>
  </Row>
);

const App = (props: AppProps): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doInitialFetch());
  }, [dispatch]);

  return (
    <React.Fragment>
      <StateIndicator fetchState={props.fetchState} />
      <Table className={classnames('station-table', { disabled: props.fetchState === FetchState.FAILURE })}>
        <Row className={'station-table__header'}>
          <ColumnHeader>Stasjon</ColumnHeader>
          <ColumnHeader>Antall låser</ColumnHeader>
          <ColumnHeader>Antall sykler</ColumnHeader>
        </Row>
        <RowGroup className={'station-table__body'}>
          {props.stations?.map((station: DisplayStationStatus) => (
            <StationRow key={station.stationId} station={station} />
          ))}
        </RowGroup>
      </Table>
    </React.Fragment>
  );
};

interface AppProps {
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
