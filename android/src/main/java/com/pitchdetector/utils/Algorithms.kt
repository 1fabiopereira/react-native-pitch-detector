package com.pitchdetector.utils

import be.tarsos.dsp.pitch.PitchProcessor.PitchEstimationAlgorithm
import be.tarsos.dsp.pitch.PitchProcessor.PitchEstimationAlgorithm.*

object Algorithms {
  fun parse(algorithm: String?): PitchEstimationAlgorithm {
    return when(algorithm) {
      "AMDF" -> AMDF
      "DYNAMIC_WAVELET" -> DYNAMIC_WAVELET
      "FFT_PITCH" -> FFT_PITCH
      "FFT_YIN" -> FFT_YIN
      "MPM" -> MPM
      "YIN" -> YIN
      else -> {
        YIN
      }
    }
  }
}
