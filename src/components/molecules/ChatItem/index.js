import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fonts } from '../../../utils/fonts'
import { colors } from '../../../utils/colors'
import IsMe from './isMe'
import Other from './other'

const ChatItem = ({isMe, text, date, photo}) => {

    if (isMe) {
        return <IsMe text={text} date={date} />
    }
    return <Other text={text} date={date} photo={photo} />


}

export default ChatItem

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        marginBottom:20,
        paddingRight:16
    },

    chatContent: {
        padding:12,
        paddingRight: 18,
        backgroundColor: colors.cardLight,
        maxWidth: "70%",
        borderRadius:10,
        borderBottomRightRadius:0
        
    },
    text: {
        fontSize:14,
        fontFamily:fonts.primary.normal,
        color: colors.text.primary
    },
    date:{
        fontSize:11,
        fontFamily:fonts.primary.normal,
        color: colors.text.secondary,
        marginTop:8
    }

})


