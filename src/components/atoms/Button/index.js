import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors } from '../../../utils/colors'
import { color } from 'react-native-reanimated'
import IconOnly from './IconOnly'
import { fonts } from '../../../utils/fonts'
import BtnIconSend from './btnIconSend'

const Button = ({type, title, onPress, icon, disable}) => {

    if (type === 'btn-icon-send') {
            return  <BtnIconSend onPress={onPress} disable={disable}/>
    }

    if (type === 'icon-only') {
        return (
            <IconOnly icon={icon} onPress={onPress} />
        )
    }

    if (disable) {
        
    return (
        <View style={styles.disableBg}>
            <Text style={styles.disableText}>{title}</Text>
        </View>
    )
    }

    return (
        <TouchableOpacity style={styles.container(type)} onPress={onPress}>
            <Text style={styles.text(type)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: type => ({
        backgroundColor: type === 'secondary' 
        ? colors.button.secondary.background 
        : colors.button.primary.background ,
        borderRadius:10,
        paddingVertical:10    
    }),

    disableBg: {
        borderRadius:10,
        paddingVertical:10,
        backgroundColor: colors.button.disable.background
    },

    text: type => ({
        fontSize:18, 
        fontFamily: fonts.primary[600],
        textAlign:'center',
        color: type === 'secondary' 
        ? colors.text.primary
        : colors.white
    }),

    disableText: {
        fontSize:18, 
        fontFamily: fonts.primary[600],
        textAlign:'center',
        color: colors.button.disable.text  
    }
        
})
