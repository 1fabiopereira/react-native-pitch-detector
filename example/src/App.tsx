/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { PitchDetector } from 'react-native-pitch-detector';

export default function App() {
  const [data, setData] = React.useState({ tone: '--', frequency: 0 });
  const [isRecording, setIsRecording] = React.useState(false);

  const start = async () => {
    await PitchDetector.start();
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
      <Text style={styles.frequency}>{data?.frequency?.toFixed(1)}hz</Text>
      <Text style={[styles.status, { color: isRecording ? 'green' : 'red' }]}>
        {isRecording ? 'ON' : 'OFF'}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={isRecording ? stop : start}
      >
        <Text style={styles.label}>{isRecording ? 'STOP' : 'START'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tone: {
    fontSize: 40,
    fontColor: 'black',
  },

  frequency: {
    fontSize: 20,
  },

  button: {
    marginTop: 20,
    backgroundColor: 'black',
    width: '50%',
    minHeight: 50,
    borderRadius: 100,
    justifyContent: 'center',
  },

  label: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },

  status: {
    marginTop: 16,
    color: 'black',
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
