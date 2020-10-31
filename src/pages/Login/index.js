import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ILLogo } from '../../assets'
import { Input, Link, Button, Gap, Loading } from '../../components'
import { Firebase } from '../../config'
import { ScrollView } from 'react-native-gesture-handler'
import { storeData } from '../../utils/localstorage'
import { useDispatch } from 'react-redux'
import { showErr, fonts, colors, useForm } from '../../utils'

const Login = ({navigation}) => {
    const [form, setForm] = useForm({email:'', password:''});
    const dispatch = useDispatch();

    
    const login = () => {
        dispatch({type:'SET_LOADING', value: true})
        Firebase.auth().signInWithEmailAndPassword(form.email, form.password)
                .then(res => {
                    dispatch({type:'SET_LOADING', value: false})

                    Firebase.database().ref(`users/${res.user.uid}`)
                            .once('value') //  untuk pemanggilan ke firebase sekali aja
                            .then(resDB => {
                                if (resDB.val()) {
                                    storeData('user', resDB.val);
                                    navigation.replace('MainApp');
                                }
                            })
                })
                .catch(err => {
                    dispatch({type:'SET_LOADING', value: false})
                    showErr(err.message)
                })
    }

    return (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Gap height={40}/>
                <ILLogo/>
                <Text style={styles.title}>Masuk dan mulai berkonsultansi</Text>
                <Gap height={30} />
                <Input value={form.email} label="Email Address" onChangeText={value => setForm('email', value)}/>
                <Gap height={24} />
                <Input value={form.password} secureTextEntry label="Password" onChangeText={value => setForm('password', value)}/>
                <Gap height={10} />
                <Link text="Forgot My Password" size={12} />
                <Gap height={40} />
                <Button title="Sign In" onPress={login} />
                <Gap height={30} />
                <Link text="Create New Account" size={16} align="center" onPress={() => navigation.navigate('Register')} />
            </ScrollView>
      </View>
    )
}

export default Login

const styles = StyleSheet.create({
    page: {
        paddingHorizontal:40,
        flex:1,
        color: colors.white
    },

    title: {
        fontSize:20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 40,
        maxWidth:153
    },
})
