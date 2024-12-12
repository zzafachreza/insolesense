import { View, Text, ScrollView, ImageBackground, TouchableWithoutFeedback, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { Image } from 'react-native'
import { MyButton, MyCalendar, MyGap, MyInput, MyLoading, MyPicker } from '../../components'
import { showMessage } from 'react-native-flash-message'
import axios from 'axios'
import { api_token, apiURL, MYAPP, storeData } from '../../utils/localStorage'
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment'
import { FlatList } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
export default function Register({ navigation }) {

    const [pilihan, setPilihan] = useState([
        {
            label: 'Diabetes',
            value: 0,
        },
        {
            label: 'Arthritis/Rematik',
            value: 0,
        },
        {
            label: 'Cedera Kaki',
            value: 0,
        },
        {
            label: 'Kondisi Postur atau Masalah Punggung atau Skoliosis',
            value: 0,
        },
        {
            label: 'Obesitas ',
            value: 0,
        },
        {
            label: 'Gangguan Sirkulasi (Varises)',
            value: 0,
        },
        {
            label: 'Kaki Datar atau Lengkung Kaki Tinggi',
            value: 0,
        },
        {
            label: 'Gangguan Neurologis (Neuropati) ',
            value: 0,
        },
        {
            label: 'Penyakit Jantung atau Pembuluh Darah',
            value: 0,
        },
        {
            label: 'Riwayat Operasi Kaki atau Patah Tulang',
            value: 0,
        },
    ])

    const [kirim, setKirim] = useState({
        api_token: api_token,
        nama_lengkap: '',
        username: '',
        telepon: '',
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        usia: '',
        jenis_kelamin: 'Laki-laki',
        tinggi: '',
        berat: '',
        riwayat_penyakit: pilihan.filter(i => i.value > 0).map(i => i.label),
        password: '',
        repassword: ''
    });




    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        const requiredFields = [
            { field: kirim.nama_lengkap, message: "Mohon isi nama lengkap" },
            { field: kirim.username, message: "Mohon isi usernam" },
            { field: kirim.telepon, message: "Mohon isi telepon !" },
            { field: kirim.tinggi, message: "Mohon isi tinggi badan !" },
            { field: kirim.berat, message: "Mohon isi berat badan !" },
            { field: kirim.password, message: "Mohon isi Password!" },
            { field: kirim.repassword, message: "Mohon isi Konfirmasi Password!" },
        ];

        for (let i = 0; i < requiredFields.length; i++) {
            if (requiredFields[i].field.length === 0) {
                showMessage({
                    type: "default",
                    color: 'white',
                    backgroundColor: colors.danger,
                    message: requiredFields[i].message
                });
                return;
            }
        }

        if (kirim.password != kirim.repassword) {
            showMessage({
                type: "default",
                color: 'white',
                backgroundColor: colors.danger,
                message: 'Password & Konfirmasi Password tidak sama!'
            })

        } else {


            setLoading(true)
            axios
                .post(apiURL + 'register', {
                    ...kirim,
                    riwayat_penyakit: pilihan.filter(i => i.value > 0).map(i => i.label).join(),
                })
                .then(response => {
                    if (response.data.status === 200) {
                        setLoading(true);
                        console.log(response.data);
                        storeData('user', kirim);
                        navigation.replace("Login");
                        Alert.alert(MYAPP, "Selamat!, Anda berhasil daftar!");
                    } else if (response.data.status === 404) {
                        setLoading(false);
                        showMessage({
                            type: 'default',
                            color: 'white',
                            backgroundColor: colors.danger,
                            message: "Username sudah ada!"
                        })
                    } else {
                        setLoading(false);
                        showMessage({
                            type: 'default',
                            color: 'white',
                            backgroundColor: colors.danger,
                            message: "Kesalahan Jaringan"
                        });
                    }

                })
                .catch(error => {
                    setLoading(false);
                    console.error("Terjadi kesalahan dari server!", error);
                    showMessage({
                        type: "default",
                        color: "white",
                        backgroundColor: colors.danger,
                        message: "Terjadi kesalahan di server, coba lagi nanti."
                    });
                })
        }

    }

    return (
        <LinearGradient colors={[colors.primary, colors.tertiary]} style={{
            flex: 1,

        }}>


            {loading && <MyLoading />}

            <ScrollView>



                <View style={{
                    padding: 10,

                }}>

                    <Text style={{
                        fontFamily: fonts.primary[700],
                        fontSize: 30,
                        textAlign: "center",
                        color: colors.white,
                    }}>Daftar</Text>



                    {/* form */}

                    <View style={{
                        padding: 10,
                        marginTop: '2%'
                    }}>


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


                        {/* Nomor SIPA */}
                        <View style={{
                            marginTop: 15
                        }}>
                            <Text style={{ ...fonts.headline3, color: colors.white }}>Riwayat Penyakit Anda :</Text>
                            <Text style={{ ...fonts.caption1, color: colors.white }}>*dapat memilih lebih dari satu</Text>
                            <FlatList data={pilihan} renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        let tmp = [...pilihan];
                                        tmp[index].value = tmp[index].value > 0 ? 0 : 1;
                                        setPilihan(tmp);
                                    }} style={{
                                        padding: 2,
                                        flexDirection: 'row',
                                        alignItemsL: 'center'
                                    }}>
                                        <Icon type='ionicon' name='checkmark-circle' color={item.value > 0 ? colors.secondary : colors.white} />
                                        <Text style={{ ...fonts.caption, color: colors.white, left: 10, }}>{item.label}</Text>
                                    </TouchableOpacity>
                                )
                            }} />

                        </View>






                        {/* passowrd */}
                        <View style={{
                            marginTop: 15
                        }}>
                            <MyInput
                                label="Buat Kata Sandi"
                                placeholder="Isi Buat Kata Sandi"
                                secureTextEntry={true}
                                value={kirim.password}
                                onChangeText={(x) => setKirim({ ...kirim, 'password': x })}
                            />
                        </View>

                        {/* passowrd */}
                        <View style={{
                            marginTop: 15
                        }}>
                            <MyInput
                                label="Konfirmasi Buat Kata Sandi"
                                placeholder="Isi Konfirmasi Kata Sandi"
                                secureTextEntry={true}
                                value={kirim.repassword}
                                onChangeText={(x) => setKirim({ ...kirim, 'repassword': x })}
                            />
                        </View>


                        {/* button */}
                        <View>
                            <MyButton onPress={handleRegister} title="Daftar" />
                        </View>

                    </View>


                    {/* register */}

                    <View style={{
                        padding: 10,
                        marginTop: "5%"
                    }}>

                        {/* register */}
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                            <View>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    textAlign: "center",
                                    color: colors.white
                                }}>
                                    Sudah memiliki akun? Silakan  <Text style={{

                                        color: colors.white
                                    }}>Masuk</Text>
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
            </ScrollView>

        </LinearGradient>
    )
}