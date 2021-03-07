import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  GalleryText: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    borderRadius: 20,
    marginTop: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
});

const GalleryPage = ({ navigation, uri, openImagePermission }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      {Boolean(uri) ? (
        <Image source={{ uri }} style={{ height: 80, width: 80 }} />
      ) : null}
      <TouchableOpacity onPress={openImagePermission}>
        <View style={styles.GalleryText}>
          <Text>Gallery</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default GalleryPage;
