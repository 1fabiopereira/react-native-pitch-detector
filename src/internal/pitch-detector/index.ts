import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { Permissions } from '../permissions';
import { PitchDetectorError } from '../erros';
import { merge } from '../utils';

import {
  type Callback,
  type NativeModuleImplementation,
  type PitchDetectorConfig,
  type Subscription,
  type PitchDetectorAndroidConfig,
  type PitchDetectorIOSConfig,
  PitchDetectorErrors,
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
      throw new PitchDetectorError(PitchDetectorErrors.LINKING_ERROR);
    }
  }

  /**
   * Returns a default PitchDetector configs
   * @returns PitchDetectorConfig
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
  private getDefaultConfig(): PitchDetectorConfig {
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
  async start(config?: PitchDetectorConfig): Promise<void> {
    try {
      const permission = await this.hasPermissions();

      if (!permission) {
        throw new PitchDetectorError(PitchDetectorErrors.PERMISSIONS_ERROR);
      }

      const configuration = merge<PitchDetectorConfig>(
        this.getDefaultConfig(),
        config ?? {}
      );

      const params = Platform.select({
        android: configuration.android as unknown,
        ios: configuration.ios as unknown,
      }) as PitchDetectorIOSConfig | PitchDetectorAndroidConfig;

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
   * @alias removeAllListeners
   */
  removeListener(): void {
    this.event?.removeAllListeners('data');
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
