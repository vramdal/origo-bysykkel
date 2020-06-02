import { defaultState, FETCH_STATION_INFORMATION, SystemState } from './Reducer';
import { _testing } from './Actions';

describe('reschedule', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should reschedule a fetch when the ttl has elapsed', () => {
    const dispatch = jest.fn();
    const getState = (): SystemState => ({
      ...defaultState,
      ttl: { ...defaultState.ttl, [FETCH_STATION_INFORMATION]: 20 },
    });
    jest.useFakeTimers();
    const setTimeoutSpy = jest.spyOn(window, 'setTimeout');

    const dispatchable = _testing.reschedule(FETCH_STATION_INFORMATION);
    dispatchable(dispatch, getState);

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 20 * 1000);
  });

  it('should not reschedule when ttl is set to Infinity', () => {
    const dispatch = jest.fn();
    const getState = (): SystemState => ({
      ...defaultState,
      ttl: { ...defaultState.ttl, [FETCH_STATION_INFORMATION]: Infinity },
    });
    jest.useFakeTimers();
    const setTimeoutSpy = jest.spyOn(window, 'setTimeout');

    const dispatchable = _testing.reschedule(FETCH_STATION_INFORMATION);
    dispatchable(dispatch, getState);

    expect(setTimeoutSpy).not.toHaveBeenCalled();
  });
});
