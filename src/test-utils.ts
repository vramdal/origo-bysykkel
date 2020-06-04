export function response(json: { last_updated: number; data: object; ttl: number }): Promise<object> {
  return Promise.resolve(json);
}

export const childNodesToText = (parent: HTMLElement | undefined | null): string | undefined =>
  (parent &&
    Array.from(parent.childNodes)
      .map((child) => child.textContent)
      .join(' | ')) ||
  undefined;
