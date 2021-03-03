import React, { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import Camera from './CameraPage';
import GalleryPage from './GalleryPage';
import { Feather } from '@expo/vector-icons';
import Analyzing from './Analyzing';
import SideSwap from './SideSwap';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Sliderimage: {
    // backgroundColor: '#bcd4c0',
    borderRadius: 35,
    height: 350,
    padding: 14,
  },
  Heading1: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 20,
  },
  textBar: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    width: 300,
  },
  searchButton: {
    paddingTop: 5,
    width: 80,
    height: 30,
    alignItems: 'center',
  },
  GalleryIcon: {
    height: 30,
    width: 30,
    marginTop: 25,
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

const Mainpage = ({ navigation }) => {
  const [Svalue, setValue] = useState('');
  const [isFetching, setisFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [photos, setPhotos] = useState(null);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const takeImage = async () => {
    let { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (granted) {
      let data = await ImagePicker.launchCameraAsync();
      console.log(data);
      setPhotos({ localuri: data.uri });
    } else {
      Alert.alert('Access denied');
    }
  };

  const [uri, setSelectImage] = useState(null);
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    handleImageUpload();
  }, [uri]);

  const handleImageUpload = async () => {
    const image = {
      uri,
      type: `test/jpg`,
      name: `test.jpg`,
    };

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'food_recognition');
      formData.append('cloud_name', 'prasanga');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/prasanga/image/upload',
        formData
      );

      // Using GraphQL API
      const res = await axios({
        url: `https://nutritionalyzer.herokuapp.com/graphql`,
        method: 'post',
        data: {
          query: `
            query{
              predictions(imgUrl: "${response.data.url}"){
                name
              }
            }
            `,
        },
      });

      // const { data } = await axios.get(
      //   `https://api.edamam.com/api/food-database/parser?app_id=358a310d&app_key=db4c503169b2e46ba80e9689f1cc3030&ingr=${ImageName}`
      // );

      navigation.navigate('Suggested', {
        ImageName: res?.data?.data?.predictions[0]?.name,
        ImageName1: res?.data?.data?.predictions[1]?.name,
        ImageName2: res?.data?.data?.predictions[2]?.name,
      });
    } catch (e) {
      console.log(e.message);
      alert('Something went wrong');
    }
  };

  const openImagePermission = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Required Permission to access media.');
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setSelectImage(pickerResult.uri);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setValue('');
      setPhotos(null);
      setSelectImage(null);
      setRefreshing(false);
    });
  }, []);

  const handleChange = (e) => {
    setValue(e);
  };

  const handleSearch = async () => {
    try {
      setisFetching(true);

      const { data } = await axios.get(
        `https://api.edamam.com/api/food-database/parser?app_id=358a310d&app_key=db4c503169b2e46ba80e9689f1cc3030&ingr=${Svalue}`
      );
      setisFetching(false);
      if (isFetching === false) {
        navigation.navigate('FoodDetails', {
          nutrionvalue: data?.parsed[0]?.food,
          // nutrionvalue: {},-->for dummy data
          Svalue,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };
  if (isFetching === true) {
    return (
      <View>
        <Analyzing />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#71a61c']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 900,
        }}
      />
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.Sliderimage}>
          <SideSwap />
        </View>

        <Text style={styles.Heading1}>Want to know food's calorie?</Text>
        <Text style={{ textAlign: 'center', margin: 10 }}>
          Check food's Calories, carbohydrate, Proteins
          {'\n'} &{'\n'} Fat
        </Text>
        <TextInput
          style={styles.textBar}
          placeholder="Search Food"
          onChangeText={handleChange}
          value={Svalue}
        />

        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>

        <View>
          <Camera photos={photos} takeImage={takeImage} />
          <GalleryPage
            navigation={navigation}
            uri={uri}
            openImagePermission={openImagePermission}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Mainpage;
