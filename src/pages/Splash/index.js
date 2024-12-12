import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData } from '../../utils/localStorage';
import LinearGradient from 'react-native-linear-gradient';


export default function Splash({ navigation }) {
  const img = new Animated.Value(0.5);
  const textScale = new Animated.Value(0.5);
  const textOpacity = new Animated.Value(0);

  useEffect(() => {
    storeData('act', moment().format('dddd, DD MMMM YYYY HH:mm:ss'))
    Animated.parallel([
      Animated.timing(img, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(textScale, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      })
    ]).start();


    setTimeout(() => {
      getData('user').then(user => {
        if (user) {
          navigation.replace("MainApp")
        } else {
          navigation.replace("Login")
        }
      })
    }, 1200);
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      padding: 0,
      backgroundColor: colors.white,
      justifyContent: 'center',
      position: 'relative'
    }}>

      <LinearGradient colors={[colors.primary, colors.tertiary]} style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <Animated.Image
          source={require('../../assets/logo.png')}
          resizeMode="contain"
          style={{
            transform: [{ scale: img }],
            width: windowWidth / 1.5,
            height: windowWidth / 1.5,
            marginTop: '28%'

          }}
        />


        <ActivityIndicator style={{ marginTop: 50 }} color={colors.secondary} size="large" />

      </LinearGradient>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({});
