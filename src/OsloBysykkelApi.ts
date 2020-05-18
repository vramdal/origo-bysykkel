import { AutoDiscoveryFeedType } from './Types';

export const apiFetch: (url: string) => Promise<Response> = async (url: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return fetch(url, {
        headers: new Headers({
          'Client-Identifier': 'vidarramdal-origo-oppgave',
        }),
      })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    }, 1000);
  });
};

export const fetchJson: <T>(url: string) => Promise<T> = async (url: string) => {
  return apiFetch(url).then((response) => response.json());
};

export const URL_AUTODISCOVERY = 'https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json';

export function getFeedUrl(autoDiscoveryFeed: AutoDiscoveryFeedType, feedName: string): string {
  const match = autoDiscoveryFeed.data.nb.feeds.find((feed) => feed.name === feedName);
  if (!match) {
    throw new Error('Har ikke URL til feed: ' + feedName);
  }
  return match.url;
}
