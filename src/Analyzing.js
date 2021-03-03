import React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, View, Text } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    height: 800,
  },
});
const Analyzing = () => {
  return (
    <View style={styles.Container}>
      <ActivityIndicator size="large" />
      <Text style={{ color: '#ffffff' }}> Analyzing image</Text>
    </View>
  );
};
export default Analyzing;
