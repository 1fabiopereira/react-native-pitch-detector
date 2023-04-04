import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { PitchDetector } from 'react-native-pitch-detector';

export default function App() {
  const [data, setData] = React.useState({ tone: '--', frequency: 0 });
  const [isRecording, setIsRecording] = React.useState(false);

  const start = async () => {
    await PitchDetector.start({ algorithm: 'FFT_YIN' });
    const status = await PitchDetector.isRecording();
    setIsRecording(status);
  };

  const stop = async () => {
    await PitchDetector.stop();
    const status = await PitchDetector.isRecording();
    setIsRecording(status);
  };

  React.useEffect(() => {
    const subscription = PitchDetector.addListener(setData);
    return () => {
      PitchDetector.removeListener(subscription);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.tone}>{data?.tone}</Text>
      <Text />
      <Text style={styles.frequency}>{data?.frequency}</Text>
      <Text>recording: {String(isRecording)}</Text>
      <Text />
      <Button onPress={start} title="Start" />
      <Text />
      <Button onPress={stop} title="Stop" />
    </View>
  );
}

const styles = StyleSheet.create({
  tone: {
    fontSize: 40,
  },

  frequency: {
    fontSize: 30,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
