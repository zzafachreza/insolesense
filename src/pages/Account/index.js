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
} from 'react-native';
import { windowWidth, fonts, MyDimensi } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { ScrollView } from 'react-native';
import { ceil } from 'react-native-reanimated';

export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [act, setact] = useState('');
    const [open, setOpen] = useState(false);

    const [comp, setComp] = useState({});




    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {
                console.log(res)
                setOpen(true);
                setUser(res);

            });

            getData('act').then(res => {
                setact(res)
            })
        }

        axios.post(apiURL + 'company').then(res => {
            console.log(res.data.data);
            setComp(res.data.data)
        })




    }, [isFocused]);



    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    // padding: 10,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: Color.blueGray[200]
                }}>
                <Text
                    style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                        color: colors.white,
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        flex: 1,
                        fontSize: 12,
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        paddingLeft: 10
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <LinearGradient colors={[colors.primary, colors.tertiary]} style={{
            flex: 1,

        }}>



            <MyHeader title="Profile" onPress={() => navigation.goBack()} />
            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
            <ScrollView showsVerticalScrollIndicator={false}>
                {open &&

                    <View style={{
                        margin: 5,
                        flex: 1,
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                        </View>
                        <View style={{ padding: 10, }}>
                            <TouchableOpacity style={{
                                alignSelf: 'flex-end',
                                width: 100,
                                height: 30,
                                borderRadius: 10,
                                backgroundColor: colors.secondary,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }} onPress={() => navigation.navigate('AccountEdit', user)} >
                                <Text style={{
                                    ...fonts.caption,
                                    color: colors.tertiary
                                }}>Edit Profil</Text>
                            </TouchableOpacity>
                            <MyList label="Username" value={user.username} />
                            <MyList label="Nomor Telepon" value={user.telepon} />
                            <MyList label="Tanggal Lahir" value={user.tanggal_lahir} />
                            <MyList label="Usia" value={user.usia} />
                            <MyList label="Jenis Kelamin" value={user.jenis_kelamin} />
                            <MyList label="Tinggi Badan" value={user.tinggi} />
                            <MyList label="Berat Badan" value={user.berat} />

                            <MyList label="Riwayat Penyakit" value={user.riwayat_penyakit} />

                        </View>
                        {/* data detail */}
                    </View>

                }
                <View style={{
                    padding: 20,
                }}>

                    <TouchableOpacity onPress={() => {
                        Linking.openURL('https://wa.me/' + comp.tlp)
                    }} style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                        alignItems: 'center'
                    }}>
                        <Image source={require('../../assets/p1.png')} style={{
                            width: 18,
                            height: 18,

                        }} />
                        <Text style={{
                            left: 10,
                            color: colors.white,
                            ...fonts.body3,
                        }}>Pusat Bantuan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                        alignItems: 'center'
                    }}>
                        <Image source={require('../../assets/p2.png')} style={{
                            width: 18,
                            height: 18,
                            resizeMode: 'contain'

                        }} />
                        <Text style={{
                            left: 10,
                            color: colors.white,
                            ...fonts.body3,
                        }}>Pengaturan Sensor</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                        alignItems: 'center'
                    }}>
                        <Image source={require('../../assets/p3.png')} style={{
                            width: 18,
                            height: 18,
                            resizeMode: 'contain'

                        }} />
                        <Text style={{
                            left: 10,
                            color: colors.white,
                            ...fonts.body3,
                        }}>Log Aktivitas</Text>
                    </TouchableOpacity>
                    <Text style={{
                        color: colors.white,
                        ...fonts.headline4,
                    }}>{act}</Text>
                    <MyGap jarak={10} />
                    <MyButton onPress={btnKeluar} warna={colors.enam} title="Keluar" iconColor={colors.white} colorText={colors.white} />
                </View>
            </ScrollView>
        </LinearGradient >
    );
}

const styles = StyleSheet.create({});
