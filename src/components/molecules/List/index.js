import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { DummyDoctor2, IconNext, IconEditProfile, IconLanguage, IconRate, IconHospitals, IconHelp } from '../../../assets'
import { colors } from '../../../utils/colors'
import { fonts } from '../../../utils/fonts'
import { TouchableOpacity } from 'react-native-gesture-handler'

const List = ({profile, name, desc, type, onPress, icon}) => {

    const Icon = () => {
        if (icon === 'edit-profile') {
            return <IconEditProfile/>
        }
        if (icon === 'language') {
            return <IconLanguage/>
        }
        if (icon === 'rate') {
            return <IconRate/>
        }
        if (icon === 'help') {
            return <IconHelp/>
        }
        return <IconEditProfile/>
    }
    
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {icon ? <Icon/> : <Image source={profile} style={styles.avatar} />}
            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.desc}>{desc}</Text>
            </View>
            {
                type === 'next' && <IconNext/>
            } 
        </TouchableOpacity>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth:1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    content: {
        flex:1,
        marginLeft:16
    },

    avatar: {
        width:40,
        height:40,
        borderRadius: 40/2
    },

    name: {
        fontSize:16,
        fontFamily: fonts.primary.normal,
        color: colors.text.primary,
        textTransform:'capitalize'

    },

    desc: {
        fontSize:12,
        fontFamily: fonts.primary[300],
        color: colors.text.secondary,
        textTransform:'capitalize'
    }

})
