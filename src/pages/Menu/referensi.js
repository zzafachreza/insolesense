import { View, Text, ScrollView, Linking, Alert, FlatList, BackHandler } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from 'react-native-elements'
import { MyHeader, MyInput } from '../../components'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { fonts } from '../../utils'
import { WebView } from 'react-native-webview';
export default function Referensi({ navigation }) {
  const web = 'https://www.alodokter.com/obat-a-z';
  const jsCode = `

  document.getElementById('headerTop').style.display = 'none';
  document.getElementsByClassName('search-a-z-box-title-inner')[0].style.display = 'none';
      `;

  const handleBackButtonPress = () => {

    try {
      webViewRef.current?.goBack()
    } catch (err) {
      console.log("[handleBackButtonPress] Error : ", err.message)
    }

    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress)
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonPress)
    };
  }, []);

  const webViewRef = useRef()
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <MyHeader title="Referensi" />
      <WebView
        onShouldStartLoadWithRequest={(event) => {
          if (event.navigationType === 'click') {
            if (!event.url.match(/(alodokter\.com\/*)/)) {
              Linking.openURL(event.url)
              return false
            }
            return true
          }
          else {
            return true;
          }
        }}
        ref={webViewRef} javaScriptEnabledAndroid={true}
        injectedJavaScript={jsCode} source={{ uri: web }} style={{ flex: 1 }} />
    </View>
  )
}