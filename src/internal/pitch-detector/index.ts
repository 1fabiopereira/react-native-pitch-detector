import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { merge } from '../utils';
import { PicthDetectorError } from '../erros';

import {
  type Callback,
  type NativeModuleImplementation,
  type PicthDetectorConfig,
  type Subscription,
  PicthDetectorErrors,
} from '../../types';

class InternalPitchDetector {
  private module?: NativeModuleImplementation;
  private event?: NativeEventEmitter;

  constructor() {
    this.module = NativeModules?.PitchDetector;

    if (this.module) {
      this.event = new NativeEventEmitter(this.module);
    }

    if (!module && Platform.OS === 'android') {
      throw new PicthDetectorError(PicthDetectorErrors.LINKING_ERROR);
    }

    if (!module && Platform.OS === 'ios') {
      throw new PicthDetectorError(PicthDetectorErrors.UNAVAILABLE_ERROR);
    }
  }

  /**
   * Returns a default PicthDetector configs
   * @returns PicthDetectorConfig
   * @example
   * ```ts
   * {
   *  algorithm: 'YIN',
   *  bufferOverLap: 0,
   *  bufferSize: 1024,
   *  sampleRate: 22050,
   * }
   * ```
   */
  private getDefaultConfig(): PicthDetectorConfig {
    return {
      algorithm: 'YIN',
      bufferOverLap: 0,
      bufferSize: 1024,
      sampleRate: 22050,
    };
  }

  // TODO: improve implementation
  private hasPermissions(): boolean {
    return true;
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
      if (!this.hasPermissions()) {
        throw new PicthDetectorError(PicthDetectorErrors.PERMISSIONS_ERROR);
      }

      const configuration = merge<PicthDetectorConfig>(
        this.getDefaultConfig(),
        config || {}
      );

      await this.module?.start(configuration);
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

export const PitchDetector = new InternalPitchDetector();
