import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Header, Button, Link, Gap } from '../../components'
import { colors } from '../../utils/colors'
import { ILNullPhoto } from '../../assets'
import { IconAddPhoto, IconRemovePhoto } from '../../assets/icon'
import { fonts } from '../../utils/fonts'
import ImagePicker from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message'
import { Firebase } from '../../config'
import { storeData } from '../../utils/localstorage'

const UploadPhoto = ({navigation, route}) => {
    const {fullName, profession, uid} = route.params;
    const [photoForDB, setPhotoForDB] = useState('');
    const [hasPhoto, setHasPhoto] = useState(false);
    const [photo, setPhoto] = useState(ILNullPhoto);
    const getImage = () => {
        ImagePicker.launchImageLibrary(
            {quality: 0.5, maxWidth: 200, maxHeight: 200},
            response => {
            if (response.didCancel || response.error) {
                showMessage({
                    message: 'oops, sepertinya anda tidak memilih foto nya?',
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white
                })
            }else {
                setPhotoForDB(`data:${response.type};base64, ${response.data}`);
              
                const source = {uri: response.uri };
                setPhoto(source);
                setHasPhoto(true); 
            }
            
        });
    }
    const uploadAndContinue = () => {
        Firebase.database()
        .ref('users/' + uid + '/')
        .update({photo: photoForDB});

        const data = route.params;
        data.photo = photoForDB;
        storeData('user',data);

        navigation.replace('MainApp');
    }

    return (
        <View style={styles.page}>
            <Header title="Upload Photo" />
            <View style={styles.content}>
                <View style={styles.profile}>
                    <TouchableOpacity style={styles.avatarWrapper} onPress={getImage} >
                        <Image source={photo} style={styles.avatar} />
                        {hasPhoto &&  <IconRemovePhoto style={styles.addPhoto} />}
                        {!hasPhoto && <IconAddPhoto style={styles.addPhoto}/>}
                    </TouchableOpacity>
                    <Text style={styles.name} >{fullName}</Text>
                    <Text style={styles.proffesion}>{profession}</Text>
                </View>
                <View>
                    <Button 
                        title="Upload and Continue" 
                        onPress={uploadAndContinue} 
                        disable={!hasPhoto}
                    />
                    <Gap height={20} />
                    <Link text="Skip for this" align="center" size={16} onPress={() => navigation.replace('MainApp')} />
                </View>
              
            </View>
        </View>
    )
}

export default UploadPhoto

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex:1,
    },

    profile : {
        alignItems: 'center',
        flex:1,
        justifyContent: 'center'
    },

    content: {
        paddingHorizontal: 40, 
        paddingBottom:64,
        flex:1,
        justifyContent: 'space-between'
    },

    avatar: {
        width:110,
        height:110,
        borderRadius:110/2
    },

    avatarWrapper: {
        width:130,
        height:130,
        borderWidth:1,
        borderColor: colors.border,
        borderRadius:130/2,
        alignItems:'center',
        justifyContent:'center'
    },
    addPhoto: {
        position: 'absolute',
        bottom: 8,
        right:6
    },
    name: {
        fontSize:24,
        color: colors.text.primary,
        fontFamily: fonts.primary[600],
        textAlign:'center',
        textTransform:'capitalize',
    },
    proffesion: {
        fontSize:18,
        color: colors.text.secondary,
        fontFamily: fonts.primary.normal,
        textAlign:'center',
        textTransform:'capitalize',
        marginTop: 4
    }
})
