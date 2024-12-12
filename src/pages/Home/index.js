import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import { Linking } from 'react-native';
import { useIsFocused } from '@react-navigation/native';


const MyMenu = ({ onPress, img, label, backgroundColor, desc }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        width: windowWidth / 2.5,
        padding: 10,
        backgroundColor: '#E9FFD7',
        borderRadius: 10,
        // justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image source={img} style={{

          width: windowWidth / 4,
          height: windowWidth / 4,
          resizeMode: 'contain'
        }} />
        <Text style={{
          color: '#203D47',
          textAlign: 'center',
          ...fonts.caption
        }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});
  const [tekanan, setTekanan] = useState({
    hall: 'Belum ada'
  })

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
    })
    getData('hasil').then(u => {
      if (u) {
        setTekanan(u)
      }
    });



  }

  const handlePress = () => {
    // Ganti URL dengan link yang ingin kamu buka
    // Linking.openURL('https://www.alodokter.com/obat-a-z')
    //   .catch((err) => console.error('Failed to open URL', err));
    navigation.navigate('Referensi')
  };

  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      __getUser();
    }
  }, [isFocus])
  return (
    <LinearGradient colors={[colors.primary, colors.tertiary]} style={{
      flex: 1,

    }}>

      {/* header */}
      <View style={{
        padding: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        backgroundColor: colors.background,
        height: windowHeight / 6,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

      }}>

        <View>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 16,
            color: colors.enam
          }}>Hi, {user.nama_lengkap}</Text>
          <Text style={{
            fontFamily: fonts.secondary[800],
            fontSize: 20,
            color: colors.tujuh
          }}>Insole Sense</Text>
        </View>

        <View>
          <Image style={{
            width: 52,
            height: 52,
          }} source={require('../../assets/logo.png')} />
        </View>

      </View>





      <View style={{
        flex: 1,
        padding: 20,
      }}>
        <View style={{
          marginBottom: 20,
          backgroundColor: '#254C54',
          // width: ,
          paddingHorizontal: 10,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 80,
          borderWidth: 2,
          borderColor: colors.tujuh
        }}>
          <Text style={{
            ...fonts.headline5,

            color: colors.white,

          }}>Tekanan Kaki = {tekanan.hall}</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <MyMenu img={require('../../assets/a1.png')} onPress={() => navigation.navigate('InputSwamedikasi', user)} label={`Data Tekanan\nKaki Terkini`} />
          <MyMenu img={require('../../assets/a2.png')} label={`Riwayat\nPengukuran`} />
        </View>
        <MyGap jarak={30} />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <MyMenu img={require('../../assets/a3.png')} label={`Analisis`} />
          <MyMenu img={require('../../assets/a4.png')} onPress={() => navigation.navigate('Artikel')} label={`Informasi\nKesehatan`} />
        </View>

      </View>




    </LinearGradient>
  )
}

const styles = StyleSheet.create({})