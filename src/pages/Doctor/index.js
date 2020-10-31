import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HomeProfile, DoctorCategory, RatedDoctor, NewsItem, Gap } from '../../components'
import { fonts } from '../../utils/fonts'
import { colors } from '../../utils/colors'
import { ScrollView } from 'react-native-gesture-handler'
import {DummyDoctor2} from '../../assets';
import { Firebase } from '../../config'
import { showErr } from '../../utils'

const Doctor = ({navigation}) => {
   const [news, setNews] = useState([]);
   const [categoryDoctor, setCategoryDoctor] = useState([]);
   const [doctors, setDoctors] = useState([]);

   useEffect(() => {
    
            getNews();
            getRatedDoctors();
            getCategoryDoctor();
            
        },[])
    
    const parseArray = () => {

    }
    
    const getRatedDoctors = () => {
        Firebase.database()
            .ref('doctors/')
            .orderByChild('rate')
            .limitToLast(3)
            .once('value')
            .then(res => {
                // console.log(res.val())
                if (res.val()) {
                    const oldData = res.val();
                    const data = [];
                    Object.keys(oldData).map(key => {
                        data.push({
                            id:key,
                            data:oldData[key]
                        })
                    })
                    setDoctors(data);
                }
               
            })
            .catch(err => {
                showErr(err.message)
            });
    }

   const getCategoryDoctor = () => {
        Firebase.database()
        .ref('category_doctor/')
        .once('value')
        .then(res => {
            if (res.val()) {
                const data = res.val()
                const filterData = data.filter(el => el !== null)
                setCategoryDoctor(filterData);
            }
            // console.log(res.val())
        })
        .catch(err => {
            showErr(err.message)
        });
    }
   const getNews = () => {
        Firebase.database()
        .ref('news/')
        .once('value')
        .then(res => {
            if (res.val()) {
                const data = res.val()
                const filterData = data.filter(el => el !== null)
                setNews(filterData);
            }
            // console.log(res.val())
        })
        .catch(err => {
            showErr(err.message)
        });
   }

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Profile */}
                    <View style={styles.wrapperSection}>
                        <Gap height={30}/>
                        <HomeProfile onPress={() => navigation.navigate('UserProfile')}/>
                        <Text style={styles.welcome}>Mau konsultasi dengan siapa hari ini?</Text>
                    </View>
                    {/* Doctor Category */}
                    <View style={styles.wrapperScroll}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.category}>
                                <Gap width={32}/>
                                {
                                    categoryDoctor.map(item => {
                                       return (
                                        <DoctorCategory
                                            key={item.id} 
                                            category={item.category}
                                            onPress={() => navigation.navigate('ChooseDoctor', item)}
                                        />
                                       )
                                    })
                                }
                                <Gap width={22}/>
                            </View>
                        </ScrollView>
                    </View>
                    {/* Rated Doctor */}
                    <View style={styles.wrapperSection}>
                        <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
                        {doctors.map(doctor => {
                            return (
                                <RatedDoctor 
                                    // avatar={{uri:doctor.data.photo}} 
                                    key={doctor.id}
                                    avatar={{uri:doctor.data.photo}} 
                                    name={doctor.data.fullName} 
                                    desc={doctor.data.profession}  
                                    onPress={() => navigation.navigate('DoctorProfile', doctor)} 
                                />
                            )
                        })}
                        <Text style={styles.sectionLabel}>Good News</Text>
                    </View>
                    {
                        news.map(item => {
                            return (
                                <NewsItem 
                                    key={item.id}
                                    title={item.title}
                                    date={item.date}
                                    image={item.image}
                                />
                            )
                        })
                    }
                    
                    <Gap height={30}/>
                </ScrollView>
            </View>
        </View>
    )
}

export default Doctor

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.secondary,
        flex: 1
    },

    content: {
        backgroundColor: colors.white,
        flex: 1,
        // paddingVertical: 30,
        // paddingHorizontal: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },

    wrapperSection: {
        paddingHorizontal: 16
    },

    welcome: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 30,
        marginBottom: 16,
        maxWidth: 209
    },
    category: {
        flexDirection:'row'
    },
    wrapperScroll: {
        marginHorizontal: -16
    },

    sectionLabel: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 30,
        marginBottom: 16
    }
})
