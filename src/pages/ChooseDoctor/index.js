import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, List } from '../../components'
import {DummyDoctor6, DummyDoctor7, DummyDoctor8, DummyDoctor9, DummyDoctor10 } from '../../assets'
import { colors } from '../../utils/colors'
import { Firebase } from '../../config'

const ChooseDoctor = ({navigation, route}) => {
    const itemCategory = route.params;
    const [listDoctor, setListDoctor] = useState([])
    useEffect(() => {
        callDoctorByCategory(itemCategory.category);
    }, [itemCategory.category]);

    const callDoctorByCategory = category => {
        Firebase.database()
                .ref('doctors/')
                .orderByChild('category')
                .equalTo(category)
                .once('value')
                .then(res => {
                    if (res.val()) {
                        const oldData = res.val()
                        const data = []
                        Object.keys(oldData).map(item => {
                            data.push({
                                id:item,
                                data: oldData[item]
                            })
                        })
                        // console.log(data)
                        setListDoctor(data)
                    }
                })
    }
    return (
        <View style={styles.page}>
            <Header title={`Pilih ${itemCategory.category}`} type="dark" onPress={() => navigation.goBack()} />
            {listDoctor.map(doctor => {
                return (
                    <List 
                    key={doctor.id}
                    type="next" profile={{uri:doctor.data.photo}} 
                    name={doctor.data.fullName}
                    desc={doctor.data.gender}   
                    onPress={() => navigation.navigate('DoctorProfile', doctor)} 
                />
                )
            })}
          
            {/* <List type="next" profile={DummyDoctor7} name="Farhan" desc="Wanita"  />
            <List type="next" profile={DummyDoctor8} name="Farhan" desc="Wanita"  />
            <List type="next" profile={DummyDoctor9} name="Farhan" desc="Wanita"  />
            <List type="next" profile={DummyDoctor10} name="Farhan" desc="Wanita"  /> */}
        </View>
    )
}

export default ChooseDoctor

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex:1
    }
})
