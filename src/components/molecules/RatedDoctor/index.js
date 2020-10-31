import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { DummyDoctor1 } from '../../../assets'
import { IconStar } from '../../../assets/icon'
import { fonts } from '../../../utils/fonts'
import { colors } from '../../../utils/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

const RatedDoctor = ({onPress, name, desc, avatar}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={avatar} style={styles.avatar} />
            <View style={styles.profile}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.category}>{desc}</Text>
            </View>
            <View style={styles.rate}>
                <IconStar/>   
                <IconStar/>   
                <IconStar/>   
                <IconStar/>   
                <IconStar/>   
            </View>
        </TouchableOpacity>
    )
}

export default RatedDoctor

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom:16,
        alignItems:'center'
    },

    avatar: {
        width: 50,
        height:50,
        borderRadius: 50 / 2,
        marginRight: 12
    },

    profile: {
        flex:1
    },

    rate: {
        flexDirection: 'row'
    },

    name: {
        fontSize:16,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        textTransform:'capitalize'
    },

    category: {
        fontSize:12,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 2
    }
    
})
