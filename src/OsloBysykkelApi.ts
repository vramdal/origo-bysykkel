import { AutoDiscoveryFeedType } from './Types';

export const URL_AUTODISCOVERY = 'https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json';

const CLIENT_IDENTIFIER = 'vidarramdal-origo-oppgave';

const apiFetch: (url: string) => Promise<Response> = async (url: string) => {
  return fetch(url.replace('http://', 'https://'), {
    headers: new Headers({
      'Client-Identifier': CLIENT_IDENTIFIER,
    }),
  });
};

export const fetchJson: <T>(url: string) => Promise<T> = async (url: string) => {
  return apiFetch(url).then((response) => response.json());
};

export function getFeedUrl(autoDiscoveryFeed: AutoDiscoveryFeedType, feedName: string): string {
  const match = autoDiscoveryFeed.data.nb.feeds.find((feed) => feed.name === feedName);
  if (!match) {
    throw new Error('Har ikke URL til feed: ' + feedName);
  }
  return match.url;
}

export const _testing = { apiFetch };
