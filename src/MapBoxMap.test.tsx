import { _testing, MapBoxMap } from './MapBoxMap';

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { DisplayStationStatus } from './StationList';
import { when } from 'jest-when';
import mapboxgl from 'mapbox-gl';
import { FetchState } from './Types';

const originalMapboxGlModule = jest.requireActual('mapbox-gl');
const originalMarker = originalMapboxGlModule.Marker;
jest.mock('mapbox-gl', () => {
  const originalModule = jest.requireActual('mapbox-gl');
  return {
    ...originalModule,
    Map: jest.fn(),
    Marker: jest.fn(),
  };
});
const mockMap = mapboxgl.Map as jest.Mock;
const mockMarker = mapboxgl.Marker as jest.Mock;

const { StationMapMarker, ZoomCategory } = _testing;

const station1: DisplayStationStatus = {
  lon: 1,
  lat: 2,
  stationId: 'station-1',
  numLocks: 5,
  numBikes: 8,
  stationName: 'Station 1',
  address: 'Street 1',
  isRenting: true,
  isReturning: true,
};

const station2: DisplayStationStatus = {
  lon: 2,
  lat: 3,
  stationId: 'station-2',
  numLocks: 11,
  numBikes: 7,
  stationName: 'Station 2',
  address: 'Street 2',
  isRenting: true,
  isReturning: true,
};

describe('MapBox integration', () => {
  it('should ', async () => {
    const addedMarkers = [];

    const addMarker = jest.fn();
    addMarker.mockImplementation(() => {
      addedMarkers.push(addMarker.mock.instances[0]);
    });
    const mockMapImplementation = {
      addControl: jest.fn(),
      on: jest.fn(),
      easeTo: jest.fn(),
      addMarker: addMarker,
    };

    when(mockMap).calledWith(expect.anything()).mockReturnValue(mockMapImplementation);
    when(mockMarker)
      .calledWith(expect.anything())
      .mockImplementation((...args) => {
        const marker = new originalMarker(...args);
        marker.addTo = mockMapImplementation.addMarker;
        return marker;
      });

    const { container } = render(<MapBoxMap fetchState={FetchState.SUCCESS} stations={[station1, station2]} />);

    expect(mockMapImplementation.on).toHaveBeenCalledWith('load', expect.any(Function));
    expect(mockMapImplementation.on).toHaveBeenCalledWith('zoomend', expect.any(Function));
    expect(mockMapImplementation.addControl).toHaveBeenCalledWith(expect.any(mapboxgl.NavigationControl));
    expect(mockMapImplementation.addControl).toHaveBeenCalledWith(expect.any(mapboxgl.GeolocateControl));
    expect(mockMarker).toHaveBeenCalledTimes(2);
    expect(mockMapImplementation.addMarker).toHaveBeenCalledTimes(2);
    expect(container).toMatchSnapshot();
  });
});

describe('Stations on the map', () => {
  const clickHandler = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set a class names based on zoom level and availability', () => {
    const { getByRole } = render(
      <StationMapMarker station={station1} zoomCategory={ZoomCategory.DETAIL} markerClickHandler={clickHandler} />,
    );

    const element = getByRole('tooltip');
    expect(element).toHaveClass(`zoom-DETAIL has-bikes-available has-locks-available`);
  });

  it('should call clickHandler when clicked', () => {
    const { getByRole } = render(
      <StationMapMarker station={station1} zoomCategory={ZoomCategory.DETAIL} markerClickHandler={clickHandler} />,
    );
    const element = getByRole('tooltip');

    fireEvent.click(element);

    expect(clickHandler).toHaveBeenCalled();
  });

  it('should not set has-bikes-available', () => {
    const { getByRole } = render(
      <StationMapMarker
        station={{ ...station1, numBikes: 0 }}
        zoomCategory={ZoomCategory.DETAIL}
        markerClickHandler={clickHandler}
      />,
    );

    const element = getByRole('tooltip');

    expect(element).toHaveClass(`zoom-DETAIL has-locks-available`);
    expect(element).not.toHaveClass(`has-bikes-available`);
  });

  it('should not set has-locks-available', () => {
    const { getByRole } = render(
      <StationMapMarker
        station={{ ...station1, numLocks: 0 }}
        zoomCategory={ZoomCategory.DETAIL}
        markerClickHandler={clickHandler}
      />,
    );

    const element = getByRole('tooltip');

    expect(element).toHaveClass(`zoom-DETAIL has-bikes-available`);
    expect(element).not.toHaveClass(`has-locks-available`);
  });

  it('should render name and address when zoomed to detail level', () => {
    const { getByRole } = render(
      <StationMapMarker
        station={{ ...station1, numLocks: 0 }}
        zoomCategory={ZoomCategory.DETAIL}
        markerClickHandler={clickHandler}
      />,
    );

    const element = getByRole('tooltip');
    const title = element.querySelector('h2');
    const address = element.querySelector('address');
    expect(title).toHaveTextContent('Station 1');
    expect(address).toHaveTextContent('Street 1');
  });
});
