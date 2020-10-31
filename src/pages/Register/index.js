import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header, Input, Button, Gap } from '../../components'
import { colors } from '../../utils/colors'
import { ScrollView } from 'react-native-gesture-handler'
import { useForm } from '../../utils/useForm'
import { Firebase } from '../../config'
import { storeData } from '../../utils/localstorage'
// import UploadPhoto from '../UploadPhoto'
import { useDispatch } from 'react-redux'
import { showErr } from '../../utils'

const Register = ({navigation}) => {

    const [form, setForm] = useForm({
        fullName: '',
        profession: '',
        email: '',
        password: '',
    })

    const dispatch = useDispatch();

    const onContinue = () => {

     
        dispatch({type:'SET_LOADING', value:true})
        Firebase.auth()
            .createUserWithEmailAndPassword(form.email, form.password)
            .then(success => {
                dispatch({type:'SET_LOADING', value:false})
                setForm('reset');
                // http://firebase.com/users/i123adasdawe13
                const data = {
                    fullName: form.fullName,
                    profession : form.profession,
                    email: form.email,
                    uid : success.user.uid,
                };

                Firebase.database() // Memanggil fungsi database firebase
                        .ref('users/' + success.user.uid + '/') // untuk menetukan dimana data akan disimpan 
                        .set(data); // Membuat databasenya
                
                storeData('user', data);
                
                navigation.navigate('UploadPhoto', data);
            })
            .catch((error) => {
                dispatch({type:'SET_LOADING', value:false})
                const errorMessage = error.message;
                showErr(errorMessage)
            // ...
          });

    }

    return (
        <View style={styles.page}>
            <Header title="Daftar Akun" onPress={() => navigation.goBack()} />
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Input value={form.fullName} label="Full Name" onChangeText={value => setForm('fullName',value)} />
                    <Gap height={20} />
                    <Input value={form.profession} label="Pekerjaan" onChangeText={value => setForm('profession',value)} />
                    <Gap height={20} />
                    <Input value={form.email} label="Email" onChangeText={value => setForm('email',value)} />
                    <Gap height={20} />
                    <Input secureTextEntry value={form.password}  label="Password" onChangeText={value => setForm('password',value)} />
                    <Gap height={40} />
                <Button title="Continue" onPress={onContinue} />
                </ScrollView>
            </View>
        </View>       
    )
}

export default Register

const styles = StyleSheet.create({
    page: {
        backgroundColor:colors.white,
        flex:1
    },
    content: {
        padding: 40,
        paddingTop:0,
    }
})
