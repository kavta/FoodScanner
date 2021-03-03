import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ImageBackground, Text, Image } from 'react-native';
import dummyImage from './../assets/favicon.png';
import wooden from './../assets/wooden.png';

const SuggestPage = () => {
  const styles = StyleSheet.create({
    displayImage: {
      height: 230,
      width: 230,
      alignItems: 'center',
    },
    foodName: {
      color: '#000000',
      fontSize: 30,
    },
    WhiteBackground: {
      backgroundColor: '#ffffff',
      borderRadius: 35,
      top: 5,
      width: '100%',
      height: '100%',
      padding: 14,
    },
    background: {
      backgroundColor: '#ffffff',
    },
    ImageIcon: {
      zIndex: 1,
      justifyContent: 'center',
      top: 100,
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderColor: '#ffffff',
      borderRadius: 125,
      overflow: 'hidden',
      height: 250,
      width: 250,
      marginLeft: 'auto',
      marginRight: 'auto',
      borderWidth: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
    pageName: {
      marginLeft: 'auto',
      marginRight: 'auto',
      top: 50,
      fontSize: 30,
      color: '#ffffff',
      position: 'relative',
    },
    Question: {
      marginTop: 100,
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: 'center',
    },
  });
  const route = useRoute();
  console.log(route);

  return (
    <View>
      <View style={styles.background}>
        <ImageBackground source={wooden} style={{ resizeMode: 'cover' }}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.pageName}>DetectedFood</Text>
          </View>
          <View style={styles.ImageIcon}>
            <Image
              // source={dummyImage}
              // source={{ uri: route?.params?.nutrionvalue?.image }}

              style={styles.displayImage}
            />
          </View>

          <View style={styles.WhiteBackground}>
            <View
              style={{ marginTop: 70, marginLeft: 'auto', marginRight: 'auto' }}
            >
              <Text style={styles.foodName}>{route?.params?.ImageName}</Text>
            </View>
            <View style={styles.Question}>
              <Text style={styles.foodName}>Did you mean?</Text>
              <Text style={styles.foodName}>{route?.params?.ImageName}</Text>
              <Text style={styles.foodName}>{route?.params?.ImageName1}</Text>
              <Text style={styles.foodName}>{route?.params?.ImageName2}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
export default SuggestPage;
