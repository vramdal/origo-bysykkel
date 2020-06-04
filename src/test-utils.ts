let requestCounter = 0;

export function response(
  json: { last_updated: number; data: object; ttl: number },
  lastUpdated?: number,
): Promise<object> {
  // eslint-disable-next-line
  return Promise.resolve({...json, last_updated: lastUpdated || requestCounter++});
}

export const childNodesToText = (parent: HTMLElement | undefined | null): string | undefined =>
  (parent &&
    Array.from(parent.childNodes)
      .map((child) => child.textContent)
      .join(' | ')) ||
  undefined;
