import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Header, ChatItem, InputChat } from '../../components'
import { fonts } from '../../utils/fonts'
import { colors } from '../../utils/colors'
import { DummyDoctor2 } from '../../assets'
import { getData, showErr, getChatTime, setDateChat } from '../../utils'
import { Firebase } from '../../config'

const Chatting = ({navigation, route}) => {
    const dataDoctor = route.params;
    const [chatContent, setChatContent] = useState('')
    const [user, setUser] = useState({})
    const [chatData, setChatData] = useState([]);

    useEffect(() => {

       getDataUserFromLocal();
       const chatID = `${user.uid}_${dataDoctor.data.uid}`;
       const urlFirebase = `chatting/${chatID}/allchat/`;

       Firebase.database()
               .ref(urlFirebase)
               .on('value', snapshot => {
                   if (snapshot.val()) {
                       const dataSnapshot = snapshot.val();
                       const allDataChat = [];
                       Object.keys(dataSnapshot).map(key => {
                           const dataChat = dataSnapshot[key];
                           const newDataChat = [];

                            Object.keys(dataChat).map(itemChat => {
                                newDataChat.push({
                                    id: itemChat,
                                    data: dataChat[itemChat]
                                });
                            });

                           allDataChat.push({
                               id:key,
                               data: newDataChat
                           });
                       });
                //    console.log(allDataChat)
                        setChatData(allDataChat)
                   }
               })   // Fungsi realtime database
    }, [dataDoctor.data.uid, user.uid])

    const getDataUserFromLocal = () => {
        getData('user').then(res => {
            setUser(res)
        })
    }


    const chatSend = () => {
        const today = new Date();
        const data = {
            sendBy: user.uid,
            chatDate: today.getTime(),
            chatTime: getChatTime(today),
            chatContent: chatContent
        }

        const chatId = `${user.uid}_${dataDoctor.data.uid}`;

        const urlFirebase = `chatting/${chatId}/allchat/${setDateChat(today)}`;
        const urlMessageUser = `messages/${user.uid}/${chatId}`;
        const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatId}`;

        const dataHistoryChatForUser = {
            lastContentChat: chatContent,
            lastChatDate: today.getTime(),
            uidPartner: dataDoctor.data.uid
        }

        const dataHistoryChatForDoctor = {
            lastContentChat: chatContent,
            lastChatDate: today.getTime(),
            uidPartner: user.uid
        }

        Firebase.database()
                .ref(urlFirebase)
                .push(data)
                .then(res => {
                    setChatContent('')
                    // set history for user
                    Firebase.database()
                            .ref(urlMessageUser)
                            .set(dataHistoryChatForUser);
                    
                    // set history for user
                    Firebase.database()
                    .ref(urlMessageDoctor)
                    .set(dataHistoryChatForDoctor);
                })
                .catch(err => {
                    showErr(err.message)
                })
    }
    return (
        <View style={styles.page}>
            <Header type="dark-profile" title={dataDoctor.data.fullName} photo={{uri:dataDoctor.data.photo}} desc={dataDoctor.data.profession} onPress={() => navigation.goBack()} />
            
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                
                {
                    chatData.map(chat => {
                        return (
                            <View key={chat.id}>
                                <Text style={styles.chatDate}>{chat.id}</Text>
                                {
                                    chat.data.map(itemChat => {
                                        const isMe = itemChat.data.sendBy === user.uid;
                                        return (
                                                <ChatItem
                                                    key={itemChat.id}
                                                    isMe={isMe} 
                                                    text={itemChat.data.chatContent}
                                                    date={itemChat.data.chatTime}
                                                    photo={isMe ? null : {uri:dataDoctor.data.photo}}
                                            />
                                        ) 
                                    })
                                }
                                {/* <ChatItem/>
                                <ChatItem isMe/>
                                <ChatItem/> */}
                            </View>
                        )
                    })
                }
               
                </ScrollView>
            </View>

        
            <InputChat
                value={chatContent} 
                onChangeText={(value) => setChatContent(value)} 
                onButtonPress={chatSend} />
        </View>
    )
}

export default Chatting

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex:1
    },

    content: {
        flex:1
    },

    chatDate: {
        fontSize:11,
        fontFamily: fonts.primary.normal,
        color: colors.text.secondary,
        marginVertical:20,
        textAlign:'center'
    }
})
