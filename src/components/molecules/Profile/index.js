import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import {DummyDoctor2, IconRemovePhoto } from '../../../assets'
import { colors } from '../../../utils/colors'
import { fonts } from '../../../utils/fonts'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Profile = ({name, desc, isRemove, photo, onPress}) => {
    return (
        <View style={styles.container}>
            {!isRemove && 
                <View style={styles.borderProfile}>
                    <Image style={styles.avatar} source={photo} />
                    {/* { isRemove &&   <IconRemovePhoto style={styles.removePhoto}/> } */}
                </View>
            }
            {isRemove && 
                <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
                    <Image style={styles.avatar} source={photo} />
                    { isRemove &&   <IconRemovePhoto style={styles.removePhoto}/> }
                </TouchableOpacity>
            }
            {
                name && (
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.profession}>{desc}</Text>
                    </View>
                )
            }
           
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems: 'center'
    },
    borderProfile: {
        width:130,
        height:130,
        borderRadius:130/2,
        borderWidth:1,
        borderColor: colors.border,
        justifyContent:'center',
        alignItems:'center'
    },
    avatar: {
        width:110,
        height:110,
        borderRadius:110/2
    },
    name: {
        fontSize:26,
        fontFamily: fonts.primary[600],
        color:colors.text.primary,
        marginTop:1,
        textAlign: 'center',
        textTransform:'capitalize'
    },
    profession: {
        fontSize:16,
        fontFamily: fonts.primary[600],
        color:colors.text.secondary,
        marginTop:2,
        textAlign: 'center',
        textTransform:'capitalize'
    },
    removePhoto: {
        position: 'absolute',
        right:8,
        bottom:8
    }
})
