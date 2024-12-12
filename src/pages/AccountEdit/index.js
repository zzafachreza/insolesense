import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import SweetAlert from 'react-native-sweet-alert';
import MyLoading from '../../components/MyLoading';
import LinearGradient from 'react-native-linear-gradient';

export default function AccountEdit({ navigation, route }) {


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'update_profile', kirim).then(res => {
            console.log(res.data)

            setLoading(false);

            if (res.data.status == 200) {
                SweetAlert.showAlertWithOptions({
                    title: MYAPP,
                    subTitle: res.data.message,
                    style: 'success',
                    cancellable: true
                },
                    callback => {
                        storeData('user', res.data.data);
                        navigation.replace('MainApp');
                    });


            }
        })
    }

    useEffect(() => {
        setKirim({
            ...kirim,
            newfoto_user: null,
        })
    }, [])

    return (
        <LinearGradient colors={[colors.primary, colors.tertiary]} style={{
            flex: 1,

        }}>
            <MyHeader title="Edit Profile" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 20,
            }}>




                {/*  nama lengkap dan gelar */}
                {/*  nama lengkap dan gelar */}
                <View>
                    <MyInput
                        label="Nama Lengkap"
                        placeholder="Isi Nama Lengkap"
                        value={kirim.nama_lengkap}
                        onChangeText={(x) => setKirim({ ...kirim, nama_lengkap: x })}
                    />
                </View>

                {/* USERNAME */}
                <View style={{
                    marginTop: 15
                }}>
                    <MyInput
                        label="Username"
                        placeholder="Isi Username"
                        value={kirim.username}
                        onChangeText={(x) => setKirim({ ...kirim, username: x })}
                    />
                </View>

                {/* Nomor WhatsApp */}
                <View style={{
                    marginTop: 15
                }}>
                    <MyInput
                        label="Nomor Telepon"
                        placeholder="Nomor Telepon"
                        keyboardType='phone-pad'
                        value={kirim.telepon}
                        onChangeText={(x) => setKirim({ ...kirim, telepon: x })}
                    />
                </View>

                {/* nama apotek */}
                <View style={{
                    marginTop: 15
                }}>
                    <MyCalendar label="Tanggal Lahir" value={kirim.tanggal_lahir} onDateChange={x => setKirim({ ...kirim, tanggal_lahir: x })} />
                </View>


                {/* Nomor WhatsApp */}
                <View style={{
                    marginTop: 15
                }}>
                    <MyInput
                        label="Usia"
                        placeholder="Usia"
                        keyboardType='number-pad'
                        value={kirim.usia}
                        onChangeText={(x) => setKirim({ ...kirim, usia: x })}
                    />
                </View>


                {/*Link Google Maps Apotek */}
                <View style={{
                    marginTop: 15
                }}>

                    <MyPicker onValueChange={x => setKirim({
                        ...kirim,
                        jenis_kelamin: x
                    })} label="Jenis Kelamin" value={kirim.jenis_kelamin} data={[
                        { value: 'Laki-laki', label: 'Laki-laki' },
                        { value: 'Perempuan', label: 'Perempuan' }

                    ]} />
                </View>


                <View style={{
                    marginTop: 15
                }}>
                    <MyInput
                        label="Tinggi Badan"
                        placeholder="Tinggi Badan"
                        keyboardType='numeric'
                        value={kirim.tinggi}
                        onChangeText={(x) => setKirim({ ...kirim, tinggi: x })}
                    />
                </View>


                <View style={{
                    marginTop: 15
                }}>
                    <MyInput
                        label="Berat Badan"
                        placeholder="Berat Badan"
                        keyboardType='numeric'
                        value={kirim.berat}
                        onChangeText={(x) => setKirim({ ...kirim, berat: x })}
                    />
                </View>

                <View style={{
                    marginTop: 15
                }}>
                    <MyInput
                        label="Riwayat Penyakit"
                        placeholder="Riwayat Penyakit"
                        multiline
                        value={kirim.riwayat_penyakit}
                        onChangeText={(x) => setKirim({ ...kirim, riwayat_penyakit: x })}
                    />
                </View>


                {/* passowrd */}
                <View style={{
                    marginTop: 15
                }}>
                    <MyInput
                        label="Kata Sandi"
                        placeholder="Kosongkan jika tidak diubah"
                        secureTextEntry={true}
                        value={kirim.newpassword}
                        onChangeText={(x) => setKirim({ ...kirim, 'newpassword': x })}
                    />
                </View>


                {!loading && <MyButton warna={colors.secondary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
                <MyGap jarak={20} />
            </ScrollView>
            {loading && <MyLoading />}
        </LinearGradient >
    )
}

const styles = StyleSheet.create({})