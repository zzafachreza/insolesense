import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, getData, webURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyHeader } from '../../components';
import { useIsFocused } from '@react-navigation/native';
export default function RiwayatPelayanan({ navigation, route }) {
  const item = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getDataTransaksi = () => {
    // setLoading(true);
    getData('user').then(u => {
      axios.post(apiURL + 'laporan', {
        fid_pengguna: u.id_pengguna
      }).then(res => {
        console.log(res.data);
        setData(res.data)
      })
    })
  }

  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getDataTransaksi();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (

      <View style={{
        flex: 1,
        borderWidth: 1,
        borderColor: colors.primary,
        padding: 10,
        position: 'relative',
        borderRadius: 10,
        // margin: 10,
        marginHorizontal: 5,
        marginVertical: 10,
        overflow: 'hidden'
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <Text style={{
            flex: 0.5,
            ...fonts.subheadline3,
            color: colors.primary,
          }}>Telepon</Text>
          <Text style={{
            flex: 0.05,
            ...fonts.subheadline3
          }}>:</Text>
          <Text style={{
            flex: 1,
            ...fonts.body3
          }}>{item.nomor_telepon}</Text>
        </View>
        <View style={{
          flexDirection: 'row'
        }}>
          <Text style={{
            flex: 0.5,
            ...fonts.subheadline3,
            color: colors.primary,
          }}>Nama Pasien</Text>
          <Text style={{
            flex: 0.05,
            ...fonts.subheadline3
          }}>:</Text>
          <Text style={{
            flex: 1,
            ...fonts.body3
          }}>{item.nama_pasien}</Text>
        </View>
        <View style={{
        }}>
          <Text style={{
            flex: 0.5,
            ...fonts.subheadline3,
            color: colors.primary,
          }}>Hasil Diskusi Terakhir</Text>
          <Text style={{
            flex: 1,
            ...fonts.body3
          }}>{item.hasil}</Text>
        </View>
        <Text style={{
          marginTop: 10,
          ...fonts.body3,
          color: Color.blueGray[400],
        }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>
        <MyButton onPress={() => {
          Linking.openURL(webURL + 'laporan/print/' + item.id_laporan)
        }} warna={colors.danger} title="PDF" />

        <MyButton onPress={() => {
          navigation.navigate('Edit', item)
        }} warna={colors.primary} title="Edit" />
      </View>

    )
  }

  const [key, setKey] = useState('');
  const [TMP, setTMP] = useState({});

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>

      <MyHeader title="Riwayat Pelayanan" onPress={() => navigation.goBack()} />
      {!loading &&
        <View style={{
          flex: 1,
          padding: 16
        }}>

          <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

        </View>
      }


      {loading &&
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator size="large" color={colors.primary} />

        </View>
      }


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})