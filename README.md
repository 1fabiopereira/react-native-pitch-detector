# react-native-pitch-detector

A react native pitch detector library

## Installation

```sh
npm install react-native-pitch-detector
```

## Usage

```ts
import { PitchDetector } from 'react-native-pitch-detector';

// To start
await PitchDetector.start();

// To stop
await PitchDetector.stop();

// To get current status
await PitchDetector.isRecording();
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
