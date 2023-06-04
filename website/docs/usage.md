# Usage

### API
Below you can see small code snippet that shows how to import and use the main functions.

```ts
import { PitchDetector } from 'react-native-pitch-detector';

// To start recording
await PitchDetector.start(); // Promise<void>

// To stop recording
await PitchDetector.stop(); // Promise<void>

// To get current status
await PitchDetector.isRecording(); // Promise<true | false>

// To listener results
const subscription = PitchDetector.addListener(console.log) // { frequency: 440.14782, tone: "C#" }

// To stop listen results
PitchDetector.removeListener()

```

> You can see a complete implementation at [Playground](./playground.md).

### Permissions
To use microphone we need give permission to our app, for that we use a [react-native-permissions](https://github.com/zoontek/react-native-permissions) library.

```shell
 yarn add react-native-permissions
```

Or using npm:

```shell
npm install react-native-permissions
```

After that, on `package.json` file add de following lines:

```json
"reactNativePermissionsIOS": [
    "Microphone"
]
```

For iOS you need edit `Info.plist`, add:

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Perform pitch detection</string>
```

Lastly for iOS you need execute:

```shell
(cd ios && pod install)
```

For Android you need change `AndroidManifest.xml`, and add:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

and finally recompile your project both platforms.

> :bulb: In future the idea is remove react-native-permission dependency and develop in house permission manager.


