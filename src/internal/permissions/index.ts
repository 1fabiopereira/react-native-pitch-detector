import { Platform } from 'react-native';
import {
  PERMISSIONS,
  Permission,
  PermissionStatus,
  RESULTS,
} from 'react-native-permissions';

import Factory from './factory';

export const isDenied = (status: PermissionStatus) => status === RESULTS.DENIED;

export const isGranted = (status: PermissionStatus) =>
  status === RESULTS.GRANTED;

export const isBlocked = (status: PermissionStatus) =>
  status === RESULTS.BLOCKED;

export const isLimited = (status: PermissionStatus) =>
  status === RESULTS.LIMITED;

export const isUnavailable = (status: PermissionStatus) =>
  status === RESULTS.UNAVAILABLE;

export class Permissions {
  static async audio() {
    const MICROPHONE_PERMISSION = Platform.select({
      android: PERMISSIONS.ANDROID.RECORD_AUDIO,
      ios: PERMISSIONS.IOS.MICROPHONE,
    }) as Permission;

    const rationale = {
      title: 'Acesso ao microfone',
      message: 'Para que possamos executar',
      buttonPositive: 'Permitir',
      buttonNegative: 'Negar',
    };

    const audio = Factory(MICROPHONE_PERMISSION, 'AUDIO PERMISSION:');

    const denied = await audio.CheckPermission(isDenied);
    const blocked = await audio.CheckPermission(isBlocked);

    if (denied || blocked) {
      return await audio.RequestPermission(rationale, isGranted);
    }

    return await audio.CheckPermission(isGranted);
  }
}
