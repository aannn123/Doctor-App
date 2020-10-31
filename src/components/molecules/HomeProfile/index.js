import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { ILNullPhoto } from '../../../assets'
import { fonts } from '../../../utils/fonts'
import { colors } from '../../../utils/colors'
import { getData } from '../../../utils/localstorage'

const HomeProfile = ({onPress}) => {
    const [profile, setProfile] = useState({
        photo : ILNullPhoto,
        fullName: '',
        profession: ''
    });

    useEffect(() => {
        getData('user').then(res => {
            const data = res;
            data.photo = {uri: res.photo};
            setProfile(data);
        });
    })

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={profile.photo} style={styles.avatar} />
            <View>
                <Text style={styles.name}>{profile.fullName}</Text>
                <Text style={styles.proffesion}>{profile.profession}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HomeProfile

const styles = StyleSheet.create({
    container: {
        flexDirection:'row'
    },
    avatar: {
        width:46,
        height: 46,
        borderRadius:46 / 2,
        marginRight: 12
    },
    name: {
        fontSize:16, 
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        textTransform: 'capitalize',
    },
    proffesion: {
        fontSize:12, 
        fontFamily: fonts.primary[400],
        color: colors.text.secondary,
        textTransform:'capitalize',
    }
})
