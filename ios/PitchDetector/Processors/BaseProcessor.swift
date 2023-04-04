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
import AVFAudio

class BaseProcessor: PitchEngineDelegate {
    private var processor: PitchEngine?
    
    func pitchEngine(_ pitchEngine: PitchEngine, didReceivePitch pitch: Pitch) {
        let regex = try! NSRegularExpression(pattern: "[0-9]{1,2}", options: NSRegularExpression.Options.caseInsensitive)
        let range = NSMakeRange(0, pitch.note.string.count)
       
        let tone = regex.stringByReplacingMatches(in: pitch.note.string, range: range, withTemplate: "")
        let frequency = pitch.frequency

        var data = Dictionary<String, Any?>()
        data["tone"] = tone
        data["frequency"] = frequency
        
        EventEmitterUtils.shared.dispatch(Events.DATA, data)
    }
    
    func prepare(_ config: Dictionary<String, Any>) {
        let bufferSize = config["bufferSize"] as! Int
        let algorithm = AlgorithmUtils.parse(for: config["algorithm"] as! String)
        
        let config = Config(bufferSize: AVAudioFrameCount(bufferSize), estimationStrategy: algorithm)
        processor = PitchEngine(config: config, delegate: self)
        processor?.levelThreshold = -30.0
    }
    
    func start(_ config: Dictionary<String, Any>) {
        prepare(config)
        
        if ((processor?.active) != nil && !processor!.active) {
            processor?.start()
        }
    }
    
    func stop() {
        if ((processor?.active) != nil) {
            processor?.stop()
        }
    }

    func pitchEngine(_ pitchEngine: PitchEngine, didReceiveError error: Error) {
        print(error)
    }

    public func pitchEngineWentBelowLevelThreshold(_ pitchEngine: PitchEngine) {
        print("Below level threshold")
    }
}
