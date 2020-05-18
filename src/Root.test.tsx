/* eslint-disable */
import React from 'react';
import {render, wait, waitForElementToBeRemoved} from '@testing-library/react';
import {fetchJson} from './OsloBysykkelApi';
import {resetAllWhenMocks, when} from 'jest-when';
import {RootComponent} from './Root';
import {act} from 'react-dom/test-utils';
import {autoDiscoveryResponse, stationInformationResponse, stationStatus1, stationStatus2} from "./mock-data";

jest.mock('./OsloBysykkelApi', () => {
  const originalModule = jest.requireActual('./OsloBysykkelApi');
  return {
    ...originalModule,
    fetchJson: jest.fn(),
  };
});

const fetchJsonMock = fetchJson as jest.Mock;

function response(json: { last_updated: number; data: any; ttl: number }): Promise<object> {
  return Promise.resolve(json);
}

const childNodesToText = (tr: HTMLElement) =>
    Array.from(tr.children)
        .map((tr) => tr.textContent)
        .join(' | ');

describe('Happy case', () => {
  afterEach(() => {
    resetAllWhenMocks();
    jest.useRealTimers();
  })
  beforeEach(() => {
    jest.useFakeTimers();
    when(fetchJsonMock)
        .calledWith(expect.stringContaining('gbfs.json'))
        .mockResolvedValue(
            response(autoDiscoveryResponse),
        )
        .calledWith(expect.stringContaining('station_information.json'))
        .mockResolvedValue(
            response(stationInformationResponse),
        )
        .calledWith(expect.stringContaining('station_status.json'))
        .mockResolvedValueOnce(
            response(stationStatus1),
        )
        .mockResolvedValueOnce(
            response(stationStatus2),
        )
        .calledWith(expect.anything())
        .mockImplementation(function (url) {
          throw new Error('Ikke-mocket URL: ' + JSON.stringify(arguments));
        });
  });

  test('it should render a list of stations', async () => {

    when(fetchJsonMock)
        .calledWith(expect.stringContaining('station_status.json'))
        .mockResolvedValue(
            response(stationStatus1),
        )
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
        .mockResolvedValueOnce(response(stationStatus2))

    const { getAllByRole, queryByTestId } = render(<RootComponent />);
    await wait(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    })
    await act(async () => {
      await jest.runAllTimers();
    });

    const rows = getAllByRole('row');
    expect(childNodesToText(rows[1])).toMatchInlineSnapshot(`"Aker Brygge | 33 | 0"`);
    expect(childNodesToText(rows[2])).toMatchInlineSnapshot(`"Stortingstunellen | 0 | 24"`);
  });
});
