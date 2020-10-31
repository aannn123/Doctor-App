import React, { useEffect } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ILLogo} from '../../assets';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { Firebase } from '../../config';

const Splash = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      setTimeout(() => {
        if (user) {
          navigation.replace('MainApp');
        } else {
          navigation.replace('GetStarted');
        }
      }, 3000);
    });

    return () => unsubscribe();
  }, [navigation]);

  return(
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Doctor</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
	page : {
		flex:1, alignItems:'center', justifyContent:'center', backgroundColor:colors.white
	},

	title: {
		fontSize:20, fontFamily: fonts.primary[600], color:colors.text.primary, marginTop:20
	}
});

// Navigation replace berfungsi untuk berpindah halaman dan tombol tidak berguna akan balik ke home android