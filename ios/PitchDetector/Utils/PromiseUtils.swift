//
//  PromiseUtils.swift
//  PitchDetector
//
//  Created by Fábio Pereira on 03/04/23.
//  Copyright © 2023 PitchDetector. All rights reserved.
//

import Foundation

class PromiseUtils {
    private var resolver: RCTPromiseResolveBlock?
    private var rejecter: RCTPromiseRejectBlock?
    
    init(_ resolver: @escaping RCTPromiseResolveBlock, _ rejecter: @escaping RCTPromiseRejectBlock) {
        self.resolver = resolver
        self.rejecter = rejecter
    }
    
    func resolve(_ result: Any?) -> Void {
        resolver!(result)
    }
    
    func reject(_ error: NSError) -> Void {
        rejecter!(error.domain, String(error.code), nil)
    }
}

