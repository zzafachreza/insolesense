import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { MyDimensi, fonts, windowWidth, } from '../../utils/fonts';
import { Icon } from 'react-native-elements';

import LinearGradient from 'react-native-linear-gradient';
import { Color, colors } from '../../utils';

export default function MyButton({
  title,
  warna = colors.foourty,
  warna2 = colors.enam,
  onPress,
  Icons,
  radius = 30,
  colorText = '#2D666A',
  fontWeight = 'normal',
  iconColor = colors.primary,
  borderSize = 0,
  kiri = true,
  borderColor = Color.blueGray[300],
}) {
  return (
    <TouchableOpacity

      onPress={onPress}>
      <LinearGradient colors={[warna, warna2]} style={styles(warna, radius, borderSize, borderColor).btn}>

        {kiri && <Icon type="ionicon" name={Icons} color={iconColor} size={24} />}
        <Text
          style={{
            color: colorText,

            marginLeft: kiri ? 5 : 0,
            marginRight: !kiri ? 5 : 0,
            fontFamily: fonts.primary[700],
            // fontWeight: fontWeight,
          }}>
          {title}
        </Text>
        {!kiri && <Icon type="ionicon" name={Icons} color={iconColor} size={24} />}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = (warna, radius, borderSize, borderColor) =>
  StyleSheet.create({
    btn: {
      marginTop: 15,
      height: 40,
      borderRadius: radius,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: borderSize,
      borderColor: borderColor,
      flexDirection: 'row',

    },
  });
