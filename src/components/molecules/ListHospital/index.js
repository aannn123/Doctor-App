import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors } from '../../../utils/colors'
import { fonts } from '../../../utils/fonts'

const ListHospital = ({type, name, address, pic}) => {
    return (
        <View style={styles.container}>
            <Image source={pic} style={styles.picture} />
            <View>
                <Text style={styles.title}>{type}</Text>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.address}>{address}</Text>
            </View>
            
        </View>
    )
}

export default ListHospital

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth:1,
        borderColor: colors.border
    },
    picture: {
        width:80,
        height:80, 
        borderRadius:11,
        marginRight:16
    },
    title: {
        fontSize:16,
        fontFamily: fonts.primary.normal,
        color: colors.text.primary,
        textTransform:'capitalize'
    },
    address: {
        fontSize:12,
        fontFamily: fonts.primary[300],
        color: colors.text.secondary,
        marginTop:6,
        textTransform:'capitalize'
    }
})


// Props itu sebenrnya sebuah objek / params, sebuah objek didalam javascript bisa kita 
// destructring (kita langsung aja ambil value didalamnya ), caranya parameternya kita 
// ganti sebagai objek