package com.pitchdetector

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.pitchdetector.processors.BaseProcessor

class PitchDetectorModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  private val processor = BaseProcessor()
  private var recording = false

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun start(config: ReadableMap, promise: Promise) {
    if (!this.recording) {
      try {
        val emitter = reactContext.getJSModule(RCTDeviceEventEmitter::class.java)
        processor.start(config, emitter)
        this.recording = true
        promise.resolve(null)
      } catch (e: Exception) {
        this.recording = false
        promise.reject(e)
      }
    }
  }

  @ReactMethod
  fun stop(promise: Promise) {
    if (this.recording) {
      try {
        processor.stop()
        this.recording = false
        promise.resolve(null)
      } catch (e: Exception) {
        this.recording = false
        promise.reject(e)
      }
    }
  }

  @ReactMethod
  fun isRecording(promise: Promise) {
    try {
      promise.resolve(this.recording)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun addListener(eventName: String?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  fun removeListeners(count: Int?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  companion object {
    const val NAME = "PitchDetectorModule"
  }
}
