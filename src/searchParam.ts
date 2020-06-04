export function useSearchParam<T>(
  searchParamName: string,
  location: Pick<typeof window.location, 'href' | 'search'>,
  defaultValue: string,
): [string, (newValue: string) => void] {
  const urlSearchParams = new URLSearchParams(location.search);
  const value = urlSearchParams.get(searchParamName) || defaultValue;
  const setValue = (newValue: string): void => {
    const url = new URL(location.href);
    url.searchParams.set(searchParamName, newValue);
    location.href = url.href;
  };
  return [value, setValue];
}
