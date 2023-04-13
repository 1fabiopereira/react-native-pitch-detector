import { isObject, merge } from '..';

describe('Utils', () => {
  it.each([
    [false, 'array', []],
    [false, 'NaN', NaN],
    [false, 'number', 10],
    [false, 'symbol', Symbol()],
    [false, 'date', new Date()],
    [true, 'object', {}],
  ])(
    'should return %s when isObject function will be called with %s',
    (expected: boolean, _: string, params: any) => {
      const result = isObject(params);
      expect(result).toBe(expected);
    }
  );

  it('should not merge when one params is not object', () => {
    const result = merge({ name: 'Fábio' }, NaN);

    expect(result).toHaveProperty('name');
  });

  it('should merge two complex object', () => {
    const obj1 = {
      person: {
        name: 'Fábio',
        address: {
          street: { name: 'Street name', number: 'Street number' },
          city: { name: 'City name' },
        },
      },
    };

    const obj2 = {
      person: {
        age: 29,
        address: {
          city: { postalCode: 1212000, name: 'City name 2' },
          coords: {
            lat: 0,
            lgn: 0,
          },
        },
      },
    };

    const result: any = merge(obj1, obj2);

    expect(result.person).toHaveProperty('name');
    expect(result.person).toHaveProperty('age');

    expect(result.person.address.street).toHaveProperty('name');
    expect(result.person.address.street).toHaveProperty('number');

    expect(result.person.address.city).toHaveProperty('name');
    expect(result.person.address.city).toHaveProperty('postalCode');

    expect(result.person.address.coords).toHaveProperty('lat');
    expect(result.person.address.coords).toHaveProperty('lgn');

    expect(result.person.address.city.name).toBe(obj2.person.address.city.name);
  });
});
