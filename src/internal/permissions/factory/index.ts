import {
  check,
  Permission,
  Rationale,
  request,
  RESULTS,
} from 'react-native-permissions';

import type { Comparable, PermissionsHandlers, Response } from '../../../types';

const BLOCKED = 'Permission is denied and not requestable anymore';
const DENIED = "Permission hasn't been requested / is denied but requestable";
const GRANTED = 'Permission is granted';
const LIMITED = 'Permission is limited: some actions are possible';
const UNAVAILABLE = 'This feature is not available.';

const MESSAGES = new Map<string, string>([
  [RESULTS.BLOCKED, BLOCKED],
  [RESULTS.DENIED, DENIED],
  [RESULTS.GRANTED, GRANTED],
  [RESULTS.LIMITED, LIMITED],
  [RESULTS.UNAVAILABLE, UNAVAILABLE],
]);

export default (
  targetPermission: Permission,
  TAG: string
): PermissionsHandlers => {
  const CheckPermission = async (compare?: Comparable): Response => {
    try {
      const result = await check(targetPermission);
      console.log(TAG, MESSAGES.get(result));
      return compare ? compare(result) : result;
    } catch (error: any) {
      console.log(TAG, error.message);
      return null;
    }
  };

  const RequestPermission = async (
    rationale?: Rationale,
    compare?: Comparable
  ): Response => {
    try {
      const result = await request(targetPermission, rationale);
      console.log(TAG, MESSAGES.get(result));
      return compare ? compare(result) : result;
    } catch (error: any) {
      console.log(TAG, error.message);
      return null;
    }
  };

  return { CheckPermission, RequestPermission };
};
