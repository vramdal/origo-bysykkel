import React, { RefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import { FetchState } from './Types';
import { DisplayStationStatus, DisplayStationStatusList } from './StationList';
import './MapBoxMap.scss';
import classNames from 'classnames';
import logo from './oslobysykkel-logo.png';

interface ComponentState {
  center: {
    lng: number;
    lat: number;
  };
  zoom: number;
  geolocation?: {
    lng: number;
    lat: number;
  };
}

export interface MapBoxMapProps {
  fetchState: FetchState;
  stations: DisplayStationStatusList;
}

enum ZoomCategory {
  WORLD = 'WORLD',
  MEDIUM = 'MEDIUM',
  DETAIL = 'DETAIL',
}

const categorizeZoom = (zoom: number): ZoomCategory => {
  if (zoom > 18) {
    return ZoomCategory.DETAIL;
  } else if (zoom > 14) {
    return ZoomCategory.MEDIUM;
  } else {
    return ZoomCategory.WORLD;
  }
};

const StationMapMarker = ({
  station,
  refObject,
  zoomCategory,
  markerClickHandler,
}: {
  station: DisplayStationStatus;
  refObject?: React.RefObject<HTMLDivElement>;
  zoomCategory: ZoomCategory;
  markerClickHandler: (station: DisplayStationStatus) => void;
}): JSX.Element => {
  return (
    <div ref={refObject}>
      <div
        className={classNames('station-marker', `zoom-${zoomCategory}`, {
          'has-bikes-available': station.numBikes && station.numBikes > 0,
          'has-locks-available': station.numLocks && station.numLocks > 0,
        })}
        onClick={(): void => markerClickHandler(station)}
        role={'tooltip'}
      >
        <img src={logo} alt={'Oslo Bysykkel-logo'} className={'oslobysykkel-logo'} />
        {zoomCategory === ZoomCategory.DETAIL && (
          <>
            <h2>{station.stationName}</h2>
            <p>ID: {station.stationId}</p>
            {station.stationName !== station.address && <address>{station.address}</address>}
          </>
        )}
        {(zoomCategory === ZoomCategory.DETAIL || zoomCategory === ZoomCategory.MEDIUM) && (
          <>
            <div className={'bikes'}>
              <span role={'img'} aria-label={'sykkel'}>
                🚲
              </span>{' '}
              {station.numBikes}
            </div>
            <div className={'locks'}>
              <span role={'img'} aria-label={'sykkel'}>
                🔒
              </span>{' '}
              {station.numLocks}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Legend = (): JSX.Element => (
  <div className={'legend'} role={'list'}>
    <div role={'listitem'}>
      <img src={logo} alt={'Oslo Bysykkel-logo'} className={'oslobysykkel-logo bike-and-lock-available'} />
      <span>Sykkel og lås ledig</span>
    </div>
    <div>
      <img src={logo} alt={'Oslo Bysykkel-logo'} className={'oslobysykkel-logo bike-no-lock-available'} />
      <span>Ingen lås ledig</span>
    </div>
    <div>
      <img src={logo} alt={'Oslo Bysykkel-logo'} className={'oslobysykkel-logo lock-no-bike-available'} />
      <span>Ingen sykkel ledig</span>
    </div>
  </div>
);

export class MapBoxMap extends React.Component<MapBoxMapProps, ComponentState> {
  static defaultProps = {
    stations: [],
  };

  constructor(props: MapBoxMapProps) {
    super(props);
    mapboxgl.accessToken = 'pk.eyJ1IjoidnJhbWRhbCIsImEiOiJjaXVmNW5qMncwMDE1MnlwcmN1MnJkMzQ4In0.4_QLMQFAPRz_vfwn5m76vQ';
    this.state = {
      center: {
        lng: 10.7303766,
        lat: 59.9108469,
      },
      zoom: 15,
    };
    for (const station of props.stations) {
      const id = station.stationId;
      const ref: React.RefObject<HTMLDivElement> = React.createRef();
      this.markerRefs.set(id, ref);
    }
  }

  private mapContainerRef: RefObject<HTMLDivElement> = React.createRef();
  private map?: mapboxgl.Map = undefined;
  private markers: Map<string, mapboxgl.Marker> = new Map<string, mapboxgl.Marker>();
  private markerRefs: Map<string, React.RefObject<HTMLDivElement>> = new Map();

  componentDidMount(): void {
    if (this.mapContainerRef.current) {
      this.map = new mapboxgl.Map({
        container: this.mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.state.center.lng, this.state.center.lat],
        zoom: this.state.zoom,
      });
      this.map.addControl(new mapboxgl.NavigationControl());
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        showAccuracyCircle: false,
        fitBoundsOptions: {
          maxZoom: 18,
        },
        trackUserLocation: true,
      });
      this.map.addControl(geolocate);
      this.map.on('zoomend', () => {
        const zoom = this.map?.getZoom() || 15;
        this.setState({ zoom: zoom });
      });
      this.map.on('load', function () {
        geolocate.trigger();
      });
      this.createMarkers(this.props.stations, this.map);
    }
  }

  createMarkers(stations: DisplayStationStatusList, map: mapboxgl.Map): void {
    for (const station of stations) {
      const id = station.stationId;
      const ref = this.markerRefs.get(id);
      if (ref) {
        const marker = new mapboxgl.Marker({ element: ref.current || undefined });
        marker.setLngLat([station.lon, station.lat]);
        this.markers.set(id, marker);
        marker.addTo(map);
      }
    }
  }

  zoomToStation(station: DisplayStationStatus): void {
    this.map?.easeTo({ center: { lat: station.lat, lng: station.lon }, animate: true, zoom: 19 });
  }

  render(): JSX.Element {
    const zoomCategory: ZoomCategory = categorizeZoom(this.state.zoom);
    const stationElements = this.props.stations.map((station) => (
      <StationMapMarker
        station={station}
        key={station.stationId}
        refObject={this.markerRefs.get(station.stationId)}
        zoomCategory={zoomCategory}
        markerClickHandler={(station): void => this.zoomToStation(station)}
      />
    ));
    return (
      <>
        <div ref={this.mapContainerRef} className="mapContainer" data-testid={'mapContainer'} role="application">
          {stationElements}
        </div>
        <Legend />
      </>
    );
  }
}

export const _testing = { StationMapMarker, ZoomCategory };
