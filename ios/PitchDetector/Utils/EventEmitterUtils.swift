//
//  EventEmitterUtils.swift
//  PitchDetector
//
//  Created by Fabio Pereira on 04/04/23.
//  Copyright © 2023 Facebook. All rights reserved.
//

import Foundation

enum Events: String, CaseIterable {
    case DATA = "data"
}

class EventEmitterUtils {
    public static let shared = EventEmitterUtils()
    private static var rctEventEmitter: RCTEventEmitter!
    private var suspended = true

    private init() {}

    func register(withRCTEventEmitter: RCTEventEmitter) {
        Self.rctEventEmitter = withRCTEventEmitter
    }

    func suspend() {
        suspended = true
    }

    func restore() {
        suspended = false
    }

    func dispatch(_ event: Events, _ body: Any? = nil) {
        if suspended {
            return
        }

        Self.rctEventEmitter.sendEvent(withName: event.rawValue, body: body)
    }
}
