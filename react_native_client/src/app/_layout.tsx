import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {  View } from 'react-native';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '../core/rtk/store';
import AnimatedToast from '../core/components/Toast';
import { BottomSheetContainer } from '../core/components/BottomSheet';

export const unstable_settings = {
  anchor: '(stack)',
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name='(stack)'/>
          <Stack.Screen name='(tabs)'/>
        </Stack>
        <StatusBar style="auto" />
        <AnimatedToast/>
        <BottomSheetContainer/>
      </View>
    </Provider>
  );
}
