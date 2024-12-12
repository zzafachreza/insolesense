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
export default function Artikel({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const getDataTransaksi = () => {
        // setLoading(true);
        getData('user').then(u => {
            axios.post(apiURL + 'edukasi').then(res => {
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

            <TouchableWithoutFeedback onPress={() => navigation.navigate('ArtikelDetail', item)}>
                <View style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    position: 'relative',
                    borderRadius: 10,
                    // margin: 10,
                    marginHorizontal: 5,
                    marginVertical: 10,
                    overflow: 'hidden'
                }}>
                    <Image source={{
                        uri: webURL + item.gambar
                    }} style={{
                        width: '100%',
                        height: 200,
                    }} />
                    <View style={{
                        width: '100%',
                        padding: 10,
                        position: 'absolute',
                        bottom: 0,
                    }}>
                        <Text style={{
                            ...fonts.headline5,
                            color: colors.white,
                            marginBottom: 0,
                            maxWidth: '50%'
                        }}>{item.judul}</Text>

                        <Text style={{
                            ...fonts.caption,
                            color: colors.white,
                            textAlign: 'right'
                        }}>Selengkapnya</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        )
    }

    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState({});

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader title="Informasi Kesehatan" onPress={() => navigation.goBack()} />
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