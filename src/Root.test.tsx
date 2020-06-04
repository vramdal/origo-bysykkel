import React from 'react';
import { render, wait, waitForElementToBeRemoved } from '@testing-library/react';
import { resetAllWhenMocks, when } from 'jest-when';
import { RootComponent } from './Root';
import { act } from 'react-dom/test-utils';
import { autoDiscoveryResponse, stationInformationResponse, stationStatus1, stationStatus2 } from './mock-data';
import { useSearchParam } from './searchParam';
jest.mock('./searchParam');
const useSearchParamMock = useSearchParam as jest.Mock;

import { fetchJson } from './OsloBysykkelApi';
const fetchJsonMock = fetchJson as jest.Mock;

jest.mock('./OsloBysykkelApi', () => {
  const originalModule = jest.requireActual('./OsloBysykkelApi');
  return {
    ...originalModule,
    fetchJson: jest.fn(),
  };
});

// import mapboxgl from 'mapbox-gl';
jest.mock('mapbox-gl');

function response(json: { last_updated: number; data: object; ttl: number }): Promise<object> {
  return Promise.resolve(json);
}

const childNodesToText = (parent: HTMLElement): string =>
  Array.from(parent.children)
    .map((child) => child.textContent)
    .join(' | ');

const waitForDataLoad = async (queryByTestId: (text: string) => HTMLElement | null): Promise<void> => {
  await wait(() => {
    expect(queryByTestId('loading-indicator')).toBeNull();
  });
};

describe('ui tests', () => {
  afterEach(() => {
    resetAllWhenMocks();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    when(fetchJsonMock)
      .calledWith(expect.stringContaining('gbfs.json'))
      .mockResolvedValue(response(autoDiscoveryResponse))
      .calledWith(expect.stringContaining('station_information.json'))
      .mockResolvedValue(response(stationInformationResponse));
  });

  describe('List rendering', () => {
    beforeEach(() => {
      when(useSearchParamMock)
        .calledWith('tab', expect.anything(), expect.anything())
        .mockReturnValue(['list', jest.fn()]);
    });

    test('it should render a list of stations', async () => {
      when(fetchJsonMock)
        .calledWith(expect.stringContaining('station_status.json'))
        .mockResolvedValueOnce(response(stationStatus1));
      const { getByTestId, container, getAllByRole } = render(<RootComponent />);

      expect(getByTestId('loading-indicator')).toBeInTheDocument();
      await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));

      const rows = getAllByRole('row');
      expect(childNodesToText(rows[1])).toMatchInlineSnapshot(`"Aker Brygge | 22 | 11"`);
      expect(childNodesToText(rows[2])).toMatchInlineSnapshot(`"Stortingstunellen | 19 | 5"`);
      expect(container).toMatchSnapshot();
    });

    test('it should update the list with new numbers', async () => {
      when(fetchJsonMock)
        .calledWith(expect.stringContaining('station_status.json'))
        .mockResolvedValueOnce(response(stationStatus1))
        .calledWith(expect.stringContaining('station_status.json'))
        .mockResolvedValue(response(stationStatus2));

      const { getAllByRole, queryByTestId } = render(<RootComponent />);
      await waitForDataLoad(queryByTestId);
      await act(async () => {
        await jest.runAllTimers();
      });

      await wait(() => {
        const rows = getAllByRole('row');
        expect(childNodesToText(rows[1])).toMatchInlineSnapshot(`"Aker Brygge | 33 | 0"`);
        expect(childNodesToText(rows[2])).toMatchInlineSnapshot(`"Stortingstunellen | 0 | 24"`);
      });
    });

    test('it should display an error message when station status fetch fails, then try again', async () => {
      when(fetchJsonMock)
        .calledWith(expect.stringContaining('station_status.json'))
        .mockRejectedValueOnce({ error: 'mock error' })
        .mockResolvedValue(response(stationStatus1));
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});

      const { queryByTestId, getAllByRole } = render(<RootComponent />);
      await waitForDataLoad(queryByTestId);

      await act(async () => {
        await jest.runAllTimers();
      });

      await wait(() => {
        const rows = getAllByRole('row');
        expect(childNodesToText(rows[1])).toMatchInlineSnapshot(`"Aker Brygge | 22 | 11"`);
        expect(childNodesToText(rows[2])).toMatchInlineSnapshot(`"Stortingstunellen | 19 | 5"`);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error fetching stationStatus'), {
          error: 'mock error',
        });
      });
    });

    test('complete snapshot', async () => {
      when(fetchJsonMock)
        .calledWith(expect.stringContaining('station_status.json'))
        .mockResolvedValueOnce(response(stationStatus1));

      const { container, queryByTestId } = await render(<RootComponent />);
      await waitForDataLoad(queryByTestId);

      expect(container).toMatchSnapshot();
    });
  });

  describe('map view', () => {
    beforeEach(() => {
      when(useSearchParamMock)
        .calledWith('tab', expect.anything(), expect.anything())
        .mockReturnValue(['map', jest.fn()]);
    });

    it('should render markers for each station', async () => {
      when(fetchJsonMock)
        .calledWith(expect.stringContaining('station_status.json'))
        .mockResolvedValueOnce(response(stationStatus1));

      const { queryByTestId, getAllByRole } = render(<RootComponent />);
      await waitForDataLoad(queryByTestId);

      const rows = getAllByRole('tooltip');
      expect(childNodesToText(rows[0])).toMatchInlineSnapshot(`" | 🚲 11 | 🔒 22"`);
      expect(childNodesToText(rows[1])).toMatchInlineSnapshot(`" | 🚲 5 | 🔒 19"`);
    });

    it('should update markers with new numbers', async () => {
      when(fetchJsonMock)
        .calledWith(expect.stringContaining('station_status.json'))
        .mockResolvedValueOnce(response(stationStatus1))
        .calledWith(expect.stringContaining('station_status.json'))
        .mockResolvedValue(response(stationStatus2));

      const { getAllByRole, queryByTestId } = render(<RootComponent />);
      await waitForDataLoad(queryByTestId);
      await act(async () => {
        await jest.runAllTimers();
      });

      await wait(() => {
        const rows = getAllByRole('tooltip');
        expect(childNodesToText(rows[0])).toMatchInlineSnapshot(`" | 🚲 0 | 🔒 33"`);
        expect(childNodesToText(rows[1])).toMatchInlineSnapshot(`" | 🚲 24 | 🔒 0"`);
      });
    });
  });
});
