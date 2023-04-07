//
//  PitchDetectorModule.swift
//  PitchDetector
//
//  Created by Fábio Pereira on 03/04/23.
//  Copyright © 2023 PitchDetector. All rights reserved.
//

import Foundation

@objc(PitchDetectorModule)
open class PitchDetectorModule: RCTEventEmitter {
  private let processor = BaseProcessor()
  private var recording = false
    
    override public init() {
        super.init()
        EventEmitterUtils.shared.register(withRCTEventEmitter: self)
    }

    @objc
    override open func supportedEvents() -> [String]! {
        return Events.allCases.map({ $0.rawValue })
    }

    @objc
    override open func startObserving() {
        EventEmitterUtils.shared.restore()
    }

    @objc
    override open func stopObserving() {
        EventEmitterUtils.shared.suspend()
    }

    @objc(start:resolve:reject:)
    func start(_ config: Dictionary<String, Any>, resolve:@escaping RCTPromiseResolveBlock, reject:@escaping RCTPromiseRejectBlock) -> Void {
    if (!self.recording) {
        let promise = PromiseUtils(resolve, reject)
        
        processor.start(config)
        self.recording = true
        
        return promise.resolve(nil)
    }
  }
    
  @objc(stop:reject:)
    func stop(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
    if (self.recording) {
        let promise = PromiseUtils(resolve, reject)
        
        processor.stop()
        self.recording = false
        
        return promise.resolve(nil)
    }
  }

  @objc(isRecording:reject:)
    func isRecording(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
    let promise = PromiseUtils(resolve, reject)
    return promise.resolve(self.recording)
  }
}
