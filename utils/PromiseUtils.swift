//
//  PromiseUtils.swift
//  Beethoven
//
//  Created by Fábio Pereira on 03/04/23.
//

import Foundation

class PromiseUtils: NSObject {
    private var resolver: RCTPromiseResolveBlock
    private var rejecter: RCTPromiseRejecteBlock
    
    init(_ resolver:RCTPromiseResolveBlock, _ rejecter:RCTPromiseRejecteBlock) {
        self.resolver = resolver
        self.rejecter = rejecter
    }
    
    func resolve(_ result: Any?) -> Void {
        self.resolver(result)
    }
    
    func reject(_ error: NSError) -> Void {
        rejecter(error.domain, error.code)
    }
}
