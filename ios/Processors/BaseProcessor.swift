//
//  BaseProcessor.swift
//  PitchDetector
//
//  Created by Fábio Pereira on 03/04/23.
//  Copyright © 2023 PitchDetector. All rights reserved.
//

import UIKit
import Beethoven
import Pitchy

class BaseProcessor: PitchEngineDelegate {
    lazy var processor: PitchEngine = { [weak self] in
        let config = Config(estimationStrategy: .yin)
        let engine = PitchEngine(config: config, delegate: self)
        engine.levelThreshold = -30.0
        return engine
    }()
    
    func pitchEngine(_ pitchEngine: PitchEngine, didReceivePitch pitch: Pitch) {
        let tone = pitch.note.string
        let offsetPercentage = pitch.closestOffset.percentage
        let absOffsetPercentage = abs(offsetPercentage)

        print("pitch : \(tone) - percentage : \(offsetPercentage) - abs offset percentage: \(absOffsetPercentage)")
    }
    
    func start() {
        if (!processor.active) {
            processor.start()
        }
    }
    
    func stop() {
        if (processor.active) {
            processor.stop()
        }
    }

    func pitchEngine(_ pitchEngine: PitchEngine, didReceiveError error: Error) {
        print(error)
    }

    public func pitchEngineWentBelowLevelThreshold(_ pitchEngine: PitchEngine) {
        print("Below level threshold")
    }
}
