import { _testing, getFeedUrl } from './OsloBysykkelApi';
import { autoDiscoveryFeedContents } from './__mocks__/feeds';

describe('getFeedUrl', () => {
  it('should return the URL of the station information feed', () => {
    const stationInformationFeedUrl = getFeedUrl(autoDiscoveryFeedContents, 'station_information');
    expect(stationInformationFeedUrl).toEqual(stationInformationFeedUrl);
  });
});

describe('apiFetch', () => {
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchSpy = jest.spyOn(window, 'fetch').mockImplementation(() => {
      return Promise.resolve(new Response('{}'));
    });
  });

  it('should replace http:// with https:// in urls', async () => {
    await _testing.apiFetch('http://www.example.com');

    expect(fetchSpy).toHaveBeenCalledWith('https://www.example.com', expect.anything());
  });
});
