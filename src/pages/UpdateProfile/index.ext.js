import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, ImagePickerIOS } from 'react-native'
import { Header, Profile, Input, Button, Gap } from '../../components'
import { colors } from '../../utils/colors'
import { ILNullPhoto } from '../../assets'
import { getData, storeData } from '../../utils/localstorage'
import { Firebase } from '../../config'
import ImagePicker from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message'


const UpdateProfile = ({navigation}) => {
    const [profile, setProfile] = useState({
        fullName: '',
        profession: '',
        email: '',
        photo: ILNullPhoto
    });

    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(photo);
    const [photoForDB, setPhotoForDB] = useState('');

    useEffect(() => {
        getData('user').then(res => {
            const data = res;
            setPhoto({uri: res.photo});
            setProfile(data);
        });
    }, []); 

    const updateProfile = () => {
       

        if (password.length > 0) {
            if (password.length < 6) {
                showMessage({
                    message: 'Password kurang dari 6 karakter',
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white
                }) 
            } else {
                // Update password
                updatePassword();
                updateProfileData();
                navigation.replace('MainApp');
            }
        } else {
            updateProfileData();
            navigation.replace('MainApp');
        }
     
    }

    const updatePassword = () => {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                user.updatePassword(password)
                    .then(res => {
                        showMessage({
                            message: 'Password berasil diupdate',
                            type: 'success'
                        })
                    })
                    .catch(err => {
                        showMessage({
                            message: err.message,
                            type: 'default',
                            backgroundColor: colors.error,
                            color: colors.white
                        })
                    })
            }
        })
    }

    const updateProfileData = () => {
        const data = profile;
        data.photo = photoForDB;
        Firebase.database()
        .ref(`users/${profile.uid}/`)
        .update(data)
        .then(() => {
            storeData('user', data);
        })
        .catch(err => {
            showMessage({
                message: err.message,
                type: 'default',
                backgroundColor: colors.error,
                color: colors.text
            })

        })
    }
    const changeText = (key, value) => {
        setProfile({
            ...profile,
            [key] : value,
        })
    }

    const getImage = () => {
        ImagePicker.launchImageLibrary(
            {quality: 0.5, maxWidth: 200, maxHeight: 200},
            response => {
            // ('response :', response)
            if (response.didCancel || response.error) {
                showMessage({
                    message: 'oops, sepertinya anda tidak memilih foto nya?',
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white
                })
            }else {
                const source = {uri: response.uri };
                setPhotoForDB(`data:${response.type};base64, ${response.data}`);
                setPhoto(source);
                // setHasPhoto(true); 
            }
            
        }
        )
    }
    return (
        <View style={styles.container}> 
            <Header title="Update Profile" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Profile photo={photo} isRemove onPress={getImage} />
                    <Gap height={26} />
                    <Input value={profile.fullName} onChangeText={(value) => changeText('fullName', value)} label="Full Name"/>
                    <Gap height={24} />
                    <Input value={profile.profession} onChangeText={(value) => changeText('profession', value)} label="Pekerjaan"/>
                    <Gap height={24} />
                    <Input disable value={profile.email} label="Email"/>
                    <Gap height={24} />
                    <Input label="Password" value={password} secureTextEntry onChangeText={(value) => setPassword(value)} />
                    <Gap height={40} />
                    <Button title="Save Profile" onPress={updateProfile} />
                </View>
            </ScrollView>
        </View>
    )
}

export default UpdateProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor:colors.white,
        flex:1,
    },
    content: {
        padding:40,
        paddingTop:0
    }
})
