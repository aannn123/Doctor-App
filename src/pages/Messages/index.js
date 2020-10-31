import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List } from '../../components'
import { colors } from '../../utils/colors'
import { fonts } from '../../utils/fonts'
import { DummyDoctor2 } from '../../assets'
import { getData } from '../../utils'
import { Firebase } from '../../config'

const Messages = ({navigation}) => {

    const [user, setUser] = useState({});
    const [historyChat, setHistoryChat] = useState([])

    useEffect(() => {

        getDataUserFromLocal();
        const rootDB = Firebase.database().ref();
        const urlHistory = `messages/${user.uid}`;
        const messagesDB = rootDB.child(urlHistory);


        messagesDB.on('value', async snapshot => {
                    if (snapshot.val()) {
                        const oldData = snapshot.val();
                        const data = [];
                       const promises = await Object.keys(oldData).map( async key => {
                            const urlUidDoctor = `doctors/${oldData[key].uidPartner}`;
                            const detailDoctor = await rootDB.child(urlUidDoctor).once('value');
                            data.push({
                                id:key,
                                detailDoctor: detailDoctor.val(),
                                ...oldData[key]
                            });
                        });

                        await Promise.all(promises)
                        setHistoryChat(data)
                    // console.log(data)
                    }
                })

    }, [user.uid])

    const getDataUserFromLocal = () => {
        getData('user').then(res => {
            setUser(res)
        })
    }
    

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Text style={styles.text}>Messages</Text>
                {
                    historyChat.map(chat => {
                        const dataDoctor = {
                            id:chat.detailDoctor.uid,
                            data:chat.detailDoctor
                        }
                        return (
                            <List 
                                key={chat.id}
                                profile={{uri:chat.detailDoctor.photo}}
                                name={chat.detailDoctor.fullName} 
                                desc={chat.lastContentChat} 
                                onPress={() => navigation.navigate('Chatting', dataDoctor)}    
                            />
                        ) 
                    })
                }
                
            </View>
            
        </View>
    )
}

export default Messages

const styles = StyleSheet.create({
    page: {
        flex:1,
        backgroundColor: colors.secondary,
    },

    content: {
        backgroundColor: colors.white,
        flex: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },

    text: {
        fontSize:20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 30,
        marginLeft: 16 
    }
})


// useState akan menyimpan value atau default value yang kita inginkan 