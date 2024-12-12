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

export default function Hasil({ navigation, route }) {
    const item = route.params;
    return (
        <LinearGradient colors={[colors.primary, colors.tertiary]} style={{
            flex: 1,

        }}>
            <MyHeader title="Hasil" />
            <View style={{
                flex: 1,
                padding: 20,
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    zIndex: 99,
                }}>
                    <View style={{
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

                        }}>Tekanan Kaki = {item.hall}</Text>
                    </View>

                </View>
                <View style={{
                    marginTop: -30,
                    paddingTop: 25,
                    paddingHorizontal: 10,
                    borderWidth: 2,
                    borderColor: colors.tujuh,
                    borderRadius: 10,
                    height: 250,

                }}>
                    <View style={{
                        marginTop: 20,
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',

                            padding: 10,
                        }}>
                            <Text style={{
                                ...fonts.caption,
                                backgroundColor: colors.white,
                                textAlign: 'center',
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: colors.tujuh,
                                paddingVertical: 5,

                            }}>IMT</Text>

                            <View style={{

                            }}>
                                <Text style={{
                                    color: colors.white,
                                    textAlign: 'center',
                                    ...fonts.headline3
                                }}>{item.bmi}</Text>
                                <Text style={{
                                    color: colors.white,
                                    textAlign: 'center',
                                    ...fonts.headline3
                                }}>{item.hbmi}</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',

                            padding: 10,
                        }}>
                            <Text style={{
                                ...fonts.caption,
                                backgroundColor: colors.white,
                                textAlign: 'center',
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: colors.tujuh,
                                paddingVertical: 5,

                            }}>Tekanan Sensor</Text>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    color: colors.white,
                                    textAlign: 'center',
                                    ...fonts.headline3
                                }}>Right : {item.kanan}</Text>
                                <Text style={{
                                    color: colors.white,
                                    textAlign: 'center',
                                    ...fonts.headline3
                                }}>Kiri : {item.kiri}</Text>
                                <Text style={{
                                    color: colors.white,
                                    textAlign: 'center',
                                    ...fonts.headline3
                                }}>{item.hall}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({})