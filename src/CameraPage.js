import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

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
        <View>
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={['#373F5F', '#0B80A5']}
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: 300,
              borderRadius: 20,
              shadowColor: 'black',
              shadowOpacity: 0.26,
              shadowRadius: 10,
              elevation: 5,
            }}
          >
            <Text style={{ color: '#ffffff', zIndex: 5 }}>Scan Image</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>

      {photos ? (
        <Image
          source={{ uri: photos.localuri }}
          style={{ width: 80, height: 80, alignSelf: 'center' }}
        />
      ) : null}
    </View>
  );
};

export default CameraPage;
