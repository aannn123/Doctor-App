import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { colors } from '../../../utils/colors'
import { fonts } from '../../../utils/fonts'

const Input = ({label, value, onChangeText, secureTextEntry, disable}) => {

    const [border, setBorder] = useState(colors.border);
    const onFocusForm = () => {
        setBorder(colors.tertiary)
    }
    const onBlurForm = () => {
        setBorder(colors.border)
    }

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
                secureTextEntry={secureTextEntry}
                onFocus={onFocusForm}
                onBlur={onBlurForm}
                style={styles.input(border)}
                value={value}
                onChangeText={onChangeText}
                editable={!disable}
                selectTextOnFocus={!disable}
            />
        </View>
    )
}

// onChaneText ketika teksnya berubah dia harus menerima value function

export default Input

const styles = StyleSheet.create({
    input: (border) => (
        {
            borderWidth:1,
            borderColor: border,
            borderRadius:10,
            padding:12
        }
    ),
    label: {
        fontSize:16,
        color: colors.text.secondary,
        marginBottom:6,
        fontFamily: fonts.primary[400]
    }
})


// onFocus : Fungsi yang akan kita berikan kepada form ketika kita klik form tersebut(berarti dia dalam posisi onfocus)
// onBlur : ketika kita berpindah form lain berarti dia onblur
