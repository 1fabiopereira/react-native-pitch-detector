import { PermissionStatus, Rationale } from 'react-native-permissions';

export type TComparableCallback = (status: PermissionStatus) => boolean;

export type TPermissionsHandlers = {
  RequestPermission: (
    rationale?: Rationale,
    compare?: TComparableCallback
  ) => Promise<PermissionStatus | boolean | null>;
  CheckPermission: (
    compare?: TComparableCallback
  ) => Promise<PermissionStatus | boolean | null>;
};
