import { useSearchParam } from './searchParam';

describe('extract value', () => {
  it('should return a value from a simple search string', () => {
    const [paramValue] = useSearchParam('paramName', { href: '', search: '?paramName=abc' }, '');
    expect(paramValue).toEqual('abc');
  });

  it('should return a value from a complex search string', () => {
    const [paramValue] = useSearchParam('paramName2', { href: '', search: '?paramName1=def&paramName2=abc' }, '');
    expect(paramValue).toEqual('abc');
  });

  it('should return the default value if param is absent', () => {
    const [paramValue] = useSearchParam('paramName', { href: '', search: '?' }, 'defaultValue');
    expect(paramValue).toEqual('defaultValue');
  });
});

describe('set value', () => {
  it('should set a query param value', () => {
    const location = { href: 'http://www.example.com', search: '' };

    const [, setParamValue] = useSearchParam('paramName', location, '');
    setParamValue('abc');

    expect(location.href).toEqual('http://www.example.com/?paramName=abc');
  });
});
