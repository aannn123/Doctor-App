import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Profile, List, Gap } from '../../components'
import { colors } from '../../utils/colors'
import { getData } from '../../utils/localstorage'
import { ILNullPhoto } from '../../assets'
import { Firebase } from '../../config'
import { showMessage } from 'react-native-flash-message'

const UserProfile = ({navigation}) => {
    const [profile, setProfile] = useState({
        fullName: '',
        profession: '',
        photo: ILNullPhoto,
    });
    useEffect(() => {
        getData('user').then(res => {
            const data = res;
            data.photo = {uri: res.photo};
            setProfile(data);
        });
    }, []);

    const signOut = () => {
        Firebase.auth().signOut().then(() => {
            navigation.replace('GetStarted');
        }).catch(err => {
            showMessage({
                message:err.message,
                type:'default',
                backgroundColor:colors.error,
                color:colors.white
            })
        })
    }
    return (
        <View style={styles.page}>
            <Header title="Profile" onPress={() => navigation.goBack()} />
            <Gap height={10} />
            {profile.fullName.length > 0 && <Profile photo={profile.photo} name={profile.fullName} desc={profile.profession} />}
            
            <Gap height={16} />
            <List 
                icon="edit-profil" 
                name="Edit Profile" 
                desc="Last Upadate Yesterday" 
                type="next"
                onPress={() => navigation.navigate('UpdateProfile')}    
            />
            <List 
                icon="language" 
                name="Language" 
                desc="Last Upadate Yesterday" 
                type="next" />
            <List 
                icon="rate" 
                name="Rate" 
                desc="Last Upadate Yesterday" 
                type="next" />
            <List 
                icon="help" 
                name="Sign Out" 
                desc="Last Upadate Yesterday" 
                type="next"
                onPress={() => signOut()}
                />
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex:1
    }
})
