import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { Permissions } from '../permissions';
import { PicthDetectorError } from '../erros';
import { merge } from '../utils';

import {
  type Callback,
  type NativeModuleImplementation,
  type PicthDetectorConfig,
  type Subscription,
  type PicthDetectorAndroidConfig,
  type PicthDetectorIOSConfig,
  PicthDetectorErrors,
} from '../../types';

export class InternalPitchDetector {
  private module?: NativeModuleImplementation;
  private event?: NativeEventEmitter;

  constructor() {
    this.module = NativeModules?.PitchDetectorModule;

    if (this.module) {
      this.event = new NativeEventEmitter(this.module);
    } else {
      /* istanbul ignore next */
      throw new PicthDetectorError(PicthDetectorErrors.LINKING_ERROR);
    }
  }

  /**
   * Returns a default PicthDetector configs
   * @returns PicthDetectorConfig
   * @example
   * ```ts
   * {
   *  android: {
   *    algorithm: 'YIN',
   *    bufferOverLap: 0,
   *    bufferSize: 1024,
   *    sampleRate: 22050,
   *  },
   *  ios: {
   *    algorithm: 'YIN',
   *    bufferSize: 1024,
   *  }
   * }
   */
  private getDefaultConfig(): PicthDetectorConfig {
    return {
      android: {
        algorithm: 'YIN',
        bufferOverLap: 0,
        bufferSize: 1024,
        sampleRate: 22050,
      },
      ios: {
        algorithm: 'YIN',
        bufferSize: 1024,
      },
    };
  }

  /**
   * Get current audio permission
   * @returns Promise<boolean>
   */
  private async hasPermissions(): Promise<boolean> {
    return !!(await Permissions.audio());
  }

  /**
   * Get current status
   * @returns Promise<boolean>
   */
  async isRecording(): Promise<boolean> {
    try {
      const status = await this.module?.isRecording();
      return !!status;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  /**
   * Trigger audio recording and pitch detection with provided configs
   * @param config
   * @returns Promise<void>
   */
  async start(config?: PicthDetectorConfig): Promise<void> {
    try {
      const permission = await this.hasPermissions();

      if (!permission) {
        throw new PicthDetectorError(PicthDetectorErrors.PERMISSIONS_ERROR);
      }

      const configuration = merge<PicthDetectorConfig>(
        this.getDefaultConfig(),
        config || {}
      );

      const params = Platform.select({
        android: configuration.android as unknown,
        ios: configuration.ios as unknown,
      }) as PicthDetectorIOSConfig | PicthDetectorAndroidConfig;

      await this.module?.start(params);
    } catch (err: unknown) {
      console.warn(err);
    }
  }

  /**
   * Stop audio recording and pitch detection
   * @returns Promise<void>
   */
  async stop(): Promise<void> {
    try {
      await this.module?.stop();
    } catch (err: unknown) {
      console.warn(err);
    }
  }

  /**
   * Register a event listener
   */
  addListener(callback: Callback): Subscription {
    return this.event?.addListener('data', callback);
  }

  /**
   * Method event listeners
   */
  removeListener(subscription: Subscription): void {
    if (subscription) {
      this.event?.removeSubscription(subscription);
    }
  }

  /**
   * Method remove all event listeners
   */
  removeAllListeners(): void {
    this.event?.removeAllListeners('data');
  }
}

/**
 * Export an instance of InternalPitchDetector
 */
export const PitchDetector = new InternalPitchDetector();
