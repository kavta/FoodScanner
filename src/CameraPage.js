import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Image, TouchableOpacity } from 'react-native';
import CameraImg from '../assets/camera.png';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    height: 30,
    width: 30,
    paddingTop: 20,
    marginTop: 25,
  },
});
const CameraPage = ({ takeImage, photos }) => {
  return (
    <View style={StyleSheet.container}>
      <TouchableOpacity onPress={takeImage}>
        <Image source={CameraImg} style={styles.icon} />
      </TouchableOpacity>

      {photos ? (
        <Image
          source={{ uri: photos.localuri }}
          style={{ width: 100, height: 100 }}
        />
      ) : null}
    </View>
  );
};

export default CameraPage;
