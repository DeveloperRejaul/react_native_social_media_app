import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '../core/rtk/store';
import AnimatedToast from '../core/components/Toast';
import { BottomSheetContainer } from '../core/components/BottomSheet';


export default function RootLayout() {

  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <Stack initialRouteName='(stack)'>
          <Stack.Screen name="(stack)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
        <AnimatedToast/>
        <BottomSheetContainer/>
      </View>
    </Provider>
  );
}
