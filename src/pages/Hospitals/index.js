import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import { ILHospitalBG, DummyHospital1, DummyHospital2, DummyHospital3 } from '../../assets'
import { fonts } from '../../utils/fonts'
import { colors } from '../../utils/colors'
import { ListHospital } from '../../components'
import { Firebase } from '../../config'

const Hospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    useEffect(() => {
        Firebase.database()
                .ref('hospitals/')
                .once('value')
                .then(res => {
                    if (res.val()) {
                        const data = res.val()
                        const filterData = data.filter(el => el !== null)
                        setHospitals(filterData);
                    }
                    // console.log(res.val())
                })
                .catch(err => {
                    showErr(err.message)
                });
    }, [])
    return (
        <View style={styles.page}>
            <ImageBackground source={ILHospitalBG} style={styles.background}>
                <Text style={styles.title} >Nearby Hospitals</Text>
                <Text style={styles.desc}>3 Tersedia</Text>
            </ImageBackground>
            <View style={styles.content}>
                <ScrollView>
                {
                    hospitals.map(item => {
                        return (
                            <ListHospital
                                key={item.id}
                                pic={{uri:item.image}} 
                                type={item.type} 
                                name={item.name} 
                                address={item.address} 
                        />
                        )
                    })
                }
               
                {/* <ListHospital 
                    pic={DummyHospital2} 
                    type="Rumah Sakit Anak" 
                    name="Happy Family Kids" 
                    address="Jln. Surya Sejahtera 20" />
                <ListHospital 
                    pic={DummyHospital3} 
                    type="Rumah Sakit Jiwa" 
                    name="Tingkatan Paling Atas" 
                    address="Jln. Surya Sejahtera 20" 
                />
                 <ListHospital 
                    pic={DummyHospital3} 
                    type="Rumah Sakit Jiwa" 
                    name="Tingkatan Paling Atas" 
                    address="Jln. Surya Sejahtera 20" 
                /> */}
                </ScrollView>
            </View>
        </View>
    )
}

export default Hospitals

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.secondary,
        flex: 1
    },
    
    background: {
        height:240,
        paddingTop: 30
    },
    title: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.white,
        textAlign: 'center'
    },
    desc: {
        fontSize: 12,
        fontFamily: fonts.primary[300],
        color: colors.white,
        marginTop:6,
        textAlign: 'center'
    },
    content: {
        backgroundColor: colors.white,
        flex: 1,
        borderRadius: 20,
        marginTop: -30,
        paddingTop: 14
    }
})
