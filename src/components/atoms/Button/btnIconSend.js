import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { IconSendDark, IconSendLight } from '../../../assets'
import { colors } from '../../../utils/colors'

const BtnIconSend = ({disable, onPress}) => {
    if (disable) {
        return (
            <View style={styles.container(disable)}>
            <IconSendDark/>
             </View>
        )
       
    }
    return (
        <TouchableOpacity onPress={onPress} style={styles.container(disable)}>
            {/* {disable && <IconSendDark/>} */}
            <IconSendLight/>
        </TouchableOpacity>
    )
}

export default BtnIconSend

const styles = StyleSheet.create({
    container: (disable) => (
        {
            backgroundColor: disable ? colors.disable : colors.tertiary,
            width:45,
            height:45,
            borderRadius:10,
            paddingTop:3,
            paddingRight:3,
            paddingLeft:10,
            paddingBottom:10,
            alignItems: 'center'
        }
    )
})
