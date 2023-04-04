//
//  AlgorithmsUtils.swift
//  PitchDetector
//
//  Created by Fabio Pereira on 04/04/23.
//  Copyright © 2023 Facebook. All rights reserved.
//

import Foundation
import Beethoven

class AlgorithmUtils {
    static func parse(for algorithm: String) -> EstimationStrategy {
        switch algorithm {
        case "MAX_VALUE": return .maxValue
        case "QUADRADIC": return .quadradic
        case "BARYCENTRIC": return .barycentric
        case "QUINNS_FIRST": return .quinnsFirst
        case "QUINNS_SECONDARY": return .quinnsSecond
        case "JAINS": return .jains
        case "HPS": return .hps
        case "YIN": return .yin
        default: return .yin
        }
    }
}
