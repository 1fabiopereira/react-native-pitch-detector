import PitchDetectorModule from './__mocks__/PitchDetectorModule'

jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));

const mocks = { PitchDetectorModule }
Object.keys(mocks).forEach((module => jest.doMock(module, () => mocks[module], { virtual: true })))

jest.mock('react-native', () => ({
    Platform: {
        OS: 'android',
        select: jest.fn((data: { android: any, ios: any }) => data.android)
    },
    NativeEventEmitter: jest.fn().mockImplementation(() => ({
        addListener: jest.fn(),
        emit: jest.fn(),
        listenerCount: jest.fn(),
        removeAllListeners: jest.fn(),
        removeEventListener: jest.fn(),
        removeSubscription: jest.fn(),
    })),
    NativeModules: mocks,
}))
