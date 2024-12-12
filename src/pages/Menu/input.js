import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyCalendar, MyHeader, MyInput, MyLoading, MyPicker } from '../../components'
import { showMessage } from 'react-native-flash-message';
import { Color, colors, fonts } from '../../utils';
import { apiURL, getData, storeData } from '../../utils/localStorage';
import moment from 'moment';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default function InputSwamedikasi({ navigation, route }) {
    const [visible, setVisible] = useState(false);
    const [kirim, setKirim] = useState({
        fid_pengguna: route.params.id_pengguna,
        usia: '',
        jenis_kelamin: 'Laki-laki',
        tinggi_badan: '',
        berat_badan: '',
        RF: '',
        RD: '',
        RA: '',
        RC: '',
        RB: '',
        RG: '',
        RE: '',
        RH: '',
        LH: '',
        LF: '',
        LG: '',
        LB: '',
        LC: '',
        LA: '',
        LD: '',
        LE: '',


    })

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    }

    const handleDateChange = (date) => {
        console.log("Tanggal yang dipilih:", date);
        setKirim({ ...kirim, tanggal: date });
    };

    const handleDateChangetanggal_lahir = (date) => {
        console.log("Tanggal yang dipilih:", date);
        setKirim({ ...kirim, tanggal_lahir: date });
    };

    const handleInput = () => {
        const requiredFields = [
            { field: kirim.usia, message: "Mohon isi usia!" },
            { field: kirim.jenis_kelamin, message: "Mohon pilih jnis kelamin!" },
            { field: kirim.tinggi_badan, message: "Mohon isi tinggi badan !" },
            { field: kirim.berat_badan, message: "Mohon isi berat badan!" },
        ];

        for (let i = 0; i < requiredFields.length; i++) {
            console.log(requiredFields[i].field.length == 0);
            if (requiredFields[i].field.length === 0) {
                showMessage({
                    type: "default",
                    color: 'white',
                    backgroundColor: colors.danger,
                    message: requiredFields[i].message
                });
                return;
            }

        };

        console.log(kirim);
        let BMI = parseFloat(kirim.berat_badan / Math.pow((kirim.tinggi_badan) / 100, 2)).toFixed(1);
        console.log('BMI', BMI)
        let KANAN = (
            parseFloat(kirim.LH) +
            parseFloat(kirim.LF) +
            parseFloat(kirim.LG) +
            parseFloat(kirim.LB) +
            parseFloat(kirim.LC) +
            parseFloat(kirim.LA) +
            parseFloat(kirim.LD) +
            parseFloat(kirim.LE)

        ) / 8
        let KIRI = (
            parseFloat(kirim.RF) +
            parseFloat(kirim.RD) +
            parseFloat(kirim.RA) +
            parseFloat(kirim.RC) +
            parseFloat(kirim.RB) +
            parseFloat(kirim.RG) +
            parseFloat(kirim.RE) +
            parseFloat(kirim.RH)
        ) / 8
        let ALL = (KANAN + KIRI) / 2;
        let HKANAN = '';
        let HKIRI = '';
        let HALL = ''
        let HBMI = '';

        if (KANAN > 4.21) {
            HKANAN = 'Tekanan Tinggi';
        } else if (KANAN >= 3.21 && KANAN <= 4.21) {
            HKANAN = 'Tekanan Medium';
        } else if (KANAN < 3.21 && KANAN < 5.21) {
            HKANAN = 'Tekanan Rendah';
        }

        if (KIRI > 4.21) {
            HKIRI = 'Tekanan Tinggi';
        } else if (KIRI >= 3.21 && KIRI <= 4.21) {
            HKIRI = 'Tekanan Medium';
        } else if (KIRI < 3.21 && KIRI < 5.21) {
            HKIRI = 'Tekanan Rendah';
        }

        if (ALL > 4.21) {
            HALL = 'Tekanan Tinggi';
        } else if (ALL >= 3.21 && ALL <= 4.21) {
            HALL = 'Tekanan Medium';
        } else if (ALL < 3.21 && ALL < 5.21) {
            HALL = 'Tekanan Rendah';
        }

        if (BMI > 25) {
            HBMI = 'Overweight/Obesitas';
        } else if (BMI >= 18.5 && BMI < 25) {
            HBMI = 'Normal';
        } else if (BMI < 18.5) {
            HBMI = 'Berat Badan Kurang';
        }

        storeData('hasil', {
            ...kirim,
            all: ALL,
            hall: HALL,
            kanan: KANAN,
            kiri: KIRI,
            hkanan: HKANAN,
            hkiri: HKIRI
        });
        navigation.navigate('Hasil', {
            ...kirim,
            bmi: BMI,
            all: ALL,
            hall: HALL,
            hbmi: HBMI,
            kanan: KANAN,
            kiri: KIRI,
            hkanan: HKANAN,
            hkiri: HKIRI
        })


        // setLoading(true)
        // axios.post(apiURL + 'insert_laporan', {
        //     ...kirim,
        //     umur: moment().diff(kirim.tanggal_lahir, 'year')
        // }).then(res => {
        //     console.log(res.data);
        //     setLoading(false)
        //     if (res.data.status == 200) {
        //         navigation.goBack();
        //         showMessage({
        //             type: 'success',
        //             icon: 'success',
        //             message: res.data.message
        //         })
        //     }
        // })



    }


    const [user, setUser] = useState({});

    const [pasien, setPasien] = useState([])
    const __getUser = () => {
        getData('user').then(u => {
            setUser(u)
        })
    }

    const __getPasien = () => {
        axios.post(apiURL + 'get_pasien', {
            fid_pengguna: route.params.id_pengguna
        }).then(res => {

            setPasien(res.data)
        })
    }

    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.post(apiURL + 'get_last').then(res => {
            console.log(res.data);
            setKirim({
                ...kirim,
                nomor_doc: res.data
            })
        })
        __getUser();
        __getPasien();
    }, [])

    return (
        <LinearGradient colors={[colors.primary, colors.tertiary]} style={{
            flex: 1,

        }}>
            <MyHeader title="Data Tekanan Kaki Terkini" />

            <ScrollView>
                <View style={{
                    padding: 20,

                }}>

                    {/* FORM */}
                    <View>
                        {/* nomor telepon pasien */}

                        {/* nomor doc */}
                        <View style={{
                            marginTop: 10
                        }}>
                            <MyInput
                                label="usia"
                                keyboardType='number-pad'
                                onChangeText={(x) => setKirim({ ...kirim, usia: x })}
                                placeholder="Isi Usia"
                                value={kirim.usia}
                            />
                        </View>

                        {/* Jenis kelamin */}
                        <View style={{
                            marginTop: 10
                        }}>
                            <MyPicker value={kirim.jenis_kelamin} onChangeText={(x) => setKirim({ ...kirim, 'jenis_kelamin': x })} label="Jenis Kelamin" data={
                                [
                                    { 'value': 'Laki-laki', 'label': 'Laki-laki' },
                                    { 'value': 'Perempuan', 'label': 'Perempuan' }
                                ]
                            } />
                        </View>
                        {/* Alamat pasien */}
                        <View style={{
                            marginTop: 10
                        }}>
                            <MyInput
                                label="Tinggi Badan"
                                keyboardType='number-pad'
                                onChangeText={(x) => setKirim({ ...kirim, tinggi_badan: x })}
                                placeholder="Isi Tinggi Badan"
                                value={kirim.tinggi_badan}
                            />
                        </View>
                        <View style={{
                            marginTop: 10
                        }}>
                            <MyInput
                                label="Berat Badan"
                                keyboardType='number-pad'
                                onChangeText={(x) => setKirim({ ...kirim, berat_badan: x })}
                                placeholder="Isi Berat Badan"
                                value={kirim.berat_badan}
                            />
                        </View>
                    </View>

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                        zIndex: 99,
                    }}>
                        <View style={{
                            backgroundColor: '#254C54',
                            width: 150,
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

                            }}>Tekanan Sensor</Text>
                        </View>

                    </View>
                    <View style={{
                        marginTop: -30,
                        paddingTop: 25,
                        paddingHorizontal: 10,
                        borderWidth: 2,
                        borderColor: colors.tujuh,
                        borderRadius: 10,

                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.kiri}>
                                <MyInput keyboardType='number-pad' label="LH" value={kirim.LH} onChangeText={x => setKirim({ ...kirim, LH: x })} />
                            </View>
                            <View style={styles.kanan}>
                                <MyInput keyboardType='number-pad' label="RF" value={kirim.RF} onChangeText={x => setKirim({ ...kirim, RF: x })} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.kiri}>
                                <MyInput keyboardType='number-pad' label="LF" value={kirim.LF} onChangeText={x => setKirim({ ...kirim, LF: x })} />
                            </View>
                            <View style={styles.kanan}>
                                <MyInput keyboardType='number-pad' label="RD" value={kirim.RD} onChangeText={x => setKirim({ ...kirim, RD: x })} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.kiri}>
                                <MyInput keyboardType='number-pad' label="LG" value={kirim.LG} onChangeText={x => setKirim({ ...kirim, LG: x })} />
                            </View>
                            <View style={styles.kanan}>
                                <MyInput keyboardType='number-pad' label="RA" value={kirim.RA} onChangeText={x => setKirim({ ...kirim, RA: x })} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.kiri}>
                                <MyInput keyboardType='number-pad' label="LB" value={kirim.LB} onChangeText={x => setKirim({ ...kirim, LB: x })} />
                            </View>
                            <View style={styles.kanan}>
                                <MyInput keyboardType='number-pad' label="RC" value={kirim.RC} onChangeText={x => setKirim({ ...kirim, RC: x })} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.kiri}>
                                <MyInput keyboardType='number-pad' label="LC" value={kirim.LC} onChangeText={x => setKirim({ ...kirim, LC: x })} />
                            </View>
                            <View style={styles.kanan}>
                                <MyInput keyboardType='number-pad' label="RB" value={kirim.RB} onChangeText={x => setKirim({ ...kirim, RB: x })} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.kiri}>
                                <MyInput keyboardType='number-pad' label="LA" value={kirim.LA} onChangeText={x => setKirim({ ...kirim, LA: x })} />
                            </View>
                            <View style={styles.kanan}>
                                <MyInput keyboardType='number-pad' label="RG" value={kirim.RG} onChangeText={x => setKirim({ ...kirim, RG: x })} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.kiri}>
                                <MyInput keyboardType='number-pad' label="LD" value={kirim.LD} onChangeText={x => setKirim({ ...kirim, LD: x })} />
                            </View>
                            <View style={styles.kanan}>
                                <MyInput keyboardType='number-pad' label="RE" value={kirim.RE} onChangeText={x => setKirim({ ...kirim, RE: x })} />
                            </View>
                        </View>
                        <View style={{ paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.kiri}>
                                <MyInput keyboardType='number-pad' label="LE" value={kirim.LE} onChangeText={x => setKirim({ ...kirim, LE: x })} />
                            </View>
                            <View style={styles.kanan}>
                                <MyInput keyboardType='number-pad' label="RH" value={kirim.RH} onChangeText={x => setKirim({ ...kirim, RH: x })} />
                            </View>
                        </View>

                    </View>

                    <View style={{
                        marginTop: 10
                    }}>
                        <MyButton onPress={handleInput} title="Simpan" style={{}} />
                    </View>

                </View>

            </ScrollView>

            {loading && <MyLoading />}
        </LinearGradient>
    )
}


const styles = StyleSheet.create({

    kiri: {
        paddingTop: 10,
        flex: 1,
        paddingHorizontal: 4,
        borderRightWidth: 2,
        borderColor: colors.tujuh
    },
    kanan: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 4,
    }

});