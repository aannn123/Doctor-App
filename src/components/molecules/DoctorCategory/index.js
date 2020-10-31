import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ILCatUmum, ILCatPsikiater, ILCatObat } from '../../../assets'
import { colors } from '../../../utils/colors'
import { fonts } from '../../../utils/fonts'
import { TouchableOpacity } from 'react-native-gesture-handler'

const DoctorCategory = ({category, onPress}) => {

    const Icon = () => {
        if (category === 'dokter umum') {
            return <ILCatUmum style={styles.ilustration}/>            
        }

        if (category === 'psikiater') {
            return <ILCatPsikiater style={styles.ilustration}/>          
        }

        if (category === 'dokter obat') {
            return <ILCatObat style={styles.ilustration}/>
        }
        return <ILCatUmum style={styles.ilustration}/>
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Icon/>
            <Text style={styles.label}>Saya butuh</Text>
            <Text style={styles.category}>{category}</Text>
        </TouchableOpacity>
    )
}

export default DoctorCategory

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: colors.cardLight,
        alignSelf: 'flex-start',
        borderRadius:10,
        marginRight:10,
        width: 100,
        height: 130
    },

    ilustration: {
        marginBottom:28
    },

    label: {
        fontSize: 12,
        fontFamily: fonts.primary[300],
        color: colors.text.primary
    },
    category: {
        fontSize: 12,
        fontFamily: fonts.primary[600],
        color: colors.text.primary
    }
})

// JSON data biasa digunakan untuk persiapan membuat kerangka API didalam firebase
// sehingga setalah kita mengetahui bntuk dari data yang akan show kedalam frontend  kita akan
// lebih mudah lagi  membuat struktur data didalam firebase

// JSON Data, useState, atau inline data