import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Analyzing from './Analyzing';

const styles = StyleSheet.create({
  displayImage: {
    height: 230,
    width: 230,
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  TopBackgroud: {
    borderRadius: 40,
    top: -45,
    position: 'absolute',
    width: '100%',
    height: 345,
  },
  ImageIcon: {
    zIndex: 1,
    justifyContent: 'center',
    top: 130,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderRadius: 125,
    borderWidth: 1,
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
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 2,
  },

  pageName: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    fontSize: 30,
    color: '#000000',
  },
  ListBackground: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: '#f6f6f6',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  ListName: {
    alignItems: 'center',
    width: 'auto',
    padding: 10,
  },
  foodNameList: {
    color: '#000000',
    fontSize: 20,
  },
  foodName: {
    fontSize: 28,
    marginTop: 140,
    textAlign: 'center',
    color: '#000000',
  },
});
const SuggestPage = ({ navigation }) => {
  const [isFetching, setisFetching] = useState(false);
  const route = useRoute();
  const handleBack = () => navigation.navigate('Nutritionalyzer');
  const handlePress = async (props, Photo) => {
    // console.log(props);
    // console.log(Photo);
    try {
      setisFetching(true);

      const { data } = await axios.get(
        `https://api.edamam.com/api/food-database/parser?app_id=358a310d&app_key=db4c503169b2e46ba80e9689f1cc3030&ingr=${props}`
      );
      setisFetching(false);
      if (isFetching === false) {
        navigation.navigate('FoodDetails', {
          nutrionvalue: data?.parsed[0]?.food,
          // -->for dummy data
          // nutrionvalue: {},
          props,
          Photo,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.background}>
        <View>
          <LinearGradient
            colors={['#0B80A5', '#373F5F']}
            style={styles.TopBackgroud}
          />
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={handleBack}
              style={{
                top: 50,
                marginRight: 'auto',
                marginLeft: 5,
                position: 'relative',
              }}
            >
              <AntDesign name="arrowleft" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.ImageIcon}>
            <Image
              source={{ uri: route?.params?.uri }}
              style={styles.displayImage}
              resizeMode="cover"
            />
          </View>
          {/* <View style={styles.WhiteBackground}> */}
          <Text style={styles.foodName}>Did You mean?</Text>

          <View style={styles.ListBackground}>
            <TouchableOpacity
              style={styles.ListName}
              onPress={() =>
                handlePress(route?.params?.ImageName, route?.params?.uri)
              }
            >
              <Text style={styles.foodNameList}>
                {route?.params?.ImageName}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ListBackground}>
            <TouchableOpacity
              style={styles.ListName}
              onPress={() =>
                handlePress(route?.params?.ImageName1, route?.params?.uri)
              }
            >
              <Text style={styles.foodNameList}>
                {route?.params?.ImageName1}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ListBackground}>
            <TouchableOpacity
              style={styles.ListName}
              onPress={() =>
                handlePress(route?.params?.ImageName2, route?.params?.uri)
              }
            >
              <Text style={styles.foodNameList}>
                {route?.params?.ImageName2}
              </Text>
            </TouchableOpacity>
          </View>

          {/* </View> */}
          {/* </View> */}
        </View>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default SuggestPage;
