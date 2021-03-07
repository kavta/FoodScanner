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

import * as ImagePicker from 'expo-image-picker';
import Camera from './CameraPage';
import GalleryPage from './GalleryPage';
import Scanner from '../assets/Scanner.png';

import Analyzing from './Analyzing';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  Sliderimage: {
    // backgroundColor: '#bcd4c0',
    borderRadius: 35,
    height: 350,
    padding: 14,
  },
  Heading1: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 35,
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
  TopNav: {
    height: 45,

    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    borderRadius: 5,
    marginTop: 10, // borderWidth: 1,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
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
  ButtonGradient: {
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
});

const Mainpage = ({ navigation }) => {
  const [isFetching, setisFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [photos, setPhotos] = useState(null);
  const [uri, setSelectImage] = useState(null);
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    if (uri !== null) {
      handleImageUpload();
    }
  }, [uri]);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const takeImage = async () => {
    let { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (granted) {
      let data = await ImagePicker.launchCameraAsync();
      setSelectImage(data.uri);
    } else {
      Alert.alert('Access denied');
    }
  };

  const openImagePermission = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Required Permission to access media.');
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult.uri);
    setSelectImage(pickerResult.uri);
  };

  const handleImageUpload = async () => {
    const uriPartsBySlash = uri.split('/');
    const uriPartsByDot = uri.split('.');

    const fileName = uriPartsBySlash[uriPartsBySlash.length - 1];
    const fileType = uriPartsByDot[uriPartsByDot.length - 1];

    const image = {
      uri,
      type: `image/${fileType}`,
      name: fileName,
    };

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'food_recognition');
      formData.append('cloud_name', 'prasanga');

      setisFetching(true);
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/prasanga/image/upload',
        formData
      );

      // Using REST API
      const res = await axios.get(
        `http://nutritionalyzer.herokuapp.com/api/v1/process_image?uri=${response.data.url}`
      );
      setisFetching(false);

      navigation.navigate('Suggested', {
        uri,
        ImageName: res?.data?.predictions[0]?.name,
        ImageName1: res?.data?.predictions[1]?.name,
        ImageName2: res?.data?.predictions[2]?.name,
      });
    } catch (e) {
      setisFetching(false);
      Alert.alert('Something went wrong', e.message);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setPhotos(null);
      setSelectImage(null);
      setRefreshing(false);
    });
  }, []);

  if (isFetching) {
    return (
      <View>
        <Analyzing />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
        source={chicken}
        style={{ width: 150, height: 150, opacity: 0.5, position: 'absolute' }}
      /> */}
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', paddingTop: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.TopNav}>
          <Text style={{ fontSize: 20 }}>nutritionalyzer</Text>
        </View>

        <Text style={styles.Heading1}>Want to know food's{'\n'} calorie?</Text>

        <Text style={{ textAlign: 'center', fontSize: 16, margin: 20 }}>
          Check food's Calories, carbohydrate, Proteins
          {'\n'} &{'\n'} Fat
        </Text>

        <View style={{ margin: 10 }}>
          <Image source={Scanner} style={{ height: 230, width: 200 }} />
        </View>

        <View style={{ margin: 10 }}>
          <Text style={{ textAlign: 'center', fontSize: 16, margin: 10 }}>
            Scan your image to get the Calories
          </Text>
        </View>

        <View style={{ marginTop: 15 }}>
          <Camera photos={photos} takeImage={takeImage} />
        </View>

        <View style={{ marginTop: 15 }}>
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
