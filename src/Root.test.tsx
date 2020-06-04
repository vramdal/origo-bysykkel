import React from 'react';
import { render, wait, waitForElementToBeRemoved } from '@testing-library/react';
import { fetchJson } from './OsloBysykkelApi';
import { resetAllWhenMocks, when } from 'jest-when';
import { RootComponent } from './Root';
import { act } from 'react-dom/test-utils';
import { autoDiscoveryResponse, stationInformationResponse, stationStatus1, stationStatus2 } from './mock-data';
import { useSearchParam } from './searchParam';

jest.mock('./OsloBysykkelApi', () => {
  const originalModule = jest.requireActual('./OsloBysykkelApi');
  return {
    ...originalModule,
    fetchJson: jest.fn(),
  };
});

jest.mock('./searchParam');

const fetchJsonMock = fetchJson as jest.Mock;
const useSearchParamMock = useSearchParam as jest.Mock;

function response(json: { last_updated: number; data: object; ttl: number }): Promise<object> {
  return Promise.resolve(json);
}

const childNodesToText = (tr: HTMLElement): string =>
  Array.from(tr.children)
    .map((tr) => tr.textContent)
    .join(' | ');

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
      await wait(() => {
        expect(queryByTestId('loading-indicator')).toBeNull();
      });
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
      await wait(() => {
        expect(queryByTestId('loading-indicator')).toBeNull();
      });

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
      await wait(() => {
        expect(queryByTestId('loading-indicator')).toBeNull();
      });

      expect(container).toMatchSnapshot();
    });
  });
});
