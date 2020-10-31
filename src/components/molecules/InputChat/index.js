import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { colors } from '../../../utils/colors'
import { Button } from '../../atoms'
import { fonts } from '../../../utils/fonts'

const InpuChat = ({value, onChangeText, onButtonPress}) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder="Tulis pesan anda"/>
            <Button disable={value.length < 1} type="btn-icon-send" onPress={onButtonPress}/>
        </View>
    )
}

export default InpuChat

const styles = StyleSheet.create({
   
    container: {
        padding: 16,
        flexDirection:'row',
        backgroundColor:colors.white

    },
   
    input: {
        backgroundColor: colors.disable,
        padding:14,
        borderRadius:10,
        flex:1,
        marginRight:10,
        fontSize:14,
        fontFamily: fonts.primary.normal,
        maxHeight:45
    },
})
