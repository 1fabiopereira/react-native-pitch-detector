//
//  PitchDetectorModule.swift
//  PitchDetector
//
//  Created by Fábio Pereira on 03/04/23.
//  Copyright © 2023 PitchDetector. All rights reserved.
//

import Foundation

@objc(PitchDetectorModule)
class PitchDetectorModule: NSObject {
  private let processor = BaseProcessor()
  private var recording = false

  @objc(start:reject:)
    func start(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
    if (!self.recording) {
        let promise = PromiseUtils(resolve, reject)
        do {
            processor.start()
            self.recording = true
            promise.resolve(nil)
        } catch {
            self.recording = false
            promise.reject(error as NSError)
        }
    }
  }
    
  @objc(stop:reject:)
    func stop(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
    if (self.recording) {
        let promise = PromiseUtils(resolve, reject)
        do {
            processor.stop()
            self.recording = false
            promise.resolve(nil)
        } catch {
            self.recording = false
            promise.reject(error as NSError)
        }
    }
  }

  @objc(isRecording:reject:)
    func isRecording(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
    let promise = PromiseUtils(resolve, reject)
    do {
        promise.resolve(self.recording)
    } catch {
        promise.reject(error as NSError)
    }
  }
}
