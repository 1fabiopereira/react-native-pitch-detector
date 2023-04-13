import { PermissionStatus } from 'react-native-permissions';
import {
  isBlocked,
  isDenied,
  isGranted,
  isLimited,
  isUnavailable,
} from '../../permissions';

describe('Permissions', () => {
  it.each([
    ['isBlocked', 'blocked', true, isBlocked],
    ['isDenied', 'denied', true, isDenied],
    ['isGranted', 'granted', true, isGranted],
    ['isLimited', 'limited', true, isLimited],
    ['isUnavailable', 'unavailable', true, isUnavailable],
  ])(
    'should call %s function and return %s',
    (
      _: string,
      params: any,
      expected: boolean,
      fn: (status: PermissionStatus) => boolean
    ) => {
      const result = fn(params);

      expect(result).toBe(expected);
    }
  );
});
