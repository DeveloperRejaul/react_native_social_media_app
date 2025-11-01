
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';
import Icon from '@expo/vector-icons/Ionicons';

import { rcp } from '../utils/colorReduceOpacity';
import { Colors } from '../constants/theme';

interface IShowData {
  title?: string,
  message: string
  hideDuration?: number,
  bgColor?: string
  titleColor?: string
  messageColor?: string
  type?: 'success' | 'error' | 'info' | 'warning'
}

interface IAnimatedToast {
  show: (data: IShowData, cb?: () => void) => void
}

export const animatedToast: IAnimatedToast = {
  show: () => { },
};

export default function AnimatedToast() {
  const { width: WIDTH } = useWindowDimensions();
  const TOAST_WIDTH = 350;
  const OFFSET = WIDTH - TOAST_WIDTH;
  const ANIMATED_VISIBLE_VALUE = 50;
  const ANIMATED_HIDE_VALUE = -100;
  const top = useSharedValue(ANIMATED_HIDE_VALUE);
  const [tostData, setTostData] = useState<IShowData>({} as IShowData);

  useEffect(() => {
    animatedToast.show = function show(data: IShowData, cb?: () => void) {
      setTostData(data);
      top.value = withSpring(ANIMATED_VISIBLE_VALUE, {}, () => {
        top.value = withDelay(data.hideDuration || 1000, withSpring(ANIMATED_HIDE_VALUE, {}, () => {
          if (cb) runOnJS(cb)?.();
        }));
      });
    };
  }, []);

  const hide = () => {
    top.value = withSpring(ANIMATED_HIDE_VALUE);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    display: top.get() === ANIMATED_HIDE_VALUE ? 'none' : 'flex',
  }));

  const getBg = (type:IShowData['type']) => {
    switch (type) {
    case 'success':
      return Colors.light.tabIconSelected;
    case 'error':
      return "#ff0000";
    case 'info':
      return "#ff0000";
    case 'warning':
      return "#ff0000";
    default:
      return Colors.light.tabIconSelected;
    }
  };

  return (
    <Animated.View
      style={[
        {
          ...styles.container,
          top,
          width: TOAST_WIDTH,
          left: OFFSET / 2,
          right: OFFSET / 2,
          backgroundColor: getBg(tostData.type),
        }, animatedStyle]}
    >
      <TouchableOpacity
        onPress={hide}
        style={styles.close}
      >
        <Icon name="close" color={Colors.light.text} size={20} />
      </TouchableOpacity>
      <Text style={{ ...styles.title, color: tostData?.titleColor || Colors.light.text}}> {tostData?.title || 'Action Message'}</Text>
      <Text style={{ ...styles.message, color: tostData?.messageColor || Colors.light.text}}> {tostData.message || ''}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 80,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 0,
  },
  message: {
    fontSize: 14,
    padding: 0,
  },
  close: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: rcp(Colors.light.tabIconSelected, 10),
    borderRadius: 20,
    padding: 5,
  },
});
  
  
  