import { Cell, ColumnHeader, Row, RowGroup, Table } from './Layout';
import classnames from 'classnames';
import { FetchState } from './Types';
import React from 'react';
import { AppProps } from './App';

type DisplayStationStatus = {
  stationId: string;
  stationName: string;
  numBikes?: number;
  numLocks?: number;
  isReturning: boolean;
  isRenting: boolean;
};

export type DisplayStationStatusList = Array<DisplayStationStatus>;
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

export const StationList = (props: AppProps): JSX.Element => (
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
);
