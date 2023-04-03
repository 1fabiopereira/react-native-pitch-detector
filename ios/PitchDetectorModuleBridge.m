//
//  PitchDetectorModuleBridge.m
//  PitchDetector
//
//  Created by Fábio Pereira on 03/04/23.
//  Copyright © 2023 PitchDetector. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PitchDetectorModule, NSObject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

RCT_EXTERN_METHOD(start:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(stop:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(isRecording:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end
